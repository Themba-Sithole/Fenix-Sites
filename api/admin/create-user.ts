import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ROLES = ["super_admin", "admin", "editor", "finance", "viewer"] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceKey || !anonKey) {
    return res.status(500).json({ error: "Server configuration missing" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice(7);
  const userClient = createClient(supabaseUrl, anonKey);
  const { data: { user }, error: authError } = await userClient.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Invalid session" });
  }

  const adminClient = createClient(supabaseUrl, serviceKey);
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    return res.status(403).json({ error: "Only super admins can create users" });
  }

  const { email, password, full_name, role } = req.body as {
    email?: string;
    password?: string;
    full_name?: string;
    role?: string;
  };

  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: "Email and password (min 8 chars) required" });
  }

  const userRole = ROLES.includes(role as (typeof ROLES)[number]) ? role : "viewer";

  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: { full_name: full_name ?? "", role: userRole },
  });

  if (createError) {
    return res.status(400).json({ error: createError.message });
  }

  if (newUser.user) {
    await adminClient
      .from("profiles")
      .upsert({
        id: newUser.user.id,
        email: newUser.user.email!,
        full_name: full_name ?? null,
        role: userRole,
      });
  }

  return res.status(200).json({
    id: newUser.user?.id,
    email: newUser.user?.email,
    role: userRole,
  });
}
