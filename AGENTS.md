# PrintExpress Agent Instructions

PrintExpress is a commercial, multi-tenant SaaS printing platform. Build it in controlled
phases and preserve the approved architecture below.

## Architecture

- Use one Next.js/React/TypeScript/Tailwind application for both `/` and `/[shopSlug]`.
- Commercial website code belongs in `commercial-web/`.
- Shop customer website code belongs in `shop-website/`.
- Backend code belongs in `backend/` and uses Cloudflare Workers with TypeScript REST APIs.
- Use separate Supabase PostgreSQL projects: Admin Database and Shop Database.
- Use Supabase private storage and server-side signed URLs.
- Use Razorpay for subscriptions and shop customer payments.
- Do not use subdomains or separate deployments for shops.

## Security and data isolation

- Never expose service-role keys, Supabase credentials, Razorpay secrets or webhook secrets
  to browser code.
- Derive shop identity from verified server-side records and route context.
- Never trust browser-supplied shop ID, price or payment amount.
- Enforce shop-wise isolation in every shop database query and RLS policy.
- Verify Razorpay signatures and webhooks on the backend.
- Activate subscriptions and mark orders paid only after backend verification.

## Code quality

- Use strict TypeScript, ESLint, Prettier and appropriate automated tests.
- Reuse components and keep UI separate from business logic.
- Validate all inputs at API boundaries.
- Use clear loading, empty and error states.
- Keep development, staging and production configuration distinct.
- Do not add unnecessary dependencies or duplicate the Next.js runtime.
- Do not overwrite working code without understanding it.
- Do not invent credentials or claim integrations pass tests before verification.

## Folder rules

- `commercial-web/`: only the shared Next.js application and commercial feature code.
- `shop-website/`: only customer shop feature modules.
- `backend/`: Workers routes, middleware, services, repositories, validators and types.
- `database/admin-database/`: Admin Database migrations, seeds and documentation.
- `database/shop-database/`: Shop Database migrations, seeds and documentation.
- `shared/`: genuinely reusable types, constants and utilities.
- `docs/`: architecture, database, API and development documentation.
- `tests/`: cross-module tests.

## Workflow

Complete the approved phases in order: repository inspection, structure/configuration,
Next.js setup, design system, commercial website, dynamic shop website, databases, backend,
authentication/subscriptions, uploads, pricing/payments, order processing, testing and deployment.
The Windows EXE is a later phase.

After each phase, report what changed, tests actually run and results, blockers, and the next
concrete task.
