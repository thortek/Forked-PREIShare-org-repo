# Onboarding Journal — Thor Anderson

**Branch:** `onboarding/first-pr`  
**Date:** 2026-07-27

## Steps completed

1. Captured stack and conventions in `.cursorrules` (TanStack Start, React 19, Vite, TypeScript, Tailwind), then added project rules for strict TypeScript, `src/components` patterns, Supabase via `lib/supabase.ts`, and tests for new features.
2. Mapped the repo: top-level layout, React UI in `src/components` / `src/routes`, and confirmed no Supabase client or DB schema exists yet in this blank scaffold.
3. Recommended placing a profile UI in `src/components` and wiring it through a route under `src/routes`.
4. Created `src/lib/user.ts` (`User` type + `getUser()` placeholder) and refined the return-value comment above the main export on `onboarding/first-pr`.

## Friction

The biggest snag was **branch drift**. Work on `src/lib/user.ts` was requested while the working tree was on `main`, where `src/lib/` did not exist; the file (and earlier comment) lived on `onboarding/first-pr`. `.cursorrules` also describes Supabase and testing conventions that are not present in the scaffold yet, so early exploration kept searching for modules that only exist as future intent.

## Suggestion for the next engineer

Keep a short **“current reality vs. intended”** note at the top of `.cursorrules` or `docs/onboarding/README.md` listing which paths already exist (`src/components`, `src/routes`) versus planned ones (`lib/supabase.ts`, schema/migrations, tests). Pair that with “do onboarding work on `onboarding/first-pr`” so the first edit does not start on an empty `main` tree.
