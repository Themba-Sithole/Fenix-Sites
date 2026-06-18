import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleCreateUser } from "../lib/create-user";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await handleCreateUser(req.headers.authorization, req.body, {
    supabaseUrl: process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY,
  });

  return res.status(result.status).json(result.body);
}
