import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./app/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
