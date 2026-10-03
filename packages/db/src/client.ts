import { PrismaClient }
from "@prisma/client";

import { env }
from "@repo/env/web";

declare global {

  var prisma:
    PrismaClient | undefined;

}

// true when a Postgres database is configured; otherwise the JSON store is used
export const hasDatabase = !!env.DATABASE_URL;

// CREATE (OR REUSE) CLIENT ONLY WHEN IT IS NEEDED
function getPrisma(): PrismaClient {
  if (!hasDatabase) {
    throw new Error("DATABASE_URL is not set — use @repo/db/store, which falls back to JSON");
  }

  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    });
  }

  return globalThis.prisma;
}

// EXPORT CLIENT
export const client = {

  get db() {
    return getPrisma();
  },

};
