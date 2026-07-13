# KaamWala — starter app

Next.js + TypeScript + Tailwind starter for the KaamWala worker-marketplace app.

## Run locally

npm install
npm run dev

Open http://localhost:3000

## What's in here

- Homepage with service categories (src/app/page.tsx)
- Booking form per category (src/app/book/[slug])
- API route that stores bookings in memory (src/app/api/bookings/route.ts) - swap for Prisma + Postgres using the schema.prisma from the PRD package
- Category list (src/lib/categories.ts)

## Deploy (free)

1. Push this repo to GitHub.
2. Go to vercel.com -> "Add New Project" -> import the repo -> Deploy.
3. No environment variables are needed for this starter version - it'll deploy as-is.

## Next steps

- Replace the in-memory bookings store with Postgres (Neon or Supabase, free tier) + Prisma, using schema.prisma from the PRD package.
- Add Clerk (or Auth.js) for real login (Google + phone OTP).
- Add Google Maps for live location entry and live tracking.
- Add a worker-facing view and Socket.io for real-time job offers, matching API_Documentation.md.
