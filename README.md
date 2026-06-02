# 🛍️ B2C Store Application (Fashion Shop)
# Visit Store at https://qstore.ink/(BrokenNow) https://b2-c-store-web.vercel.app/

# ✨ Features

## 🎨 Frontend

- Display a list of fashion products with:
  - Product name
  - Description
  - Price
  - Product image

- Browse products by:
  - Categories
  - Brands
  - Price ranges

- Search products by name

- Shopping cart system:
  - Add products to cart
  - Increase / decrease quantity
  - Remove items from cart

- Payment System ( NOT IMPLEMENT YET )
 
- Product detail pages

- Authentication system:
  - Buyer(Clients) login
  - Admin login

- Order history page(Auth)

---

## ⚙️ Backend

- REST API using Next.js Route Handlers

- Database management using Prisma ORM

- PostgreSQL database hosted on AWS RDS

- Authentication with JWT


---

# 🧰 Tech Stack

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

## Cloud / Deployment
- AWS RDS
For Database Hosted

- Vercel
For Hosting FrontEnd and BackEnd
b2-c-store-ah415xg5w-123qns-projects.vercel.app

---

# 📁 Project Structure

```txt
B2C-Store/
├── apps/
│   ├── Back-End/                    ⚙️ Next.js API Server
│   │   ├── app/
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       │   ├── check/
│   │   │       │   │   └── route.ts
│   │   │       │   ├── register/
│   │   │       │   │   └── route.ts
│   │   │       │   └── route.ts
│   │   │       ├── orders/
│   │   │       │   ├── all/
│   │   │       │   │   └── route.ts
│   │   │       │   └── route.ts
│   │   │       └── products/
│   │   │           ├── [id]/
│   │   │           │   └── route.ts
│   │   │           └── route.ts
│   │   ├── utils/
│   │   │   ├── auth.ts
│   │   │   └── logout.ts
│   │   ├── .env
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── Front-End/
│       └── web/                     🎨 Next.js Customer + Admin UI
│           └── src/
│               ├── app/
│               │   ├── admin/
│               │   │   ├── orders/
│               │   │   │   └── page.tsx
│               │   │   ├── products/
│               │   │   │   ├── new/
│               │   │   │   │   └── page.tsx
│               │   │   │   └── page.tsx
│               │   │   └── page.tsx
│               │   ├── brand/
│               │   │   └── [brand]/
│               │   │       └── page.tsx
│               │   ├── category/
│               │   │   └── [category]/
│               │   │       └── page.tsx
│               │   ├── PaymentSystem/
│               │   │   ├── cart/
│               │   │   │   └── page.tsx
│               │   │   ├── history/
│               │   │   │   └── page.tsx
│               │   │   └── payment/
│               │   │       └── page.tsx
│               │   ├── products/
│               │   │   └── [urlId]/
│               │   │       └── page.tsx
│               │   ├── search/
│               │   │   └── page.tsx
│               │   ├── SessionManagement/
│               │   │   ├── login/
│               │   │   │   └── page.tsx
│               │   │   └── register/
│               │   │       └── page.tsx
│               │   └── page.tsx
│               ├── components/
│               │   ├── Admin/
│               │   │   └── ProductList.tsx
│               │   ├── Cart/
│               │   │   ├── CartContext.tsx
│               │   │   ├── CartItemCard.tsx
│               │   │   ├── CartSummary.tsx
│               │   │   └── EmptyCart.tsx
│               │   ├── Layout/
│               │   │   ├── AppLayout.tsx
│               │   │   └── TopMenu.tsx
│               │   ├── Menu/
│               │   │   ├── BrandList.tsx
│               │   │   ├── CategoryList.tsx
│               │   │   ├── LeftMenu.tsx
│               │   │   └── Mobile.tsx
│               │   ├── Product/
│               │   │   ├── Detail.tsx
│               │   │   ├── FilteredProducts.tsx
│               │   │   ├── List.tsx
│               │   │   └── ListItem.tsx
│               │   └── Search/
│               │       └── SearchPopup.tsx
│               ├── hooks/
│               │   └── useAdminAuth.ts
│               ├── styles/
│               │   ├── auth.ts
│               │   ├── cart.ts
│               │   ├── history.ts
│               │   ├── leftMenu.ts
│               │   ├── main.ts
│               │   ├── payment.ts
│               │   ├── product.ts
│               │   ├── search.ts
│               │   └── topMenu.ts
│               └── Main.tsx
│
├── packages/
│   ├── db/                          🗄️ Prisma Database
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── client.ts
│   │       ├── data.ts
│   │       └── seed.ts
│   ├── env/                         🔐 Environment Validation
│   │   └── web.ts
│   ├── ui/                          
│   ├── utils/                       
│   ├── eslint-config/
│   ├── tailwind-config/
│   └── typescript-config/
│
├── tests/
│   └── playwright/                  🧪 E2E Tests
│       └── tests/
│           └── web/
│               ├── admin.spec.ts
│               ├── cart-empty.spec.ts
│               ├── cart-with-item.spec.ts
│               ├── category-screen.spec.ts
│               ├── checkout.spec.ts
│               ├── fixtures.ts
│               ├── home-screen.spec.ts
│               ├── product-screen.spec.ts
│               ├── remove-cart-item.spec.ts
│               └── Search-popup.spec.ts
│
├── .github/
│   └── workflows/
│       └── ci.yml                   🔄 CI/CD Pipeline
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```
## 🔧 Getting Started

### Prerequisites
- Node.js 
- pnpm 
- PostgreSQL database

### Installation

```bash
# Clone the repo
git clone https://github.com/123Qn/B2C-store.git
cd B2C-store

# Install dependencies
pnpm install
```

### Environment Variables

Create `apps/Front-End/web/.env.local`:
```env
DATABASE_URL=postgres_url
DIRECT_URL=postgres_direct_url
JWT_SECRET=secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Create `apps/Back-End/.env`:
```env
DATABASE_URL=postgres_url
JWT_SECRET=secret
```

### Database Setup

```bash
# Generate Prisma client
pnpm --filter @repo/db db:generate

# Push schema to database
pnpm --filter @repo/db db:push

# Seed database
pnpm --filter @repo/db db:seed
```

### Run Development

```bash
# Start all apps
pnpm turbo dev

# Or individually
pnpm --filter @repo/api dev    # BE on port 3000
pnpm --filter @repo/web dev    # FE on port 3001
```

---

## 🧪 Testing

```bash
cd tests/playwright

# Run all tests
pnpm playwright test

# Run specific tags
pnpm playwright test --grep "@b2c"
pnpm playwright test --grep "@cart"
pnpm playwright test --grep "@admin"
pnpm playwright test --grep "@b2c|@cart|@admin"

# Run with UI
pnpm playwright test --ui
```
## 🔄 CI/CD

GitHub Actions runs on every push to `Main` branch:
- Install dependencies
- Generate Prisma client
- Build apps
- Run Playwright E2E tests

---

# 📋 API Document — B2C Store

---

## Description
This is an API for a B2C fashion store. It handles authentication, products, and orders.

## Base URL
The base URL for all API requests is:
- **Dev:** `http://localhost:3000`
- **Prod:** `https://b2-c-store-back-end.vercel.app`

---

## API Endpoints

---

### `[POST]` /api/auth — Login

**Request Body:**
- `email` (string)(required) — e.g., `"buyer@gmail.com"`
- `password` (string)(required) — e.g., `"123"`

**Response 200:**
- `message` (string) — `"Login successful"`
- `token` (string) — JWT token
- `user` (object) — `{ id, email, role }`

**Response 401:**
- `message` (string) — `"Invalid email or password"`

---

### `[DELETE]` /api/auth — Logout

**Response 200:**
- `message` (string) — `"Logout successful"`

---

### `[GET]` /api/auth/check — Verify Token

**Headers:**
- `Authorization` (string)(required) — `Bearer <token>`

**Response 200:**
- `message` (string) — `"OK"`
- `user` (object) — `{ id, role, iat, exp }`

**Response 401:**
- `message` (string) — `"Unauthorized"`

---

### `[POST]` /api/auth/register — Register

**Request Body:**
- `username` (string)(required) — e.g., `"john123"`
- `email` (string)(required) — e.g., `"john@mail.com"`
- `password` (string)(required) — e.g., `"123"`

**Response 201:**
- `message` (string) — `"User created successfully"`
- `user` (object) — `{ id, username, email, role }`

**Response 400:**
- `error` (string) — `"Missing required fields"`

**Response 409:**
- `error` (string) — `"Email already exists"`

---

### `[GET]` /api/products — Get Active Products

**Response 200:**
- `id` (number) — e.g., `1`
- `urlId` (string) — e.g., `"air-max-90"`
- `name` (string) — e.g., `"Air Max 90"`
- `brand` (string) — e.g., `"Nike"`
- `category` (string) — e.g., `"Sneakers"`
- `gender` (string) — e.g., `"Unisex"`
- `price` (number) — e.g., `199`
- `stock` (number) — e.g., `50`
- `sold` (number) — e.g., `10`
- `size` (array) — e.g., `["S", "M", "L", "XL"]`
- `imageUrl` (string) — e.g., `"https://..."`
- `active` (boolean) — `true`
- `createdAt` (string) — e.g., `"2024-01-01T00:00:00.000Z"`

---

### `[GET]` /api/products/all — Get All Products (Admin)

**Response 200:** Same as above but includes inactive products

---

### `[GET]` /api/products/[id] — Get Product by URL ID

**Example:** `GET /api/products/air-max-90`

**Response 200:** Single product object

**Response 404:**
- `message` (string) — `"Not found"`

---

### `[POST]` /api/products — Create Product (Admin)

**Request Body:**
- `name` (string)(required)
- `brand` (string)(required)
- `category` (string)(required)
- `gender` (string)(required) — `"Unisex"` `"Men"` `"Women"` `"Teen"` `"Kids"`
- `description` (string)(required)
- `price` (number)(required)
- `stock` (number)(required)
- `size` (array)(required) — e.g., `["S", "M", "L"]`
- `imageUrl` (string)(required)

**Response 201:**
- `message` (string) — `"Product created"`
- `product` (object) — created product

**Response 500:**
- `message` (string) — `"Server error"`

---

### `[PATCH]` /api/products/[id] — Toggle Product Status (Admin)

**Example:** `PATCH /api/products/1`

**Request Body:**
- `active` (boolean)(required) — `true` or `false`

**Response 200:**
- `message` (string) — `"Updated"`
- `product` (object) — updated product

---

### `[GET]` /api/orders — Get User Orders

**Headers:**
- `Authorization` (string)(required) — `Bearer <token>`

**Response 200:**
- `id` (number)
- `totalPrice` (number)
- `status` (string) — `"PENDING"`
- `createdAt` (string)
- `items` (array) — `[{ id, quantity, size, price, product }]`

**Response 401:**
- `message` (string) — `"Unauthorized"`

---

### `[POST]` /api/orders — Create Order

**Headers:**
- `Authorization` (string)(required) — `Bearer <token>`

**Request Body:**
- `cart` (array)(required) — `[{ id, quantity, selectedSize, price }]`
- `totalPrice` (number)(required)

**Response 200:**
- `message` (string) — `"Order created"`
- `order` (object) — `{ id, totalPrice, status }`

**Response 401:**
- `message` (string) — `"Unauthorized"`

---

### `[GET]` /api/orders/all — Get All Orders (Admin)

**Response 200:**
- `id` (number)
- `totalPrice` (number)
- `status` (string)
- `createdAt` (string)
- `user` (object) — `{ id, email }`
- `items` (array)

---

## Base Response
- `message` (string)(required) — `"ok"` or description of error e.g., `"Unauthorized"`, `"Server error occurred"`
- `data` (object)(optional) — Response data, `null` on failure

---

## Error Codes
- `200` — Success
- `201` — Created
- `400` — Bad Request — missing or invalid fields
- `401` — Unauthorized — invalid or missing token
- `404` — Not Found
- `409` — Conflict — email already exists
- `500` — Internal Server Error

---

## Default Test Accounts
- **Admin:** `admin@qfashion.com` / `123`
- **Buyer:** `buyer@gmail.com` / `123`