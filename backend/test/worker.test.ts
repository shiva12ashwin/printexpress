import { describe, expect, it, vi } from "vitest";
import { fetchHandler } from "../src";

const env: Env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SECRET_KEY: "test-secret",
  ADMIN_SUPABASE_URL: "https://admin.example.supabase.co",
  ADMIN_SUPABASE_SECRET_KEY: "admin-test-secret",
  HEALTHCHECK_TOKEN: "test-health-token",
};

function request(path = "/internal/health/shop-database", init?: RequestInit) {
  return new Request(`https://worker.example${path}`, init);
}

describe("Shop Database health endpoint", () => {
  it("requires a health-check bearer token and does not call Supabase", async () => {
    const healthCheck = vi.fn(async () => {});

    const response = await fetchHandler(request(), env, healthCheck);

    expect(response.status).toBe(401);
    expect(healthCheck).not.toHaveBeenCalled();
    expect(await response.json()).toEqual({
      error: { code: "UNAUTHORIZED", message: "Authorization required." },
    });
  });

  it("runs the private database check and returns a generic success", async () => {
    const healthCheck = vi.fn(async () => {});

    const response = await fetchHandler(
      request(undefined, { headers: { Authorization: "Bearer test-health-token" } }),
      env,
      healthCheck,
    );

    expect(response.status).toBe(200);
    expect(healthCheck).toHaveBeenCalledWith(env);
    expect(await response.json()).toEqual({ status: "ok", database: "shop" });
  });

  it("does not return internal database errors", async () => {
    const healthCheck = vi.fn(async () => {
      throw new Error("secret key and database internals");
    });

    const response = await fetchHandler(
      request(undefined, { headers: { Authorization: "Bearer test-health-token" } }),
      env,
      healthCheck,
    );
    const body = await response.text();

    expect(response.status).toBe(503);
    expect(body).not.toContain("secret key");
    expect(body).not.toContain("database internals");
  });

  it("does not route unknown paths to the health check", async () => {
    const healthCheck = vi.fn(async () => {});

    const response = await fetchHandler(request("/health"), env, healthCheck);

    expect(response.status).toBe(404);
    expect(healthCheck).not.toHaveBeenCalled();
  });
});
