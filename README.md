# Nuvia — E-Commerce Anti-Cellulite

Arabic RTL e-commerce site for the Nuvia Clinic brand. COD (Cash on Delivery) ordering for GCC countries.

## Project Structure

```
nuvia/
├── app/                    # Next.js 14 App Router
│   ├── admin/              # Admin dashboard (login, orders, stats)
│   ├── api/order/          # Next.js API route → Google Sheets + backend
│   ├── product/[slug]/     # Dynamic product pages
│   └── thankyou/           # Post-order confirmation page
├── backend/                # Fastify API server
│   ├── prisma/             # PostgreSQL schema
│   └── src/
│       ├── routes/         # orders.ts, admin.ts
│       └── services/       # metaCapi.ts
├── components/             # React components
├── data/                   # products.ts, reviews.ts, etc.
├── public/images/          # Static assets
├── Dockerfile              # Frontend Docker image
├── docker-compose.yml      # Local dev stack
└── next.config.js
```

## Products

| Slug | Product | Price |
|------|---------|-------|
| `anti-cellulite-kit` | باقة نوفيا المضادة للسيلوليت | 239 SAR |
| `cellulite-oil` | زيت نوفيا للسيلوليت | 129 SAR |
| `body-massage-brush` | فرشاة التدليك الاحترافية | 89 SAR |
| `complete-cellulite-program` | البرنامج الكامل | 299 SAR |
| `pack-rf` | باقة RF لشد الجلد | 299 SAR |
| `pack-ultrasons` | باقة الموجات الفوقية الصوتية | 269 SAR |

## Local Development

### Option 1 — Docker Compose (full stack)

```bash
# Clone and start everything
docker compose up --build

# In a separate terminal, run DB migrations
docker compose exec backend npx prisma migrate deploy
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

### Option 2 — Without Docker

```bash
# 1. Start frontend
npm install
npm run dev

# 2. Start backend (in another terminal)
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Environment Variables

### Frontend (`.env.local`)

Copy `.env.example` to `.env.local` and fill in:

```env
GOOGLE_SHEET_ID=            # Your Google Sheet ID
GOOGLE_SHEETS_CREDENTIALS=  # Service account JSON (stringified)
BACKEND_URL=                # Set to backend URL to enable DB storage
NEXT_PUBLIC_API_URL=        # Same as BACKEND_URL but public (for admin)
NEXT_PUBLIC_FB_PIXEL_ID=    # Facebook Pixel ID
NEXT_PUBLIC_SITE_URL=https://nuviabody.shop
```

### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@host:5432/nuvia
JWT_SECRET=<random 32+ char string>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong password>
META_PIXEL_ID=              # Facebook Pixel ID
META_ACCESS_TOKEN=          # Meta Conversions API token
FRONTEND_URL=https://nuviabody.shop
PORT=3001
```

## Admin Dashboard

Access at `/admin` — sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from the backend env.

Pages:
- `/admin/login` — Login
- `/admin/orders` — Orders table with status management
- `/admin/stats` — Revenue and conversion stats

## API Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/orders` | Create order (from checkout form) |
| GET | `/health` | Health check |

### Admin (JWT required)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/admin/login` | Get JWT token |
| GET | `/api/admin/orders` | List orders (filterable, paginated) |
| PATCH | `/api/admin/orders/:id/status` | Update order status |
| GET | `/api/admin/stats` | Dashboard statistics |

## Deployment on Easypanel

1. **PostgreSQL service** — Create a Postgres app, note the connection string.

2. **Backend service** — Create app from GitHub repo, set `Root Directory: backend`, set env vars:
   ```
   DATABASE_URL=<from step 1>
   JWT_SECRET=<generate with: openssl rand -base64 32>
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=<strong password>
   META_PIXEL_ID=<your pixel>
   META_ACCESS_TOKEN=<your token>
   FRONTEND_URL=https://nuviabody.shop
   ```
   After first deploy, run migration: open terminal → `npx prisma migrate deploy`

3. **Frontend service** — Create app from same GitHub repo, set env vars:
   ```
   BACKEND_URL=http://backend:3001
   NEXT_PUBLIC_API_URL=https://api.nuviabody.shop
   GOOGLE_SHEET_ID=<your sheet>
   GOOGLE_SHEETS_CREDENTIALS=<service account JSON>
   NEXT_PUBLIC_FB_PIXEL_ID=<your pixel>
   NEXT_PUBLIC_SITE_URL=https://nuviabody.shop
   ```

4. **Set domains** — nuviabody.shop → frontend, api.nuviabody.shop → backend

## Order Flow

```
Customer → Checkout Form → Next.js /api/order
  → Google Sheets (always)
  → Fastify /api/orders (if BACKEND_URL is set)
    → PostgreSQL
    → Meta CAPI Purchase event (async)
```

## Meta Conversions API

The backend automatically sends a `Purchase` event to Meta CAPI on every new order:
- Phone number is SHA256 hashed before sending
- `fbp` / `fbc` cookies are forwarded when available
- Uses `event_id` for deduplication with browser pixel
- Set `META_TEST_EVENT_CODE` for testing (remove in production)
