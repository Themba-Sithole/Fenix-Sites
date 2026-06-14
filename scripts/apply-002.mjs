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
const sql = readFileSync(resolve(__dirname, "../supabase/migrations/002_admin_features.sql"), "utf8");
await client.query(sql);
console.log("Applied: 002_admin_features.sql");

// Bootstrap profile for existing admin users without one
await client.query(`
  insert into public.profiles (id, email, full_name, role)
  select id, email, split_part(email, '@', 1), 'super_admin'::public.user_role
  from auth.users
  where id not in (select id from public.profiles)
  on conflict (id) do nothing;
`);
console.log("Bootstrapped profiles for existing users.");

await client.end();
