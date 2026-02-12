# JM99 — Computer Requirements

Website for **JM99** (Santa Fe): computer sales, repairs, and technical services. Built as a modern, responsive web app with a landing experience and an e-commerce storefront.

---

## Functionality

- **Landing & branding** — Hero section, services overview, and repair offerings (hardware/software) with clear CTAs and contact entry points.
- **E-commerce** — Product catalog (`/tienda`), product detail pages, shopping cart with quantity controls, and cart summary (`/tienda/micarro`).
- **Contact** — Contact form with client-side validation; submissions sent via email (Nodemailer).
- **Media** — Product and marketing images served and optimized via Cloudinary.
- **Admin** — Image-generation tools for product assets (e.g. Claid AI integration) under `/admin/generate-images`.
- **SEO & UX** — Metadata, responsive layout, smooth scrolling, and accessibility-minded structure.

---

## Technologies

| Category        | Stack |
|----------------|--------|
| **Framework**  | [Next.js](https://nextjs.org) 15 (App Router), [React](https://react.dev) 19 |
| **Language**   | [TypeScript](https://www.typescriptlang.org) 5 |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com) 4, [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI / Forms** | [Radix UI](https://www.radix-ui.com) (Navigation, Popover, Slot), [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev), [class-variance-authority](https://cva.style/docs), [Lucide React](https://lucide.dev) |
| **Media**      | [next-cloudinary](https://next.cloudinary.com) (Cloudinary) |
| **Email**      | [Nodemailer](https://nodemailer.com) |
| **Data**       | XML product data, environment-based config |
| **Dev / QA**   | ESLint, Next.js ESLint config |

---

## Getting started

### Prerequisites

- **Node.js** 18+ (or 20+ recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### Install

```bash
git clone <repository-url>
cd jm99-website-main
npm install
```

### Environment

Create a `.env.local` in the project root (see [Next.js env docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)):

```env
# Optional: Cloudinary (e.g. for NEXT_PUBLIC_* or server usage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Email (Nodemailer)
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```

Add any other keys your deployment or features need (e.g. Claid API key for admin image generation).

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses **Turbopack** in development.

### Build & production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Project structure (overview)

```
├── app/                    # Next.js App Router
│   ├── api/                # API routes (products, send-email, generate-images)
│   ├── admin/              # Admin (e.g. generate-images)
│   ├── tienda/             # Store: catalog, product [id], cart (micarro)
│   ├── layout.tsx
│   ├── page.tsx            # Home (hero, services, contact)
│   └── globals.css
├── components/             # React components (Header, Hero, Services, Cart, etc.)
├── config/                 # Environment and transporter config
├── lib/                    # Shared utilities and product helpers
├── utils/                  # Hooks (e.g. useCart), email, external services
└── data/                   # Static data (e.g. products.xml)
```

---

## Deploy

The app is suitable for [Vercel](https://vercel.com) or any Node-compatible host. Set the same environment variables in your deployment dashboard and run `npm run build` / `npm run start` as needed.

For more on Next.js deployment: [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying).
