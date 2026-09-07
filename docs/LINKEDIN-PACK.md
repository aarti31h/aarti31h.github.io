# LinkedIn pack — Aarti Hariharno

Copy-paste ready. Every claim traces to the CV or to public code; nothing here is invented.

**Assets to link:**

- Portfolio — https://aarti31h.github.io
- Engineering note — https://aarti31h.github.io/notes/notes-from-building-a-cqrs-service/
- Note as PDF (for Featured) — https://aarti31h.github.io/Notes-Building-A-CQRS-Service.pdf
- Code — https://github.com/aarti31h/subscription-service
- GitHub — https://github.com/aarti31h

---

## 1. Headline (220 char limit)

Pick one. The first is the safest for recruiter search, because it front-loads the terms
recruiters actually filter on.

**Option A — search-optimised (recommended)**

```
Full Stack Software Engineer | .NET Core · ASP.NET Core · Angular · Microservices · Azure & AWS | Building scalable APIs and distributed systems
```

**Option B — outcome-led**

```
Full Stack Software Engineer — 5 yrs building .NET Core & Angular systems | Microservices, CQRS, messaging | 20K+ daily requests, 35% faster APIs
```

**Option C — plain**

```
Full Stack Software Engineer at Logimonk Technologies | .NET Core, Angular, Microservices, Cloud
```

---

## 2. About section

```
Full Stack Software Engineer with 5 years building and supporting scalable web
applications and distributed systems.

I work across the whole lifecycle of a system — the Angular interface a user touches,
the secure API behind it, the services and messaging that keep those pieces
independent, the database and cache decisions that make it fast, and the pipelines
and dashboards that keep it healthy once it is live.

Over five years at Logimonk Technologies I have delivered products across fintech,
real estate, e-commerce and video streaming. A fintech platform and a streaming
service fail in very different ways, and having supported both has taught me to
recognise which constraints are real and which are inherited habit.

Selected outcomes from that work:
• 20K+ daily requests across the products I build and support
• ~35% faster average API response time — Redis caching, EF Core and LINQ tuning,
  pagination and indexing
• ~40% faster deployments after containerising services and automating the pipeline
• ~40% fewer cross-team deployment conflicts after decoupling services onto a message bus
• ~30% fewer recurring production incidents through structured logging and dashboards
• 80%+ test coverage on core services, introduced alongside code review
• Authentication standardised across 4+ client applications

What I work with:
.NET Core / ASP.NET Core (.NET 8) · C# · Angular · TypeScript · Entity Framework Core
Microservices · CQRS · MediatR · RabbitMQ · Azure Service Bus · SignalR
SQL Server · PostgreSQL · MongoDB · Redis
Azure · AWS · Docker · Azure DevOps · GitHub Actions
JWT · OAuth2 · OpenID Connect · IdentityServer · Serilog · Grafana · Prometheus · xUnit

Most of my production work sits in private client repositories, so I have published a
reference implementation of the architecture I actually use — a CQRS subscription API
in ASP.NET Core with MediatR, EF Core, Redis cache-aside, JWT auth and 30 tests. The
README explains each decision and the trade-off it accepted.

Portfolio and case studies → aarti31h.github.io
Code → github.com/aarti31h
```

---

## 3. Experience entry

**Title:** Software Engineer
**Company:** Logimonk Technologies Pvt Ltd
**Dates:** July 2021 – Present · Jabalpur, India

```
Designing and delivering full-stack products across real estate, fintech, e-commerce
and video streaming, using Angular, TypeScript, ASP.NET Core and SQL Server/PostgreSQL,
serving 20K+ daily requests.

• Architected microservices using CQRS and MediatR, decoupling services via RabbitMQ
  and Azure Service Bus — improved release independence and cut cross-team deployment
  conflicts by ~40%.
• Built secure REST APIs with JWT, OAuth2 and OpenID Connect (IdentityServer),
  documented with Swagger, standardising authentication across 4+ client applications.
• Reduced average API response time by ~35% through Redis caching, EF Core and LINQ
  query tuning, pagination and database indexing.
• Containerised services with Docker and automated build–test–deploy pipelines in
  Azure DevOps and GitHub Actions, cutting deployment time by ~40% and removing manual
  release steps.
• Owned production support: implemented structured logging with Serilog and monitoring
  dashboards in Grafana and Prometheus, reducing recurring incidents by ~30% and
  improving MTTR.
• Introduced unit and integration testing with xUnit alongside code review, raising
  coverage on core services to 80%+.
• Led client requirement workshops and sprint demos in Agile/Scrum teams.
```

**Skills to tag on this role:** ASP.NET Core · C# · Angular · TypeScript · Microservices ·
CQRS · Entity Framework Core · PostgreSQL · SQL Server · Redis · RabbitMQ · Azure ·
Docker · CI/CD · REST APIs

---

## 4. Featured section

Add these four, in this order:

1. **Link** — `https://aarti31h.github.io`
   Title: *Portfolio — engineering case studies*
   Description: *Three systems written up as case studies: the problem, the architecture, the decisions and the measured outcome.*

2. **Document (PDF)** — upload `Notes-Building-A-CQRS-Service.pdf`
   Title: *Notes from building a CQRS service*
   Description: *Architecture decisions, and the three defects that only surfaced when I ran it.*
   *(LinkedIn renders PDFs as a swipeable carousel, so this gets far more reach than a link.)*

3. **Link** — `https://github.com/aarti31h/subscription-service`
   Title: *subscription-service — ASP.NET Core, CQRS, Redis*
   Description: *Reference implementation. MediatR pipeline, EF Core, cache-aside, JWT, Docker, 30 tests, CI green.*

4. **Link** — `https://aarti31h.github.io/work/investment-property-platform/`
   Title: *Case study — Investment & Property Management Platform*
   Description: *SSO across four modules, finance microservices on CQRS + MediatR, Azure Service Bus.*

---

## 5. Skills — order matters

LinkedIn shows only the top three on your profile, and recruiter search weights the
endorsed ones. Put these three first:

1. ASP.NET Core
2. Angular
3. Microservices

Then: C# · .NET · Entity Framework Core · TypeScript · CQRS · REST APIs · PostgreSQL ·
SQL Server · Redis · RabbitMQ · Azure · AWS · Docker · CI/CD · JWT · OAuth2 · xUnit ·
SignalR · MongoDB · Agile

---

## 6. Announcement post

Post this when the profile is updated. It is written to be read by engineers, which is
what makes it get shared — recruiters see it because engineers engage with it.

```
Most of my work over the last five years lives in private client repositories.

That is normal for product and agency work, and it leaves a gap: I can describe how I
structure a service, but I cannot hand anyone the code.

So I built one I can hand over — a CQRS subscription API in ASP.NET Core (.NET 8), the
same shape as the finance services I have shipped. MediatR pipeline behaviours, EF Core
over PostgreSQL, Redis cache-aside invalidated on write, JWT auth, RFC 7807 errors,
Docker Compose, 30 tests.

The interesting part was not writing it. It was what happened when I ran it.

Three defects showed up, and none of them were found by reading the code:

1. Error responses were going out as application/json instead of
   application/problem+json. WriteAsJsonAsync silently overwrites the content type you
   set beforehand. Every status code was correct, so nothing looked wrong — only a
   client branching on content type would have been quietly broken. An integration test
   asserting on a header caught it.

2. The service crashed on startup with no signing key configured — the exact
   "clone and run it" path my README advertised. The real lesson was not the bug but
   the design underneath: an API where every route requires authorisation cannot
   meaningfully run without auth. It now fails fast with a message naming the setting,
   because a forgotten environment variable should break a deploy loudly rather than
   quietly publish the API.

3. A Redis deserialisation call was ambiguous under a newer compiler. It built on my
   laptop and failed in CI. "It builds locally" had become a claim about my machine, so
   the SDK is pinned now.

A green build tells you the code compiles and that the things you thought to check still
hold. It does not tell you the service starts.

Full write-up and the code, if useful to anyone:
→ https://aarti31h.github.io/notes/notes-from-building-a-cqrs-service/
→ https://github.com/aarti31h/subscription-service

#dotnet #aspnetcore #csharp #softwareengineering #cqrs #testing
```

**Posting notes**

- Put the links in the **first comment** instead of the post body if you want more reach —
  LinkedIn suppresses posts with outbound links. Then edit the post to say "links in comments".
- Best times: Tuesday–Thursday, 9–11am IST.
- Reply to every comment in the first two hours; that is what drives distribution.
- Do **not** use more than 5 hashtags.

---

## 7. Shorter follow-up posts

Space these a week or two apart. One idea each — that is what performs.

**Post B — cache invalidation**

```
A five-minute cache TTL sounds harmless until you follow it through.

A user cancels their subscription. The confirmation succeeds. The next screen still
shows "Active".

Nothing errored. Nothing is in the logs. They contact support, and support cannot
reproduce it — by then the key has expired.

That is why writes invalidate the cache rather than waiting for the TTL. The TTL is a
safety net for changes that bypass the write path, not the correctness mechanism.

The other half: keep cache keys in one place. Scattered string interpolation is exactly
how an invalidation quietly stops matching the key it was meant to clear.
```

**Post C — where business rules live**

```
"A cancelled subscription cannot be cancelled again" is a property of a subscription.

Not of the endpoint that happens to call it.

Put that check in the request handler and the next caller — a background job, a message
consumer, an admin tool — has to remember it independently. Put it on the entity and
every path gets it for free.

The exception in the service I just published: "no duplicate active subscription per
plan" spans rows, and an aggregate cannot see its siblings. That one lives in the
handler, deliberately.

Knowing which rule goes where is most of the work.
```

---

## 8. Profile hygiene checklist

- [ ] Custom URL: `linkedin.com/in/aartih31` (already set)
- [ ] Add **Website** → `https://aarti31h.github.io`, labelled "Portfolio"
- [ ] Banner image — a plain dark banner with name + title reads far better than the default
- [ ] Set **Open to work** (recruiters-only visibility) with target titles:
      Full Stack Developer, .NET Developer, Backend Engineer, Software Engineer
- [ ] Add Education: MCA, Gyan Ganga College of Technologies, 2019–2021
- [ ] Ask 2–3 colleagues for recommendations mentioning specific work, not adjectives
- [ ] Pin `subscription-service` and `aarti31h.github.io` on the GitHub profile
