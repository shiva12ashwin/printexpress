# PrintExpress Cloudflare Worker

This Worker has separate server-only Supabase clients for the shared Shop Database and the
Admin Database. The Shop health endpoint uses only the Shop Database client; the Admin client
has separate bindings and is not used by that endpoint.

## Production-only workflow

Application and database connection testing is performed against the deployed Cloudflare
Worker and hosted Supabase project only. Do not use `wrangler dev`, localhost, or local
credentials as an application testing environment. `.dev.vars.example` is an optional
variable-name reference only.

### 1. Apply the Shop Database health migration

In the Supabase dashboard:

1. Select the `printexpress` project.
2. Open **SQL Editor** and create a new query.
3. Paste the contents of
   `database/shop-database/migrations/0001_health_check.sql`.
4. Run the query and confirm it succeeds.

This migration creates only a no-table health-check function. Do not run it in the Admin
Database.

### 2. Create the Worker if it does not exist

For first-time setup, open **Cloudflare Dashboard → Workers & Pages → Create application →
Create Worker**, name it `printexpress`, and deploy the default placeholder once so the
Worker's **Settings → Variables and Secrets** page is available. This placeholder is not the
PrintExpress API and must not be used for health verification.

If the Worker already exists, skip this step.

### 3. Add production Worker secrets

In **Cloudflare Dashboard → Workers & Pages → printexpress → Settings → Variables and
Secrets**, add these as **Secret** values (not plain-text variables):

- `SUPABASE_URL` — the hosted URL for the `printexpress` Shop Database project.
- `SUPABASE_SECRET_KEY` — a newly rotated server-only Supabase secret key for that project.
- `HEALTHCHECK_TOKEN` — a separate, long, randomly generated bearer token.

Save the secrets. Never paste their values into source files, GitHub, frontend settings,
tickets, logs, or chat. The Supabase key previously shared in chat must be revoked/rotated
before configuring production.

The Admin client uses separate Worker bindings named `ADMIN_SUPABASE_URL` and
`ADMIN_SUPABASE_SECRET_KEY`. Add them as Cloudflare **Secret** values only when Admin Database
features are ready, using a newly rotated key for the Admin project. Never substitute the Shop
bindings or use an Admin key for Shop Database operations. The health endpoint does not use or
verify the Admin client.

Alternatively, after the Worker exists, configure the same secrets with Wrangler from the
repository root; Wrangler prompts for each value:

```powershell
pnpm --filter @printexpress/backend exec wrangler secret put SUPABASE_URL
pnpm --filter @printexpress/backend exec wrangler secret put SUPABASE_SECRET_KEY
pnpm --filter @printexpress/backend exec wrangler secret put HEALTHCHECK_TOKEN
```

### 4. Configure Cloudflare's build and deploy commands

Keep the Cloudflare project root at the repository root so pnpm can resolve the workspace.
The build command `pnpm run build` builds the commercial Next.js app; it does not deploy the
Worker. For the Worker deployment command, use the backend package's existing script:

```powershell
pnpm --filter @printexpress/backend run deploy
```

Use `run` because pnpm reserves `deploy` for its workspace deployment command. This invokes
the package script and locally installed Wrangler from `backend/`, where `wrangler.toml` is
located. Do not use `npx wrangler deploy` at the workspace root: that invokes Wrangler in the
wrong project context and can trigger workspace app detection errors.

Authenticate Wrangler if needed (`pnpm --filter @printexpress/backend exec wrangler login`),
then trigger a new Cloudflare production deployment.

Confirm the deploy succeeds and note the production `workers.dev` URL shown by Wrangler or
Cloudflare Dashboard → **Workers & Pages → printexpress → Settings → Domains & Routes**.
The deployment uses the `printexpress` name in `backend/wrangler.toml`.

### 5. Verify the deployed health endpoint

Set `HEALTHCHECK_TOKEN` in the shell's protected environment without echoing it, then call
the production URL from an authorized workstation. Replace the URL with the deployed URL:

```powershell
$workerUrl = "https://printexpress.<account-subdomain>.workers.dev"
Invoke-RestMethod `
  -Method Get `
  -Uri "$workerUrl/internal/health/shop-database" `
  -Headers @{ Authorization = "Bearer $env:HEALTHCHECK_TOKEN" }
```

A confirmed live connection returns:

```json
{"status":"ok","database":"shop"}
```

An unauthorized request returns `401`; an unavailable or incorrectly configured Shop
Database returns a generic `503`. The Worker does not return Supabase errors or credentials.
Do not claim the connection is live unless the deployed endpoint returns the success response.

## Security and scope

Supabase secret keys have elevated access and must remain Worker-only. The health endpoint is
diagnostic, not an application-data API. It does not disable RLS or add operational tables.
Before implementing shop operations, authenticate shop context server-side, resolve the shop
from trusted records, scope every query by the verified `shop_id`, and keep appropriate RLS
policies enabled. Never trust browser-provided shop IDs or prices.

The Admin client scaffold does not query or deploy the Admin Database. This phase also does
not implement Razorpay or application tables.
