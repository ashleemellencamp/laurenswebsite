# Lauren's Photography — Portfolio Website

A wedding photography portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**, optimized for deployment on **Vercel**.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | [Next.js 15](https://nextjs.org) (App Router) | Native Vercel integration, excellent SEO, built-in image optimization |
| Language | TypeScript | Safer refactors as the site grows |
| Styling | Tailwind CSS v4 | Fast, responsive layouts with a custom wedding palette |
| Hosting | [Vercel](https://vercel.com) | Zero-config deploys, CDN, automatic previews on every push |
| Fonts | Google Fonts (Cormorant Garamond + Montserrat) | Elegant serif + clean sans pairing |

## Project Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── page.tsx          # Home
│   ├── portfolio/        # Gallery index
│   ├── about/            # About page
│   └── contact/          # Inquiry form
├── components/
│   └── layout/           # Header, Footer
├── lib/                  # Site config, utilities
└── types/                # Shared TypeScript types
public/
└── images/               # Static photos (or use a CDN later)
```

## Getting Started

### 1. Install Node.js

Node.js is required but wasn't detected on this machine. Download the LTS version from [nodejs.org](https://nodejs.org), then restart your terminal.

Verify the install:

```bash
node --version
npm --version
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no build settings needed.
4. Click **Deploy**. Every future push to `main` triggers a new production deploy; other branches get preview URLs.

### Custom domain

In your Vercel project: **Settings → Domains** → add your domain and follow the DNS instructions.

## Next Steps

- [ ] Replace placeholder copy and colors in `src/lib/site-config.ts`
- [ ] Add wedding photos to `public/images/`
- [ ] Build gallery components using `next/image` for optimized loading
- [ ] Wire up the contact form (e.g. [Resend](https://resend.com), [Formspree](https://formspree.io), or a Vercel serverless function)
- [ ] Add individual gallery pages at `src/app/portfolio/[slug]/page.tsx`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Run production server locally |
| `npm run lint` | Run ESLint |
