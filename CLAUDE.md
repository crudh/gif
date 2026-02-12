# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GIF search UI (gifs.run) powered by the Klipy API. Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4.

## Commands

- **Package manager:** pnpm (v10, enforced via packageManager field)
- **Dev server:** `pnpm dev` (HTTPS on localhost:3000)
- **Build:** `pnpm build` (runs type generation then Next.js build)
- **All checks:** `pnpm check` (types + lint + format)
- **Type check:** `pnpm types:check`
- **Generate route types:** `pnpm types:gen` (must run before type checking)
- **Lint:** `pnpm lint:check` / `pnpm lint:fix`
- **Format:** `pnpm format:check` / `pnpm format:fix`
- **Browser tests (E2E):** `pnpm test:browser` (builds first, then runs Playwright)
- **Browser tests (no build):** `pnpm test:browser:ci`
- **Browser tests (UI mode):** `pnpm test:browser:ui`
- **Run single test:** `npx playwright test --grep "test name"`
- **Install Playwright browsers:** `pnpm test:browser:install`

## Architecture

### Data Flow

Server Components fetch data → Klipy API (`src/api/klipy.ts`) → transform to internal types → render. Client interactions (infinite scroll, search from client) go through Server Actions (`src/actions/index.ts`) which call the same API layer.

### Key Directories

- `src/app/` — Next.js App Router pages and layouts. Routes: `/` (trending), `/search/[searchTerm]` (search results)
- `src/api/` — Server-side Klipy API client with React `cache()` for request deduplication
- `src/actions/` — Server Actions exposing API calls to client components
- `src/components/` — React components; `ui/` contains base shadcn/ui components
- `src/types/` — TypeScript types for internal models (`Gif`) and Klipy API responses
- `src/hooks/` — Custom hooks (intersection observer, search keyboard shortcut)
- `src/test/` — Playwright fixtures/helpers and MSW mock handlers for Klipy API

### Notable Patterns

- **Typed routes** enabled (`typedRoutes: true` in next.config) — route types are generated via `pnpm types:gen`
- **React Compiler** enabled for automatic memoization
- **Middleware** (`src/middleware.ts`) generates a UUID customer ID stored in a secure httpOnly cookie
- **shadcn/ui** component system with CVA (class-variance-authority) for variants
- **Tailwind CSS 4** with PostCSS plugin, CSS custom properties in oklch color space for theming
- **MSW** (Mock Service Worker) mocks the Klipy API in Playwright E2E tests

### Environment Variables

- `KLIPY_API_KEY` — API key for Klipy (required for real data)
- `KLIPY_BASE_URL` — Klipy API endpoint (defaults to `https://api.klipy.com/api/v1`)
- `DEPLOY_ENV` — `production`, `preview`, or `development`

Copy `.env.development` to `.env.local` and fill in missing values for local development.

## CI

GitHub Actions runs on push/PR to master: install → types:gen → types:check → lint:check → format:check → build → browser tests. Node 24, pnpm with caching.
