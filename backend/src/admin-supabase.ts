import { createSupabaseWorkerClient } from "./supabase";

export function createAdminDatabaseClient(env: Env) {
  return createSupabaseWorkerClient(
    env.ADMIN_SUPABASE_URL,
    env.ADMIN_SUPABASE_SECRET_KEY,
  );
}
