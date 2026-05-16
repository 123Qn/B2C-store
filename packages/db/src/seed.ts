import { client } from "@repo/db/client";
import { products } from "@repo/db/data";

export async function seed() {
  console.log("🌱 Seeding data");

  // CLEAR ONLY ORDERS
  await client.db.orderItem.deleteMany();
  await client.db.order.deleteMany();

  // ADMIN
  await client.db.user.upsert({
    where: {
      email: "admin@qfashion.com",
    },

    update: {},

    create: {
      username: "admin",
      email: "admin@qfashion.com",
      password: "123",
      role: "ADMIN",
    },
  });

  // BUYER
  await client.db.user.upsert({
    where: {
      email: "buyer@qfashion.com",
    },

    update: {},

    create: {
      username: "buyer",
      email: "buyer@qfashion.com",
      password: "123",
      role: "BUYER",
    },
  });

  // PRODUCTS
  for (const product of products) {
    await client.db.product.upsert({
      where: {
        urlId: product.urlId,
      },

      update: {},

      create: {
        urlId: product.urlId,
        gender: product.gender,
        name: product.name,
        brand: product.brand,
        description: product.description,
        size: product.size,
        imageUrl: product.imageUrl,
        category: product.category,
        price: product.price,
        stock: product.stock,
        sold: product.sold,
        active: product.active,
      },
    });
  }

  console.log("✅ Database seeded");
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await client.db.$disconnect();
  });