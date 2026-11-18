# PrintExpress Shop Database

This is the separate Supabase PostgreSQL project shared by all shops.

Store shop operational profiles, printing configurations, customers, orders, payments,
documents and reports here. Every operational record must include `shop_id`, and every query
must enforce server-side shop-wise isolation.

- Place approved SQL migrations in `migrations/`.
- Place controlled seed data in `seeds/`.
- Use RLS and trusted server-side authorization.
