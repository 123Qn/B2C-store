import { store, storeMode } from "@repo/db/store";

// Restores demo users + products and clears orders.
// Works for both Postgres (DATABASE_URL set) and the JSON store.
export async function seed() {
  console.log(`🌱 Seeding data (${storeMode})`);
  await store.reset();
  console.log("✅ Data seeded");
}
