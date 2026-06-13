/**
 * Applies supabase/schema.sql to the Fenix Sites database.
 * Run: node scripts/setup-database.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, "../.env.local");
let dbPassword = process.env.SUPABASE_DB_PASSWORD;

try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
  dbPassword = dbPassword || process.env.SUPABASE_DB_PASSWORD;
} catch {
  // .env.local optional for DB password
}

if (!dbPassword) {
  console.error("Set SUPABASE_DB_PASSWORD in .env.local or environment.");
  process.exit(1);
}

const projectRef = "wnjhuhuodpzsryjrotej";
const encodedPassword = encodeURIComponent(dbPassword);
const sql = readFileSync(resolve(__dirname, "../supabase/schema.sql"), "utf8");

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
  await client.query(sql);
  console.log("Database schema applied successfully.");
  console.log("Tables ready: clients, projects");
} catch (err) {
  console.error("Schema setup failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
