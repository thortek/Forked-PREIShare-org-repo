# PREIshare Investor Dashboard — Client Brief (Sprint 3 Shell)

## Product summary
PREIshare helps people make better real-estate decisions by turning property and market data into clear intelligence. The engineering team ships that product as a modern web app (TypeScript, TanStack Start, React, Supabase, PostgreSQL, pgvector). This sprint does not rewrite that product.

PREIshare needs a clean, trustworthy investor dashboard shell where members can
scan portfolio value, browse open deals, and review their profile without
hunting through cluttered pages. This sprint delivers the **shell only**:
responsive layout, file-based routes, and reusable UI placeholders—not live
backend data or authentication.

Investors browse published commercial offerings. They do not see `draft` or `archived` records. Sample rows in the shell follow that same rule.

## Primary actors
| Actor | Role in this sprint | In scope to build? |
|-------|---------------------|--------------------|
| Investor (member) | Uses the dashboard to scan value, deals, and profile | Yes — primary user |
| Future admin | May manage deals/users later | No — mention only as future actor |
| Listing editor (internal ops) | Creates and updates listings before investors see them | No — mention only; not this shell |
| Reviewer / compliance | Checks that status, price, and contact info are trustworthy before publish | No — mention only; not this shell |
| Future systems | Website UI, API, and database will all read the same listing shape later | No — mention only; shell does not connect them yet |

## Investor goals
1. Open the dashboard and immediately see a home overview (portfolio snapshot + recent activity placeholders).
2. Navigate to Portfolio, Deals, and Profile without leaving the app shell.
3. Trust the layout: clear labels, consistent navigation, readable on phone and desktop.

Those goals stay tied to PREIshare listings:

- **Scan portfolio value** — a sample total of holdings the investor already has a stake in, from investor-visible offerings (`published`, `under_offer`, `sold`), with asking price and currency shown the way a listing’s financial summary carries them.
- **Browse open deals** — offerings still in play (`published` and `under_offer`): title, property type, city, asking price, and status. `sold` stays in the portfolio as history. `draft` and `archived` never appear.
- **Review profile** — one sample investor (name and a reachable channel: email or phone). The shell does not ask them to sign in.

## Must-have dashboard areas (this sprint)
| Area | Route idea (for later steps) | What the investor should see |
|------|------------------------------|------------------------------|
| Home overview | `/dashboard` | Stats cards, portfolio summary placeholder, recent activity list placeholder |
| Portfolio | `/dashboard/portfolio` | Table or list shell for holdings (mock data OK) |
| Deals | `/dashboard/deals` | List shell of open/available deals (mock data OK) |
| Profile | `/dashboard/profile` | Profile card shell (name, contact placeholders) |

Only these four areas. Property types and statuses on mock rows stay on the closed lists in [the investor listing domain brief](./domain/investor-listing-domain-brief.md): property type is `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, or `land`; investor-visible status is `published`, `under_offer`, or `sold`.

## Success criteria (demo-ready shell)
- [ ] Investor can reach Home, Portfolio, Deals, and Profile from persistent navigation.
- [ ] Each area has its own route/page shell with a clear page title.
- [ ] Layout includes sidebar (or equivalent nav), header, and main content region.
- [ ] On a narrow screen, content remains usable (nav collapses or stacks; no broken overlap).
- [ ] Placeholder/mock content is labeled as mock so stakeholders know data is not live.
- [ ] Brief, IA, and UI stay aligned: no surprise pages outside the four areas above.
- [ ] A stakeholder can confirm the walkthrough with no live database, no signed-in session, and no network call to Supabase.
- [ ] Portfolio mock rows show title, a closed-list property type, an investor-visible status, and an asking price with a currency code. No row is `draft` or `archived`.
- [ ] Deals mock rows are open deals only (`published` and `under_offer`). A `sold` offering does not appear there.
- [ ] Profile shows one sample investor’s name and a reachable channel, and it does not present a sign-in, sign-up, or password field.

## Out of scope (explicit non-goals for this sprint)
- Real sign-in / authentication and authorization
- Live Supabase/PostgreSQL portfolio or deals data
- Payments, subscriptions, or document e-sign
- Admin CRUD tools for managing investors or deals
- Production deployment hardening and CI beyond basic project setup
- A rewrite of the product, new listing statuses, new property types, or a fifth dashboard area
- pgvector search, document upload, or messaging

Sample content may quote the same field meanings as the listing domain brief (title, status, property type, asking price, city, contact). It must not pretend those rows came from the database.

## Prompting notes for later AI steps
When directing a coding-agent or ide-copilot, always attach or quote this brief and
require: TypeScript + TanStack Start file-based routes, reusable React components,
mock data only, and no auth. Reject output that adds pages or features listed under
Out of scope.

Also give the agent [investor-listing-domain-brief.md](./domain/investor-listing-domain-brief.md) and require:

- Build only Home overview, Portfolio, Deals, and Profile. Do not add Settings, Billing, Analytics, Notifications, or an admin console.
- Mock listings use status `published`, `under_offer`, or `sold` only. Never render `draft` or `archived` in this shell.
- Property type must be one of `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land`.
- Keep asking price and currency together. Do not invent a new pricing model.
- Do not add a Supabase client, SQL, payments, or editor/compliance tools in the same change.
- Match the existing TanStack Start app: file routes under `src/routes/`, React components, Tailwind. Do not replace the stack.
- If a screen needs a fact this brief does not state, leave a short comment and stop.

Review the result against the success criteria by clicking through the four areas with mock content only.

## Open questions / assumptions
- Assume English UI copy for the shell.
- Assume a single investor persona viewing their own data (no multi-portfolio switcher yet).
- Visual brand can be simple and professional; full brand system is not required this sprint.
- **Open deals** means investor-visible offerings still in play: `published` and `under_offer`. `sold` is portfolio history, not an open deal. `draft` and `archived` stay hidden.
- **Portfolio value** on Home overview is a hand-written mock total, labeled as mock. It is not computed from PostgreSQL.
- **Shell** means routes, navigation, and static layout. Currency on mock rows uses a code already allowed on a listing financial summary (for example `USD`). The shell does not add a currency picker.
- Listing editors, reviewers, and a future admin remain real product actors. Their workflows wait for a later sprint.

Open questions to settle before any sprint that leaves the shell:

- Which mock offerings are the canonical demo set, and who approves the placeholder prices so a stakeholder does not read them as live portfolio value?
- Does Portfolio group by property type, or is a single scannable list enough until live data exists?
- When auth arrives, does Profile bind to the signed-in investor, or do investors also see contacts stored on each listing?
