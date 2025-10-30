## SUNUSHOP – Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Next.js 14 (App Router) demo for SUNUSHOP.

## ⚙️ Quick Start

```bash
pnpm install # or npm i / yarn
pnpm dev     # http://localhost:3000
```

## 🏗️ Build

```bash
pnpm build
pnpm start  # production mode
```

## ▲ Deploy on Vercel

1. Connect the GitHub repo to Vercel and import the project.
2. Root Directory: this folder (sunushop-app).
3. Framework preset: Next.js (auto-detected).
4. Build command: `next build` (default).
5. Output: `.vercel/output` (handled by Vercel automatically for Next.js).

### Domain mapping

- Add your domain in Project Settings → Domains (e.g. `transcribe.omadigital.net`).
- If using a subdomain on an existing apex, create the corresponding CNAME per Vercel instructions.

## 📦 Notes

- Images are served from `public/images`.
- Global animations defined in `src/app/globals.css` respect `prefers-reduced-motion`.
- Product details modal includes image carousel and add-to-cart.
