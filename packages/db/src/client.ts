import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL not set");

const queryClient = postgres(url);
export const db = drizzle(queryClient, { schema, logger: process.env.DEBUG_DB === "1" });
export { schema };
