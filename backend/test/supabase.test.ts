import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

import { createClient } from "@supabase/supabase-js";
import { createAdminDatabaseClient } from "../src/admin-supabase";

const env: Env = {
  SUPABASE_URL: "https://shop.example.supabase.co",
  SUPABASE_SECRET_KEY: "shop-test-key",
  ADMIN_SUPABASE_URL: "https://admin.example.supabase.co",
  ADMIN_SUPABASE_SECRET_KEY: "admin-test-key",
  HEALTHCHECK_TOKEN: "health-test-token",
};

describe("Admin Database client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses only the dedicated Admin Database bindings", () => {
    createAdminDatabaseClient(env);

    expect(createClient).toHaveBeenCalledWith(
      env.ADMIN_SUPABASE_URL,
      env.ADMIN_SUPABASE_SECRET_KEY,
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      },
    );
    expect(createClient).not.toHaveBeenCalledWith(
      env.SUPABASE_URL,
      env.SUPABASE_SECRET_KEY,
      expect.anything(),
    );
  });

  it("fails closed when Admin Database bindings are missing", () => {
    expect(() =>
      createAdminDatabaseClient({
        ...env,
        ADMIN_SUPABASE_URL: "",
        ADMIN_SUPABASE_SECRET_KEY: "",
      }),
    ).toThrow("Supabase Worker configuration is incomplete.");
    expect(createClient).not.toHaveBeenCalled();
  });
});
