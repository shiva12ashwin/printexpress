import { checkShopDatabase, type ShopDatabaseHealthCheck } from "./health";

const HEALTH_PATH = "/internal/health/shop-database";

async function matchesToken(providedToken: string, expectedToken: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [providedDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(providedToken)),
    crypto.subtle.digest("SHA-256", encoder.encode(expectedToken)),
  ]);
  const provided = new Uint8Array(providedDigest);
  const expected = new Uint8Array(expectedDigest);
  let difference = 0;

  for (let index = 0; index < expected.length; index += 1) {
    difference |= provided[index] ^ expected[index];
  }

  return difference === 0;
}

function jsonResponse(body: object, status: number): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function fetchHandler(
  request: Request,
  env: Env,
  healthCheck: ShopDatabaseHealthCheck = checkShopDatabase,
): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname !== HEALTH_PATH) {
    return jsonResponse({ error: { code: "NOT_FOUND", message: "Route not found." } }, 404);
  }

  if (request.method !== "GET") {
    return jsonResponse({ error: { code: "METHOD_NOT_ALLOWED", message: "Method not allowed." } }, 405);
  }

  if (!env.HEALTHCHECK_TOKEN) {
    return jsonResponse({ error: { code: "NOT_CONFIGURED", message: "Health check is not configured." } }, 503);
  }

  const authorization = request.headers.get("Authorization") ?? "";
  const match = /^Bearer ([^\s]+)$/.exec(authorization);
  if (!match || !(await matchesToken(match[1], env.HEALTHCHECK_TOKEN))) {
    return jsonResponse({ error: { code: "UNAUTHORIZED", message: "Authorization required." } }, 401);
  }

  try {
    await healthCheck(env);
    return jsonResponse({ status: "ok", database: "shop" }, 200);
  } catch {
    console.error("Shop database health check failed.");
    return jsonResponse(
      { error: { code: "DATABASE_UNAVAILABLE", message: "Shop database health check failed." } },
      503,
    );
  }
}

export default {
  fetch: fetchHandler,
};
