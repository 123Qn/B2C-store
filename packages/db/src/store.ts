// One data API for the whole app.
//
// - DATABASE_URL set   -> Postgres via Prisma (data is permanent)
//   If Postgres can't be reached, the server switches to the JSON store
//   automatically. STORE=json forces the JSON store.
// - DATABASE_URL unset -> JSON store: starts from the seed data in data.ts and
//   saves changes to a JSON file (STORE_FILE, default: <tmpdir>/b2c-store.json).
//   On Vercel that file is temporary, so new accounts / orders / admin edits
//   reset when the server restarts. Seed products and demo accounts always exist.

import fs from "fs";
import os from "os";
import path from "path";

import type { Order, OrderItem, Product, User } from "@prisma/client";

import { client, hasDatabase } from "@repo/db/client";
import { products as seedProducts, users as seedUsers } from "@repo/db/data";

export type PublicUser = Omit<User, "password">;

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export type OrderWithUser = OrderWithItems & { user: PublicUser };

export type ProductFilter = {
  activeOnly?: boolean;
  category?: string;
  brand?: string;
  // matches name, category or brand
  search?: string;
};

export type ProductInput = Pick<
  Product,
  "urlId" | "name" | "brand" | "category" | "gender" | "description" | "price" | "stock" | "size" | "imageUrl"
>;

export type UserInput = Pick<User, "username" | "email" | "password" | "role">;

export type OrderInput = {
  userId: number;
  totalPrice: number;
  items: { productId: number; quantity: number; size: string; price: number }[];
};

// thrown when a unique field (product urlId, user email/username) is taken
export class StoreConflictError extends Error {
  constructor(message = "Already exists") {
    super(message);
    this.name = "StoreConflictError";
  }
}

export type Store = {
  products: {
    list(filter?: ProductFilter): Promise<Product[]>;
    byUrlId(urlId: string): Promise<Product | null>;
    byIds(ids: number[]): Promise<Product[]>;
    create(input: ProductInput): Promise<Product>;
    setActive(id: number, active: boolean): Promise<Product | null>;
  };
  users: {
    byEmail(email: string): Promise<User | null>;
    login(email: string, password: string): Promise<User | null>;
    create(input: UserInput): Promise<PublicUser>;
  };
  orders: {
    forUser(userId: number): Promise<OrderWithItems[]>;
    all(): Promise<OrderWithUser[]>;
    create(input: OrderInput): Promise<Order>;
  };
  // restore seed data (clears orders)
  reset(): Promise<void>;
};

function withoutPassword(user: User): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
}

const lower = (value: string) => value.toLowerCase();

// ─────────────────────────────────────────────────────────────
// POSTGRES (PRISMA)
// ─────────────────────────────────────────────────────────────

function isUniqueError(error: unknown) {
  return (error as { code?: string })?.code === "P2002";
}

const prismaStore: Store = {
  products: {
    list(filter = {}) {
      const insensitive = "insensitive" as const;
      return client.db.product.findMany({
        where: {
          ...(filter.activeOnly ? { active: true } : {}),
          ...(filter.category ? { category: { equals: filter.category, mode: insensitive } } : {}),
          ...(filter.brand ? { brand: { equals: filter.brand, mode: insensitive } } : {}),
          ...(filter.search
            ? {
                OR: [
                  { name: { contains: filter.search, mode: insensitive } },
                  { category: { contains: filter.search, mode: insensitive } },
                  { brand: { contains: filter.search, mode: insensitive } },
                ],
              }
            : {}),
        },
        orderBy: { createdAt: "desc" },
      });
    },
    async byUrlId(urlId) {
      if (typeof urlId !== "string") return null;
      return client.db.product.findUnique({ where: { urlId } });
    },
    byIds(ids) {
      return client.db.product.findMany({ where: { id: { in: ids } } });
    },
    async create(input) {
      try {
        return await client.db.product.create({ data: input });
      } catch (error) {
        if (isUniqueError(error)) throw new StoreConflictError("Product with this name already exists");
        throw error;
      }
    },
    async setActive(id, active) {
      try {
        return await client.db.product.update({ where: { id }, data: { active } });
      } catch {
        return null;
      }
    },
  },
  users: {
    async byEmail(email) {
      if (typeof email !== "string") return null;
      return client.db.user.findUnique({ where: { email } });
    },
    async login(email, password) {
      // plain strings only — an object like {"not": "x"} would become a Prisma filter
      if (typeof email !== "string" || typeof password !== "string") return null;
      return client.db.user.findFirst({ where: { email, password } });
    },
    async create(input) {
      try {
        return withoutPassword(await client.db.user.create({ data: input }));
      } catch (error) {
        if (isUniqueError(error)) throw new StoreConflictError("Email or username already exists");
        throw error;
      }
    },
  },
  orders: {
    forUser(userId) {
      return client.db.order.findMany({
        where: { userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });
    },
    async all() {
      const orders = await client.db.order.findMany({
        include: { user: true, items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });
      return orders.map((order) => ({ ...order, user: withoutPassword(order.user) }));
    },
    create({ userId, totalPrice, items }) {
      return client.db.order.create({
        data: {
          totalPrice,
          user: { connect: { id: userId } },
          items: { create: items },
        },
      });
    },
  },
  async reset() {
    await client.db.orderItem.deleteMany();
    await client.db.order.deleteMany();

    for (const user of seedUsers) {
      await client.db.user.upsert({ where: { email: user.email }, update: {}, create: user });
    }

    for (const { id: _id, ...product } of seedProducts) {
      await client.db.product.upsert({ where: { urlId: product.urlId }, update: {}, create: product });
    }
  },
};

// ─────────────────────────────────────────────────────────────
// JSON FILE
// ─────────────────────────────────────────────────────────────

type JsonData = {
  products: Product[];
  users: User[];
  orders: Order[];
  orderItems: OrderItem[];
};

const STORE_FILE = process.env.STORE_FILE || path.join(os.tmpdir(), "b2c-store.json");

function seedData(): JsonData {
  // spread seed products a second apart so "newest first" keeps the data.ts order
  const base = Date.UTC(2025, 0, 1);
  return {
    products: seedProducts.map((p, i) => ({
      ...p,
      createdAt: new Date(base + (seedProducts.length - i) * 1000),
    })),
    users: seedUsers.map((u, i) => ({ ...u, id: i + 1, createdAt: new Date(base) })),
    orders: [],
    orderItems: [],
  };
}

function revive(data: JsonData): JsonData {
  const date = <T extends { createdAt: Date }>(row: T): T => ({ ...row, createdAt: new Date(row.createdAt) });
  return {
    products: data.products.map(date),
    users: data.users.map(date),
    orders: data.orders.map(date),
    orderItems: data.orderItems,
  };
}

let cache: { data: JsonData; mtimeMs: number } | null = null;

// re-reads the file when another process (web app / API) has changed it
function load(): JsonData {
  try {
    const { mtimeMs } = fs.statSync(STORE_FILE);
    if (cache && cache.mtimeMs === mtimeMs) return cache.data;
    const data = revive(JSON.parse(fs.readFileSync(STORE_FILE, "utf8")));
    cache = { data, mtimeMs };
    return data;
  } catch {
    // no file yet (or unreadable) — keep what is in memory, else start from seed
    if (!cache) cache = { data: seedData(), mtimeMs: 0 };
    return cache.data;
  }
}

function save(data: JsonData) {
  cache = { data, mtimeMs: cache?.mtimeMs ?? 0 };
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data));
    cache.mtimeMs = fs.statSync(STORE_FILE).mtimeMs;
  } catch (error) {
    // read-only filesystem: changes live in memory until the server restarts
    console.warn("[store] could not write", STORE_FILE, error);
  }
}

const nextId = (rows: { id: number }[]) => rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
const newestFirst = <T extends { createdAt: Date }>(a: T, b: T) => b.createdAt.getTime() - a.createdAt.getTime();

function withItems(data: JsonData, order: Order): OrderWithItems {
  const items = data.orderItems
    .filter((item) => item.orderId === order.id)
    .map((item) => ({ ...item, product: data.products.find((p) => p.id === item.productId)! }))
    .filter((item) => item.product);
  return { ...order, items };
}

const jsonStore: Store = {
  products: {
    async list(filter = {}) {
      const search = filter.search ? lower(filter.search) : "";
      return load()
        .products.filter((p) =>
          (!filter.activeOnly || p.active) &&
          (!filter.category || lower(p.category) === lower(filter.category)) &&
          (!filter.brand || lower(p.brand) === lower(filter.brand)) &&
          (!search ||
            lower(p.name).includes(search) ||
            lower(p.category).includes(search) ||
            lower(p.brand).includes(search))
        )
        .sort(newestFirst);
    },
    async byUrlId(urlId) {
      return load().products.find((p) => p.urlId === urlId) ?? null;
    },
    async byIds(ids) {
      return load().products.filter((p) => ids.includes(p.id));
    },
    async create(input) {
      const data = load();
      if (data.products.some((p) => p.urlId === input.urlId)) {
        throw new StoreConflictError("Product with this name already exists");
      }
      const product: Product = {
        ...input,
        id: nextId(data.products),
        sold: 0,
        active: true,
        createdAt: new Date(),
      };
      save({ ...data, products: [...data.products, product] });
      return product;
    },
    async setActive(id, active) {
      const data = load();
      const product = data.products.find((p) => p.id === id);
      if (!product) return null;
      const updated = { ...product, active };
      save({ ...data, products: data.products.map((p) => (p.id === id ? updated : p)) });
      return updated;
    },
  },
  users: {
    async byEmail(email) {
      return load().users.find((u) => u.email === email) ?? null;
    },
    async login(email, password) {
      return load().users.find((u) => u.email === email && u.password === password) ?? null;
    },
    async create(input) {
      const data = load();
      if (data.users.some((u) => u.email === input.email || u.username === input.username)) {
        throw new StoreConflictError("Email or username already exists");
      }
      const user: User = { ...input, id: nextId(data.users), createdAt: new Date() };
      save({ ...data, users: [...data.users, user] });
      return withoutPassword(user);
    },
  },
  orders: {
    async forUser(userId) {
      const data = load();
      return data.orders
        .filter((o) => o.userId === userId)
        .sort(newestFirst)
        .map((o) => withItems(data, o));
    },
    async all() {
      const data = load();
      return data.orders
        .slice()
        .sort(newestFirst)
        .map((o) => {
          const user = data.users.find((u) => u.id === o.userId);
          return {
            ...withItems(data, o),
            user: user
              ? withoutPassword(user)
              : { id: o.userId, username: "unknown", email: "unknown", role: "BUYER" as const, createdAt: o.createdAt },
          };
        });
    },
    async create({ userId, totalPrice, items }) {
      const data = load();
      const order: Order = {
        id: nextId(data.orders),
        userId,
        totalPrice,
        status: "PENDING",
        createdAt: new Date(),
      };
      let itemId = nextId(data.orderItems);
      const orderItems: OrderItem[] = items.map((item) => ({ ...item, id: itemId++, orderId: order.id }));
      save({ ...data, orders: [...data.orders, order], orderItems: [...data.orderItems, ...orderItems] });
      return order;
    },
  },
  async reset() {
    save(seedData());
  },
};

// ─────────────────────────────────────────────────────────────
// PICK BACKEND
// ─────────────────────────────────────────────────────────────

// STORE=json forces the JSON store even when DATABASE_URL is set
const forceJson = process.env.STORE?.toLowerCase() === "json";

let databaseDown = false;

// Prisma throws PrismaClientInitializationError when it can't connect
// (server unreachable, expired, wrong credentials, ...)
function isConnectionError(error: unknown) {
  return (error as { name?: string })?.name === "PrismaClientInitializationError";
}

export function getStoreMode(): "postgres" | "json" {
  return hasDatabase && !forceJson && !databaseDown ? "postgres" : "json";
}

// Runs a Postgres call; if the database can't be reached, logs once, switches this
// server instance to the JSON store and retries the call there.
function withFallback<T extends Record<string, (...args: never[]) => Promise<unknown>>>(
  primary: T,
  fallback: T
): T {
  const wrapped = {} as Record<string, unknown>;
  for (const key of Object.keys(primary)) {
    wrapped[key] = async (...args: never[]) => {
      if (getStoreMode() === "json") return fallback[key]!(...args);
      try {
        return await primary[key]!(...args);
      } catch (error) {
        if (!isConnectionError(error)) throw error;
        if (!databaseDown) {
          console.error("[store] database unreachable — falling back to the JSON store", error);
          databaseDown = true;
        }
        return fallback[key]!(...args);
      }
    };
  }
  return wrapped as T;
}

export const store: Store = {
  products: withFallback(prismaStore.products, jsonStore.products),
  users: withFallback(prismaStore.users, jsonStore.users),
  orders: withFallback(prismaStore.orders, jsonStore.orders),
  reset: withFallback({ reset: prismaStore.reset }, { reset: jsonStore.reset }).reset,
};
