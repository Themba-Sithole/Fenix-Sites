import { createClient } from "@supabase/supabase-js";

const ROLES = ["super_admin", "admin", "editor", "finance", "viewer"] as const;

export interface CreateUserInput {
  email?: string;
  password?: string;
  full_name?: string;
  role?: string;
}

export interface CreateUserResult {
  status: number;
  body: Record<string, unknown>;
}

export async function handleCreateUser(
  authHeader: string | undefined,
  input: CreateUserInput,
  env: {
    supabaseUrl?: string;
    serviceKey?: string;
    anonKey?: string;
  }
): Promise<CreateUserResult> {
  const { supabaseUrl, serviceKey, anonKey } = env;

  if (!supabaseUrl || !serviceKey || !anonKey) {
    return { status: 500, body: { error: "Server configuration missing" } };
  }

  if (!authHeader?.startsWith("Bearer ")) {
    return { status: 401, body: { error: "Unauthorized" } };
  }

  const token = authHeader.slice(7);
  const userClient = createClient(supabaseUrl, anonKey);
  const {
    data: { user },
    error: authError,
  } = await userClient.auth.getUser(token);

  if (authError || !user) {
    return { status: 401, body: { error: "Invalid session" } };
  }

  const adminClient = createClient(supabaseUrl, serviceKey);
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    return { status: 403, body: { error: "Only super admins can create users" } };
  }

  const { email, password, full_name, role } = input;

  if (!email || !password || password.length < 8) {
    return { status: 400, body: { error: "Email and password (min 8 chars) required" } };
  }

  const userRole = ROLES.includes(role as (typeof ROLES)[number]) ? role : "viewer";

  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: { full_name: full_name ?? "", role: userRole },
  });

  if (createError) {
    return { status: 400, body: { error: createError.message } };
  }

  if (newUser.user) {
    await adminClient.from("profiles").upsert({
      id: newUser.user.id,
      email: newUser.user.email!,
      full_name: full_name ?? null,
      role: userRole,
    });
  }

  return {
    status: 200,
    body: {
      id: newUser.user?.id,
      email: newUser.user?.email,
      role: userRole,
    },
  };
}
