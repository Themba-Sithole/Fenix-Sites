/**
 * Creates the FenixSites admin user in Supabase Auth.
 * Run: node scripts/setup-admin.mjs
 * Requires .env.local with VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
 * Optional: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_ROLE (defaults to super_admin)
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
} catch {
  console.error("Could not read .env.local");
  process.exit(1);
}

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const role = process.env.ADMIN_ROLE ?? "super_admin";

if (!url || !email || !password) {
  console.error("Missing VITE_SUPABASE_URL, ADMIN_EMAIL, or ADMIN_PASSWORD in .env.local");
  process.exit(1);
}

const key = serviceKey ?? anonKey;
if (!key) {
  console.error("Missing VITE_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

if (serviceKey) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Admin", role },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      console.log("Admin account already exists.");
    } else {
      console.error("Create failed:", error.message);
      process.exit(1);
    }
  } else if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      email: data.user.email,
      full_name: "Admin",
      role,
    });
    console.log("Admin user created with role:", role);
  }
} else {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: "Admin", role } },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        console.error("User exists but sign-in failed:", signInError.message);
        process.exit(1);
      }
      console.log("Admin account exists — password verified.");
    } else {
      console.error("Sign up failed:", error.message);
      process.exit(1);
    }
  } else if (data.user) {
    console.log("Admin user created. Confirm email or disable confirmation in Supabase Auth.");
  }
}

console.log(`Email: ${email}`);
console.log("Login at: /admin/login");
console.log("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local — never commit credentials.");
