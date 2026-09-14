# Investor listing domain brief

Sprint 2, Topic 1 — TypeScript foundations in a real product context.

An **investor listing** is PREIshare’s shared record of one commercial property offering: who can see it, where it is, what it costs, who to contact, and how those people relate to the asset. This brief defines that object in business language so later TypeScript **types** (compile-time contracts) match real workflows—not invented fields. **Compile time** is the moment the compiler checks the code, before the app runs and before a user can see a missing price or a vanished address.

---

## Purpose

Define what an investor listing is in PREIshare business language so TypeScript types in later steps match real workflows—not invented fields.

PREIshare needs listing data the whole team can trust. Loose objects and ad-hoc JSON let bugs reach production: a missing price, a status spelled three different ways, or a nested address field that is present on one screen and gone on another. This document is not application code. It is the domain in writing: who uses listings, which statuses exist, which field groups travel together, and what “valid” means.

---

## Actors

- **Listing editor (internal ops)** — creates and updates listings before investors see them.
- **Investor (end user)** — browses published listings and relies on complete, consistent data. Investors do not see `draft` or `archived` records.
- **Reviewer / compliance** — checks that status, price, and contact info are trustworthy before publish.
- **Future systems** — website UI, API, and database will all read the same listing shape.

Engineers, coding agents, and stakeholders use this brief; they are not domain actors. See the handoff note.

---

## Business goals

- One shared definition of a listing across screens and teammates.
- Catch missing or invalid data before production (at compile time once types exist).
- Support nested real-world data: address, financial summary, investor contacts, ownership.

---

## Listing lifecycle statuses (closed list)

Status is required on every listing. The only allowed values are the five below. No synonyms, no extra statuses, no free text.

| Status | Meaning |
| --- | --- |
| `draft` | Internal only; not visible to investors. Incomplete fields are allowed. |
| `published` | Visible to investors; must meet full validity rules. |
| `under_offer` | Active interest; still structured like a published listing. |
| `sold` | Closed deal; retained for history. Same completeness rules as `published`. |
| `archived` | Removed from active browse; not deleted. |

**Investor-visible / “published+” statuses** means exactly: `published`, `under_offer`, `sold`. Required fields in the success criteria must never be missing for those three statuses.

---

## Nested data groups

A listing is not a flat bag of fields. Four groups travel as structured data so a screen cannot “lose” a nested field:

| Group | Shape | What it holds |
| --- | --- | --- |
| **Address** | Nested object | Street line(s), city, region/state, postal code, country. |
| **Financial summary** | Nested object | Asking price, currency, optional projected return metrics the team agrees to track. |
| **Investor contacts** | List of nested objects | One or more people tied to the listing (name, role, email or phone). |
| **Ownership** | List of nested objects tied to contacts | How contacts relate to the asset (for example primary owner, co-owner, broker) and optional ownership share. |

See [listing-field-inventory.md](./listing-field-inventory.md) for every field. Do not add another top-level group without updating this brief.

---

## Core identity fields

These fields identify the listing and its place in the lifecycle. They sit at the top level, not inside the nested groups. Exact TypeScript field names may follow the inventory’s suggestions; the **meanings** here are mandatory.

| Concept | Why it exists |
| --- | --- |
| Stable listing id | Screens, API, and database refer to the same listing by this value. |
| Human-readable title | Short name shown to investors. |
| Property type | Asset class from a closed list: `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land`. |
| Status | Lifecycle value from the closed list above. |
| Short description | Investor-facing summary of the offering. |
| Created / updated timestamps | When the record was created and last meaningfully edited. Format is a later types decision (datetime text). |

`propertyType` is a closed list for the same reason as `status`: “multi-family”, “apartment”, and `multifamily` must not all pass as different types.

---

## Success criteria for a valid listing

Use this as a checklist. A listing is valid only when every item that applies is true. **Published+** means `published`, `under_offer`, or `sold`.

1. Has a non-empty id and title.
2. Status is exactly one of the allowed lifecycle values (no free-text variants): `draft`, `published`, `under_offer`, `sold`, `archived`.
3. Property type is exactly one of the allowed property-type values: `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land`.
4. Address includes enough fields to locate the property (street, city, region/state, postal code, country).
5. Financial summary includes a numeric asking price and a currency code.
6. At least one investor contact with a name and a reachable channel (email **or** phone).
7. Ownership relationship for each contact is from an agreed fixed set (not free text): `primary_owner`, `co_owner`, `broker`, `property_manager`.
8. Optional fields may be absent; required fields above must never be missing for `published`, `under_offer`, or `sold`.

`draft` and `archived` may omit description, address details, asking price, contacts, and ownership rows. They must not invent extra statuses, property types, or top-level groups.

---

## Out of scope

This topic does **not** cover:

- Building UI forms, API routes, or database tables.
- Authentication, payments, or document uploads.
- Exact TypeScript syntax (comes in later steps).

Do not invent extra statuses, extra property types, or free-text status “just in case.”

---

## Handoff note

Later steps must implement types that honor this brief and the companion [listing-field-inventory.md](./listing-field-inventory.md). **If a type allows a status or field not listed here, the type is wrong.**

Give both documents to a coding agent or IDE copilot in the same prompt. Ask it to encode the closed lists, nested groups, and numbered checklist—not to add new groups or free-text `status`. Review the output against the success criteria. Field names in the inventory are suggestions; meanings and shapes are mandatory. Do not accept a type you cannot explain to a stakeholder using this brief.
