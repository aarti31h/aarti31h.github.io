# Repository README template

A consistent structure for every repository on
[github.com/aarti31h](https://github.com/aarti31h), so the profile reads as one deliberate
body of work rather than a pile of unrelated projects.

## How to use it

Copy the template below into a new `README.md` and fill it in. Two rules matter more than the
structure:

1. **Delete sections that do not apply.** An empty "Testing" heading is worse than no heading.
2. **Do not describe a project as more finished than it is.** If something is a learning
   exercise or a work in progress, say so in the Status line at the top. A clearly-labelled
   experiment reflects well; an experiment presented as production software does not survive
   the first question about it in an interview.

Use the Status line to set expectations honestly:

- `**Status:** Production — running and maintained.`
- `**Status:** Reference implementation — complete, built to demonstrate an approach.`
- `**Status:** Work in progress — core flow works, not production-hardened.`
- `**Status:** Learning exercise — built to explore <topic>.`
- `**Status:** Archived — kept for reference, no longer maintained.`

---

## Template

````markdown
# Project Name

One line saying what it is and who it is for.

**Status:** <see options above>
**Stack:** ASP.NET Core · Angular · PostgreSQL · Docker

---

## Overview

Two or three sentences on the problem this solves. Lead with the problem, not the technology —
the reader needs to know why the project exists before they care what it is written in.

---

## Architecture

```
 Angular client
       │  HTTPS + JWT
       ▼
 ASP.NET Core API  ──►  PostgreSQL
       │                     ▲
       │ publishes           │ cache-aside
       ▼                     │
   RabbitMQ  ──►  Worker ────┘
                    │
                    ▼
                  Redis
```

Keep the diagram in a fenced code block. It renders identically everywhere, needs no image
hosting, stays diffable in review, and never breaks.

Follow it with a short paragraph on the shape: what talks to what, and which calls are
synchronous versus asynchronous.

---

## Key features

- Feature, phrased as a capability the user gets
- Feature
- Feature

---

## Technology

**Backend** — C# · ASP.NET Core · Entity Framework Core · MediatR
**Frontend** — Angular · TypeScript · RxJS
**Data** — PostgreSQL · Redis
**Infrastructure** — Docker · GitHub Actions

---

## Engineering decisions

The section that distinguishes a portfolio repository from a tutorial. For each significant
choice, state the alternative you rejected and why — that is what shows judgement.

### Why CQRS?

Reads and writes had different shapes: writes are transactional and validation-heavy, reads are
wide and frequent. Separating them let each be optimised independently. Rejected: a single
service layer, which would have forced one model to satisfy both.

### Why Redis?

Reference data was read far more often than it changed. Cache-aside on those specific paths cut
repeated database work. Rejected: caching everything, which adds invalidation cost with no
measured benefit.

### Why RabbitMQ rather than a direct call?

The downstream work does not need to complete before the caller can respond. A queue means a
slow or restarting consumer delays processing instead of failing the request.

### Why PostgreSQL?

<reason — and if the honest answer is "it is what the team already ran", say that>

---

## Project structure

```
src/
  Api/            HTTP entry point, controllers, DI wiring
  Application/    Commands, queries, handlers, validation
  Domain/         Entities and domain rules, no framework dependencies
  Infrastructure/ EF Core, messaging, external clients
tests/
  UnitTests/
  IntegrationTests/
```

---

## Running locally

Prerequisites: .NET 8 SDK, Node 20+, Docker.

```bash
git clone https://github.com/aarti31h/<repo>.git
cd <repo>

cp .env.example .env          # then fill in the values

docker compose up -d          # PostgreSQL, Redis, RabbitMQ
dotnet run --project src/Api  # http://localhost:5000

cd client && npm install && npm start
```

Never commit real secrets. Ship a `.env.example` with the keys and empty values.

---

## API

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/items` | Paged list of items | Bearer |
| `POST` | `/api/items` | Create an item | Bearer |

```bash
curl -H "Authorization: Bearer $TOKEN" \
     "https://localhost:5001/api/items?page=1&pageSize=20"
```

```jsonc
{
  "items": [{ "id": "…", "name": "…" }],
  "page": 1,
  "pageSize": 20,
  "total": 137
}
```

Swagger UI is available at `/swagger` in development.

---

## Testing

```bash
dotnet test
```

State what is actually covered and what is not. "Unit tests on the command handlers and domain
rules; integration tests cover the API surface against a containerised database. The Angular
client is not currently covered." — that is more credible than a coverage badge.

---

## Deployment

How it ships: container image, pipeline, target environment, required configuration.

---

## Future improvements

Only include this if the items are real and specific. A vague wishlist reads as an unfinished
project; two concrete, well-reasoned items read as an engineer who knows where the edges are.

---

## License

MIT — see [LICENSE](LICENSE).
````
