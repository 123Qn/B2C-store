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