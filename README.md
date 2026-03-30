# Fixr Global — Full MVP Repo Starter

This is a production-minded monorepo starter for the Fixr Global MVP.

## Includes
- Next.js frontend
- Express + TypeScript backend
- Prisma schema for PostgreSQL
- Rule-based AI pricing engine
- Job creation + contractor endpoints
- Basic admin + analytics endpoints
- Frontend page scaffolds wired to API helpers

## Quick start

### 1) Install
```bash
pnpm install
cp .env.example .env
```

### 2) Database
Update `DATABASE_URL` in `.env`, then run:
```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

### 3) Run both apps
```bash
pnpm dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:4000`

## Build order
1. Start backend + DB
2. Test `GET /api/health`
3. Test `POST /api/pricing/estimate`
4. Create jobs from homepage
5. Expand booking / contractor / admin flows
