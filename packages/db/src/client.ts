import { PrismaClient }
from "@prisma/client";

import { env }
from "@repo/env/web";

declare global {

  var prisma:
    PrismaClient | undefined;

}

// REUSE EXISTING CLIENT
const prisma =
  globalThis.prisma ||

  new PrismaClient({

    datasourceUrl:
      env.DATABASE_URL,

  });

// SAVE TO GLOBAL
globalThis.prisma =
  prisma;

// EXPORT CLIENT
export const client = {

  db: prisma,

};