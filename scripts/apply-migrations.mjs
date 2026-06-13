import pg from "pg";
import { readFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
let password = "AfriUTD2026*";
for (const line of env.split("\n")) {
  const [k, ...r] = line.split("=");
  if (k?.trim() === "SUPABASE_DB_PASSWORD" && r.length) password = r.join("=").trim();
}

const client = new pg.Client({
  connectionString: `postgresql://postgres.wnjhuhuodpzsryjrotej:${encodeURIComponent(password)}@aws-1-eu-central-1.pooler.supabase.com:5432/postgres`,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
const migrationsDir = resolve(__dirname, "../supabase/migrations");
for (const file of readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort()) {
  await client.query(readFileSync(resolve(migrationsDir, file), "utf8"));
  console.log(`Applied: ${file}`);
}
await client.end();
