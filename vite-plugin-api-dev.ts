import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import { handleCreateUser } from "./api/lib/create-user";

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function apiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/admin/create-user" || req.method !== "POST") {
          return next();
        }

        try {
          const body = (await readJsonBody(req)) as Record<string, unknown>;
          const result = await handleCreateUser(req.headers.authorization, body, {
            supabaseUrl: env.VITE_SUPABASE_URL ?? env.SUPABASE_URL,
            serviceKey: env.SUPABASE_SERVICE_ROLE_KEY,
            anonKey: env.VITE_SUPABASE_ANON_KEY ?? env.SUPABASE_ANON_KEY,
          });
          sendJson(res, result.status, result.body);
        } catch {
          sendJson(res, 500, { error: "Internal server error" });
        }
      });
    },
  };
}
