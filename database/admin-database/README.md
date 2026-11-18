# PrintExpress Admin Database

This is the separate Supabase PostgreSQL project for platform and subscription data.

Store only platform administration, shop registrations, subscriptions, licenses and trusted
shop database mappings here. Do not store customer orders, printing documents or shop histories.

- Place approved SQL migrations in `migrations/`.
- Place controlled seed data in `seeds/`.
- Keep service-role access exclusively in server-side backend code.
