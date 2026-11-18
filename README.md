# PrintExpress

PrintExpress is a multi-tenant SaaS printing platform for Xerox and printing shops.

## Repository structure

- `commercial-web/` - shared Next.js application and commercial website
- `shop-website/` - customer shop website feature module
- `backend/` - Cloudflare Workers REST API
- `database/admin-database/` - separate Supabase Admin Database
- `database/shop-database/` - separate Supabase Shop Database
- `shared/` - reusable types, constants and utilities
- `docs/` - project documentation
- `tests/` - cross-module tests

## Implementation plan

1. Establish folder structure and workspace configuration.
2. Set up one strict Next.js application with Tailwind CSS and shadcn/ui.
3. Create reusable design tokens and components.
4. Build `/` commercial pages and shop owner account flows.
5. Build `/[shopSlug]` customer printing flows.
6. Add independent Admin and Shop Supabase migrations.
7. Implement Cloudflare Workers services and secure APIs.
8. Integrate authentication, subscriptions and Razorpay webhooks.
9. Add private uploads, pricing, orders and secure document retrieval.
10. Run tests, security checks and production configuration validation.

The Windows EXE will be implemented after the web and backend architecture is stable.

## Baseline requirements

- Node.js 22
- pnpm 9
- TypeScript
- Supabase projects for Admin and Shop databases
- Cloudflare account
- Razorpay account

## Setup

```powershell
pnpm install
cp .env.example .env
pnpm dev
```
