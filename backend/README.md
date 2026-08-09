# Skin by Yas API

Standalone REST backend for the existing Skin by Yas frontend. It uses Express, Prisma, and PostgreSQL. It does not seed products, brands, services, articles, or business details.

## Setup

1. Copy `.env.example` to `.env` and provide a PostgreSQL `DATABASE_URL`, the deployed/local frontend URL, and a random `JWT_SECRET` of at least 32 characters.
2. Run `npm install`.
3. Run `npm run prisma:generate`.
4. Create the first development migration with `npm run migrate:dev -- --name init` against a development database.
5. Create an administrator once:

   ```bash
   ADMIN_NAME="..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npm run admin:create
   ```

6. Start locally with `npm run dev` or in production with `npm start`.

For production, commit generated migration files and run `npm run migrate:deploy`. Never run a destructive database reset in production.

## Confirmed categories

The API permits category administration, but intentionally inserts nothing automatically. Create only these confirmed categories through the protected API: Skincare, Soins cheveux, Soins corps, and Produits solaires.

## Main endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/products`, `GET /api/products/:slug`
- `GET /api/categories`, `GET /api/categories/:slug`
- `GET /api/brands`, `GET /api/brands/:slug`
- `POST /api/orders`
- `GET /api/articles`, `GET /api/articles/:slug`
- `POST /api/reservations`
- `/api/admin/*` for authenticated catalog, orders, articles, and reservations management

Send the JWT as `Authorization: Bearer <token>` for admin routes. Prices are returned as two-decimal strings in MAD. Product prices and order totals are always loaded and calculated by the server. `SHIPPING_COST_MAD` defaults to `0`; configure it only when the real business rule is known.

## Deployment

Deploy `backend/` to a Node.js host with PostgreSQL. The existing frontend remains unchanged. Configure `FRONTEND_URL` to the exact frontend origin and expose the backend base URL to the frontend only when integration is requested.
