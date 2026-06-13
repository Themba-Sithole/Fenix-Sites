/**
 * Creates the FenixSites admin user in Supabase Auth.
 * Run: node scripts/setup-admin.mjs
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
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
const key = process.env.VITE_SUPABASE_ANON_KEY;
const email = "tjsgamerspro1@gmail.com";
const password = "123456Tjs.";

if (!url || !key) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase.auth.signUp({ email, password });

if (error) {
  if (error.message.includes("already registered")) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      console.error("User exists but sign-in failed:", signInError.message);
      console.log("Reset password in Supabase Dashboard → Authentication → Users");
      process.exit(1);
    }
    console.log("Admin account already exists — password verified successfully.");
    process.exit(0);
  }
  console.error("Sign up failed:", error.message);
  process.exit(1);
}

if (data.user && !data.session) {
  console.log("Admin user created. Check email to confirm, or disable email confirmation in Supabase Auth settings.");
} else {
  console.log("Admin user created and signed in successfully.");
}

console.log(`Email: ${email}`);
console.log("Login at: /admin/login");
