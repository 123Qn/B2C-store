import { PrismaClient } from "@prisma/client";
import { env } from "@repo/env/web";

declare global {
  var prisma: PrismaClient | undefined;
}

export const createClient = () => {
  if (globalThis.prisma) {
    globalThis.prisma.$disconnect();
    globalThis.prisma = undefined;
  }

  const URL = env.DATABASE_URL;
  const prisma = new PrismaClient({ datasourceUrl: URL });
  
  globalThis.prisma = prisma;
  return prisma;
};

export const client = {
  get db() {
    return createClient();
  },
};
