import pg from "pg";
import { readFileSync } from "fs";
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
const result = await client.query(`
  UPDATE auth.users
  SET email_confirmed_at = COALESCE(email_confirmed_at, now())
  WHERE email = 'tjsgamerspro1@gmail.com'
  RETURNING email, email_confirmed_at
`);
console.log(result.rows.length ? "Email confirmed:" : "User not found:", result.rows);
await client.end();
