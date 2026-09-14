# Listing field inventory

Sprint 2, Topic 1 — companion to [investor-listing-domain-brief.md](./investor-listing-domain-brief.md).

Use this table as the source of truth when defining TypeScript types. **Field names are suggestions** the types may adopt; **meanings and shapes are mandatory**.

**Shape** is the kind of value: text, number, datetime text, fixed choice (closed list), nested object, or list.

**Published+** means `published`, `under_offer`, or `sold`. Required fields below must never be missing for those statuses. `draft` and `archived` may leave some values absent, but must not invent extra groups or free-text status.

Closed lists (never free text):

- **status:** `draft`, `published`, `under_offer`, `sold`, `archived`
- **propertyType:** `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land`
- **contacts[].role:** `broker`, `owner_rep`
- **ownership[].relationship:** `primary_owner`, `co_owner`, `broker`, `property_manager`

---

## Identity and classification

| Field | Meaning | Shape | Required? | Example / allowed values |
| --- | --- | --- | --- | --- |
| `id` | Stable unique id for the listing | text | yes | `lst_ev_1001` |
| `title` | Short name shown to investors | text | yes | `Riverfront Multifamily Offering` |
| `description` | Longer investor-facing summary | text | yes for published+ | `Value-add asset near transit...` |
| `status` | Lifecycle state | fixed choice | yes | `draft`, `published`, `under_offer`, `sold`, `archived` |
| `propertyType` | Asset class | fixed choice | yes | `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land` |
| `createdAt` | When the listing record was created | datetime text | yes | `2026-03-01T10:00:00Z` |
| `updatedAt` | Last meaningful edit | datetime text | yes | `2026-03-15T16:30:00Z` |

---

## Address (nested object)

`address` is a nested object, not a flat string. Inner fields in this table are required for published+.

| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| `address.line1` | Street number and name | text | yes | `500 River Rd` |
| `address.line2` | Unit/suite (if any) | text | no | `Suite 200` |
| `address.city` | City | text | yes | `Austin` |
| `address.region` | State/province/region | text | yes | `TX` |
| `address.postalCode` | Postal code | text | yes | `78701` |
| `address.country` | Country code or name | text | yes | `US` |

---

## Financial summary (nested object)

`financials` is a nested object. Do not flatten `askingPrice` onto the listing root.

| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| `financials.askingPrice` | Listed price amount | number | yes | `12500000` |
| `financials.currency` | Currency code | fixed choice / text code | yes | `USD` |
| `financials.projectedIrrPercent` | Optional projected IRR | number | no | `12.5` |
| `financials.capRatePercent` | Optional cap rate | number | no | `5.8` |

---

## Investor contacts (list of nested objects)

`contacts` is a list (array). A valid published+ listing needs at least one contact. Each contact needs a name and a reachable channel: **email or phone** (not necessarily both).

| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| `contacts[].name` | Person or firm name | text | yes (each contact) | `Jordan Lee` |
| `contacts[].role` | Why they appear on the listing | fixed choice | yes | `broker`, `owner_rep` |
| `contacts[].email` | Email if used | text | one of email/phone required | `jordan@example.com` |
| `contacts[].phone` | Phone if used | text | one of email/phone required | `+1-512-555-0142` |

Invalid for published+: missing `contacts`, `contacts: []`, or an entry with neither email nor phone.

---

## Ownership (list tied to contacts)

Each ownership row refers to a contact. Relationship is a closed list, not free text. Share percent is optional.

| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| `ownership[].contactNameOrId` | Which contact the row refers to | text | yes | `Jordan Lee` or a contact id |
| `ownership[].relationship` | Relationship to the asset | fixed choice | yes | `primary_owner`, `co_owner`, `broker`, `property_manager` |
| `ownership[].sharePercent` | Optional ownership share | number | no | `60` |

Success criterion 7: every contact on a published+ listing has an ownership relationship from that fixed set.

---

## Inventory rules (must hold)

1. Do not invent extra top-level groups beyond identity, address, financials, contacts, and ownership without updating the domain brief.
2. Status and propertyType must remain closed lists (union candidates)—never free text.
3. Address and financials are nested objects, not flat optional strings only.
4. Contacts are a list (array); a valid published listing needs at least one contact.
5. Every required field above must appear in later TypeScript interfaces unless the decision record deliberately relaxes it.

If a later type allows a status or field not listed in the brief or this inventory, the type is wrong.
