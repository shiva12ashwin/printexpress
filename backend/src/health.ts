import { createShopDatabaseClient } from "./supabase";

export async function checkShopDatabase(env: Env): Promise<void> {
  const client = createShopDatabaseClient(env);
  const { data, error } = await client.rpc("printexpress_health_check");

  if (error || data !== "ok") {
    throw new Error("Shop database health check failed.");
  }
}

export type ShopDatabaseHealthCheck = (env: Env) => Promise<void>;
