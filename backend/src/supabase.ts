import { createClient } from "@supabase/supabase-js";

export function createSupabaseWorkerClient(url: string, secretKey: string) {
  if (!url || !secretKey) {
    throw new Error("Supabase Worker configuration is incomplete.");
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export function createShopDatabaseClient(env: Env) {
  return createSupabaseWorkerClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}
