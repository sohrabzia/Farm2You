# Farm2You

Pakistani farm-to-family **e-commerce marketplace** + admin console — built for buyers aged 22–45.
Order fresh produce, dairy, livestock and agri-inputs directly from verified Pakistani farmers,
with **Cash on Delivery** support and same-day delivery in Karachi.

Built with **Vite + React + TailwindCSS**. Backend on **Cloudflare Pages Functions** with a free
**Cloudflare D1** database. Icons by **lucide-react**, product imagery from **Unsplash**.

---

## What's inside

### Storefront
- `/` — Shop home with hero, category tiles, featured products, mission strip
- `/shop` — Product browse with category chips, sort, organic filter, search
- `/product/:slug` — Product detail page with bilingual name (EN + Urdu), gallery, qty picker
- `/cart` — Cart page + a slide-out cart drawer everywhere
- `/checkout` — Checkout form with **Cash on Delivery** and Bank Transfer options
- `/order/:id/confirmed` — Order confirmation
- `/account/login`, `/account/signup` — Customer auth (phone-based)
- `/account` — Order history (protected)

### Admin console
- `/login` — Admin sign-in
- `/admin` — Dashboard (products, orders, customers, revenue)
- `/admin/products` — CRUD products with Unsplash image URLs, organic + featured flags
- `/admin/orders` — Update order status (pending → confirmed → dispatched → delivered)
- `/admin/farmers`, `/admin/consultations` — Supplier and expert management

### Backend (Cloudflare Pages Functions + D1)
- `/api/products` `?category=&q=&featured=&organic=`
- `/api/products/:slug`
- `/api/orders` (POST — guest + signed-in checkout) · `/api/orders/:id`
- `/api/customer/{signup,login,logout,me,orders}`
- `/api/auth/{login,logout,me}` — admin
- `/api/admin/*` — protected CRUD (sessions stored in D1)

---

## Local development

```bash
npm install

# 1. Front-end only (no API):
npm run dev

# 2. Front-end + API + local D1 (use this to exercise the shop):
npm run dev:full

# Apply schema and seed sample products to local D1:
npm run db:init
```

### Default admin
```
email:    admin@farm2you.pk
password: farm2you
```
Change the hash via `migrations/0002_seed.sql` or roll a "change password" endpoint
following the pattern in `functions/api/auth/login.js`.

### Customer accounts
Customers sign up with **phone + password**; orders can also be placed as a guest.

---

## Deploying to Cloudflare Pages

1. Push to GitHub / GitLab.
2. Cloudflare dashboard → **Workers & Pages → Pages → Connect to Git**.
3. Build settings: framework `Vite`, build command `npm run build`, output `dist`.
4. Create a D1 database:
   ```bash
   npx wrangler d1 create farm2you-db
   ```
   Paste the returned `database_id` into `wrangler.toml`.
5. Apply schema and seed:
   ```bash
   npm run db:init:remote
   ```
6. In Pages → **Settings → Functions → D1 bindings** add binding `DB → farm2you-db`.

D1 free tier: 5 GB storage, 5 M reads/day, 100 K writes/day — more than enough to launch.

---

## Customizing products

Edit `migrations/0002_seed.sql` to change the starter catalogue, or use the admin
console at `/admin/products` to add new items. Image URLs use the Unsplash CDN format:
`https://images.unsplash.com/photo-XXXXXX?w=900&q=80`.

---

## Project layout

```
.
├── index.html
├── src/
│   ├── App.jsx                       # Router (shop + admin)
│   ├── components/shop/              # Header, footer, cart drawer, product card
│   ├── pages/
│   │   ├── shop/                     # Home, Browse, Product, Cart, Checkout, Account…
│   │   ├── admin/                    # Dashboard, Products, Orders, Farmers…
│   │   └── Login.jsx
│   ├── lib/
│   │   ├── api.js                    # fetch wrapper
│   │   ├── cart.jsx                  # localStorage-backed cart context
│   │   ├── customer.jsx              # customer-auth context
│   │   └── auth.jsx                  # admin-auth context
│   ├── index.css                     # Tailwind + grain texture
│   └── main.jsx
├── functions/                        # Cloudflare Pages Functions
│   ├── _lib/auth.js                  # PBKDF2 + sessions (admin + customer)
│   └── api/
│       ├── products/                 # public catalogue
│       ├── orders/                   # public checkout + order detail
│       ├── customer/                 # signup/login/me/orders
│       ├── auth/                     # admin auth
│       └── admin/                    # protected CRUD
├── migrations/                       # D1 schema + seed
├── tailwind.config.js
└── wrangler.toml
```
