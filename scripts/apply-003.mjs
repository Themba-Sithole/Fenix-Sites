import pg from "pg";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
let password = "";
for (const line of env.split("\n")) {
  const [k, ...r] = line.split("=");
  if (k?.trim() === "SUPABASE_DB_PASSWORD" && r.length) password = r.join("=").trim();
}

if (!password) {
  console.error("SUPABASE_DB_PASSWORD not set in .env.local");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: `postgresql://postgres.wnjhuhuodpzsryjrotej:${encodeURIComponent(password)}@aws-1-eu-central-1.pooler.supabase.com:5432/postgres`,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
const sql = readFileSync(resolve(__dirname, "../supabase/migrations/003_profile_settings.sql"), "utf8");
await client.query(sql);
console.log("Applied: 003_profile_settings.sql");
await client.end();
