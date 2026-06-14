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

const projectRef = "wnjhuhuodpzsryjrotej";
const encodedPassword = encodeURIComponent(password);
const connectionCandidates = [
  `postgresql://postgres.${projectRef}:${encodedPassword}@aws-1-eu-central-1.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.${projectRef}:${encodedPassword}@aws-1-eu-central-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres:${encodedPassword}@db.${projectRef}.supabase.co:5432/postgres`,
  `postgresql://postgres.${projectRef}:${encodedPassword}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`,
];

let client;
let lastError;

for (const connectionString of connectionCandidates) {
  const candidate = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await candidate.connect();
    client = candidate;
    break;
  } catch (err) {
    lastError = err;
    try {
      await candidate.end();
    } catch {
      // ignore cleanup errors
    }
  }
}

if (!client) {
  console.error("Could not connect to Supabase database:", lastError?.message);
  process.exit(1);
}

try {
  const sql = readFileSync(resolve(__dirname, "../supabase/migrations/004_viewer_dashboard_access.sql"), "utf8");
  await client.query(sql);
  console.log("Applied: 004_viewer_dashboard_access.sql");
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
