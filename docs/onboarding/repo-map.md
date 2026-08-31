# PREIshare repository map

> Onboarding map for first contribution planning. Built with AI-assisted
> inventory + human path verification. Do not treat this as architecture law
> if the real tree disagrees—update this file when you learn more.

## Meta

- Clone path (from setup-log): `/Users/thoranderson/EdTechForLearning/PAUL_Testing/Forked-PREIShare-org-repo`
- Date mapped: `2026-08-31`
- Agent tool used: `coding-agent`
- Mapper: `Thor Anderson (thortek)`

## 1. Overview (5–8 sentences)

PREIshare appears to be organized as: a **single npm package** at the repo root (`preishare-org-repo`), not a monorepo. There is no `apps/` or `packages/` workspace, no `workspaces` field, and no Lerna/Nx/Turbo config. In plain language, the product code seems to live mainly in `src/` (file routes, React components, Tailwind tokens in `src/styles.css`, and the router factory in `src/router.tsx`). Shared libraries or packages appear in **none found**—this clone is still the blank TanStack Start scaffold described in `AGENTS.md`. Docs and onboarding notes live in `docs/` (including this file). The intended product stack in `docs/onboarding/team-orientation-notes.md` names Supabase, PostgreSQL, and pgvector, but those folders and clients are not in this tree yet. I am intentionally not editing application code while building this map.

## 2. Top-level inventory

| Path | Kind (app / package / config / docs / other) | One-sentence purpose | Verified by me? (yes/no) |
|------|-----------------------------------------------|----------------------|---------------------------|
| `.git/` | other | Git history and remotes for this clone | yes |
| `.vscode/` | config | Editor settings; treats generated `routeTree.gen.ts` as read-only | yes |
| `docs/` | docs | Onboarding and project documentation | yes |
| `node_modules/` | other | Installed npm dependencies (gitignored) | yes |
| `src/` | app | TanStack Start / React application source | yes |
| `.DS_Store` | other | macOS Finder metadata; not part of the app (gitignored) | yes |
| `.cta.json` | config | Create TanStack App scaffold record (file-router, TypeScript, Tailwind, npm) | yes |
| `.cursorrules` | config | Cursor/agent conventions for this repo | yes |
| `.gitignore` | config | Ignores `node_modules`, `.env`, build output, and similar local files | yes |
| `AGENTS.md` | docs | Agent/project context: stack, layout, Intent skills, env rules | yes |
| `README.md` | docs | Human getting-started guide for the TanStack Start app | yes |
| `package.json` | config | Root package manifest / scripts | yes |
| `package-lock.json` | config | Locked npm dependency tree | yes |
| `tsconfig.json` | config | TypeScript compiler options and path aliases | yes |
| `tsr.config.json` | config | TanStack Router CLI config (`target: "react"`) | yes |
| `vite.config.ts` | config | Vite plugins: devtools, Tailwind, TanStack Start, React | yes |

No top-level `apps/`, `packages/`, `.github/`, `supabase/`, `public/`, or `lib/` directory was present in this clone.

## 3. Frontend concerns (TypeScript, React, TanStack Start)

- Likely app root(s): `src/` (the app *is* the repo root package; there is no nested `apps/web`)
- Clues I used (file names, frameworks mentioned in package.json): `package.json` depends on `react`, `@tanstack/react-start`, `@tanstack/react-router`, `vite`, `tailwindcss`; `vite.config.ts` calls `tanstackStart()` and `viteReact()`; routes export `createFileRoute` / `createRootRoute`
- Entry / routes / UI areas worth knowing:
  - `vite.config.ts` — Start Vite plugin (no classic `src/main.tsx` or `index.html`)
  - `src/router.tsx` — `getRouter()` factory
  - `src/routeTree.gen.ts` — generated route tree (**do not edit by hand**)
  - `src/routes/__root.tsx` — HTML shell / layout (`Header`, `Footer`, `src/styles.css`)
  - `src/routes/index.tsx` — home page `/`
  - `src/routes/about.tsx` — about page `/about`
  - `src/components/` — `Header.tsx`, `Footer.tsx`, `ThemeToggle.tsx`
  - `src/styles.css` — Tailwind entry and design tokens
- How this area relates to user-facing screens: Visiting `/` and `/about` renders the two starter pages inside the root layout. Path aliases `#/*` and `@/*` both map to `src/` in `tsconfig.json`.

## 4. Backend / data concerns (Supabase, PostgreSQL, pgvector, APIs)

- Supabase or data config paths: **not found yet** (no `supabase/` folder, no `src/lib/supabase.ts`, no `@supabase/*` in `package.json`)
- Migrations / SQL / schema-related paths: **not found yet** (no `migrations/`, no `*.sql`, no Prisma/Drizzle config)
- Env examples (NOT secret values): **not found yet** (`.env` is listed in `.gitignore`; there is no `.env.example`)
- Notes on what a beginner should not touch in production data: Do not invent database credentials, run migrations against a shared project, or paste secrets into agents. `AGENTS.md` says this blank app has no auth/DB yet. `.cursorrules` *names* `lib/supabase.ts` as a future client path; that file is not in the tree. Orientation notes describe the *intended* stack only—do not treat that as a live schema.

## 5. Tooling and CI

- TypeScript / lint / format config: `tsconfig.json` (strict TypeScript; the only in-repo “lint”). No ESLint, Prettier project config, Biome, or `lint`/`format`/`typecheck` scripts.
- CI workflows (e.g. GitHub Actions): **not found yet** (no `.github/`). Orientation notes mention Actions as possible later automation.
- Editor or agent config already present: `.vscode/settings.json`, `.cursorrules`, `AGENTS.md`; also `.cta.json`, `tsr.config.json`, `vite.config.ts`
- Scripts from package manifests that look like dev/build/test: `dev`, `build`, `preview`, `generate-routes` (no `test` script)

## 6. Safe first-touch vs do-not-edit-yet

### Safe first-touch (good candidates for a tiny onboarding PR)

| Path or area | Why it is relatively safe | Risk if handled carelessly |
|--------------|---------------------------|----------------------------|
| `docs/onboarding/` | Docs-only; helps the team | Misleading docs |
| `docs/onboarding/repo-map.md` (this file) | Onboarding artifact; no runtime impact | Stale or wrong paths if the tree changes |
| `docs/onboarding/setup-log.md` | Personal clone checklist already in the fork | Accidental secrets in the log |
| `README.md` (small copy-only tweaks, if a mentor agrees) | Human-facing but not application logic | Confusing getting-started steps |

### Do not edit yet (wait until you have tests, review, and a real task)

| Path or area | Why wait | What could break |
|--------------|----------|------------------|
| CI under `.github/` or equivalent | Shared pipeline (none in this clone yet; do not invent one for a first PR) | Everyone’s builds |
| Root workspace / package manager lockfiles (`package.json`, `package-lock.json`) | Dependency graph | Install failures for all |
| `vite.config.ts`, `tsconfig.json`, `tsr.config.json` | Build and type toolchain | Dev server, build, or route generation |
| `src/routeTree.gen.ts` | Generated by TanStack Router | Overwritten or type-unsafe routing |
| `src/` application routes and components | Product UI; needs a real task | User-facing screens and layout |
| Supabase / migrations / production env | Data and secrets (not present yet; still out of scope) | Data loss or leaked secrets |
| Shared packages used by multiple apps | Wide blast radius (none found; N/A today) | Multiple features regress |
| Auth, payments, or vector/search core (if present) | High complexity (not in this tree yet) | Security or relevance bugs |
| `.env` or any credentials | Secrets | Leaked keys or broken local setup |
| `node_modules/` | Installed third-party code | Local-only noise; never commit |

## 7. Open questions for the team

- Is the intended Supabase / PostgreSQL / pgvector work in another repo, an unmerged branch, or simply not started? This clone has UI only.
- Should `.cursorrules` keep pointing at `lib/supabase.ts` before that file exists, or should the rule wait until the client is added?
- When will GitHub Actions (mentioned in orientation notes) land, and what should a first PR expect to pass?
- Is `.cta.json` still read by Create TanStack App / Intent tooling, or is it leftover scaffold bookkeeping?
- `package.json` contains a `pnpm.onlyBuiltDependencies` block while the lockfile is npm—intentional or leftover from the scaffold?
- There is no `test` script; where should new-feature tests go when `.cursorrules` says to write them?

## 8. How I will use this map next

- Configure AI project rules/memory using the paths above (next tooling steps).
- Pick a first contribution only from **Safe first-touch** unless a mentor expands scope.
- Revisit and edit this file when a path claim is proven wrong.
