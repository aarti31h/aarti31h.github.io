/**
 * Single source of truth for every fact on this site.
 *
 * Everything here is drawn from Aarti Hariharno's CV and her own account of
 * her work. Nothing is embellished: if a number is not in the CV, it is not
 * in this file.
 */

export const site = {
  url: "https://aarti31h.github.io",
  name: "Aarti Hariharno",
  title: "Full Stack Software Engineer",
  tagline:
    "Building scalable web applications, distributed systems and cloud-native solutions.",
  stack: [".NET", "Angular", "Microservices", "Cloud"],
  location: "Jabalpur, Madhya Pradesh, India",
  email: "aarti31h@gmail.com",
  github: "https://github.com/aarti31h",
  githubUser: "aarti31h",
  linkedin: "https://www.linkedin.com/in/aartih31",
  linkedinHandle: "in/aartih31",
  resume: "/Aarti-Hariharno-Resume.pdf",
  employer: "Logimonk Technologies Pvt Ltd",
  since: 2021,
  yearsExperience: 5,
} as const;

export const description =
  "Aarti Hariharno is a Full Stack Software Engineer with 5 years of experience building scalable ASP.NET Core and Angular applications, microservices with CQRS and MediatR, and cloud-native systems on Azure and AWS.";

/* ------------------------------------------------------------------ */
/* Engineering impact                                                  */
/* ------------------------------------------------------------------ */

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export const metrics: Metric[] = [
  {
    value: 20,
    suffix: "K+",
    label: "Daily requests served",
    detail:
      "Sustained request volume across the full-stack products I build and support.",
  },
  {
    value: 35,
    suffix: "%",
    label: "Faster API responses",
    detail:
      "Redis caching, EF Core and LINQ query tuning, pagination and database indexing.",
  },
  {
    value: 40,
    suffix: "%",
    label: "Faster deployments",
    detail:
      "Dockerised services with automated build, test and deploy pipelines.",
  },
  {
    value: 30,
    suffix: "%",
    label: "Fewer recurring incidents",
    detail:
      "Structured logging with Serilog plus Grafana and Prometheus dashboards.",
  },
  {
    value: 80,
    suffix: "%+",
    label: "Core service coverage",
    detail:
      "Unit and integration testing with xUnit, introduced alongside code review.",
  },
];

/** Secondary proof points, shown as prose rather than as counters. */
export const secondaryProof = [
  {
    value: "~40%",
    text: "fewer cross-team deployment conflicts after decoupling services onto a message bus.",
  },
  {
    value: "4+",
    text: "client applications brought onto one standardised authentication flow.",
  },
  {
    value: "~25%",
    text: "of routine support requests deflected by an AI chatbot on the investment platform.",
  },
];

/* ------------------------------------------------------------------ */
/* Technical expertise                                                 */
/* ------------------------------------------------------------------ */

export type ExpertiseGroup = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  {
    id: "01",
    title: "Application Engineering",
    summary:
      "The product surface and the API behind it, typed end to end from Angular components down to EF Core.",
    items: [
      ".NET 8",
      "ASP.NET Core",
      "C#",
      "Angular",
      "TypeScript",
      "RxJS",
      "React",
      "REST APIs",
    ],
  },
  {
    id: "02",
    title: "Distributed Systems",
    summary:
      "Splitting a system along business seams so services deploy, fail and scale independently.",
    items: [
      "Microservices",
      "CQRS",
      "MediatR",
      "RabbitMQ",
      "Azure Service Bus",
      "SignalR",
      "Background Services",
    ],
  },
  {
    id: "03",
    title: "Data & Performance",
    summary:
      "Making the data layer stop being the bottleneck: measure, index, cache, paginate.",
    items: [
      "SQL Server",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "EF Core",
      "LINQ",
      "Query tuning",
      "Indexing",
    ],
  },
  {
    id: "04",
    title: "Cloud & Delivery",
    summary:
      "Getting work to production repeatably, so a release is routine rather than an event.",
    items: [
      "Azure",
      "AWS",
      "Docker",
      "Azure DevOps",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    id: "05",
    title: "Security & Observability",
    summary:
      "Authentication designed in rather than bolted on, and systems that can be understood while running.",
    items: [
      "JWT",
      "OAuth2",
      "OpenID Connect",
      "IdentityServer",
      "Serilog",
      "NLog",
      "Grafana",
      "Prometheus",
    ],
  },
];

/** Cloud services named explicitly on the CV, which keeps the claim honest. */
export const cloudDetail = {
  azure: ["App Service", "Virtual Machines", "Service Bus"],
  aws: ["EC2", "S3", "CloudFront", "IAM", "Route 53"],
};

/* ------------------------------------------------------------------ */
/* Experience timeline                                                 */
/* ------------------------------------------------------------------ */

export type TimelineEntry = {
  period: string;
  title: string;
  org?: string;
  body: string;
  tags?: string[];
  current?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2019 — 2021",
    title: "MCA, Master of Computer Applications",
    org: "Gyan Ganga College of Technologies, Jabalpur",
    body: "Postgraduate study in computer applications, completed immediately before joining Logimonk.",
  },
  {
    period: "Jul 2021",
    title: "Joined Logimonk Technologies",
    org: "Software Engineer",
    body: "Started as a full-stack engineer working across Angular front ends and ASP.NET Core services.",
  },
  {
    period: "Sep 2021 — Mar 2022",
    title: "Customer-Centric E-Commerce Platform",
    body: "Delivered Stripe checkout, live order tracking on Google Maps and delivery management, then optimised the search and checkout flows.",
    tags: ["Angular Material", "ASP.NET Core", "Stripe", "Google Maps"],
  },
  {
    period: "Since Apr 2022",
    title: "Investment & Property Management Platform",
    body: "Single sign-on across four modules, then finance microservices for subscriptions, payments and goal tracking built on CQRS and MediatR.",
    tags: ["Microservices", "CQRS", "Azure Service Bus", "Redis"],
    current: true,
  },
  {
    period: "May 2024 — Nov 2024",
    title: "Subscription Video Streaming Platform",
    body: "Real-time playback state and notifications over SignalR and pub/sub messaging, with subscription-based access control.",
    tags: ["SignalR", "Pub/Sub", "Ant Design", "EF Core"],
  },
  {
    period: "Today",
    title: "Where I am now",
    org: "Full Stack Software Engineer, Logimonk Technologies",
    body: "Owning features end to end across API design, messaging, data access, CI/CD and production support, and leading requirement workshops and sprint demos.",
    current: true,
  },
];

/* ------------------------------------------------------------------ */
/* Projects / case studies                                             */
/* ------------------------------------------------------------------ */

export type CaseStudySection = { heading: string; body: string[] };

export type Project = {
  slug: string;
  name: string;
  domain: string;
  period: string;
  flagship?: boolean;
  summary: string;
  problem: string;
  stack: string[];
  /** Compact architecture strip shown on the card hover preview. */
  preview: string[];
  outcomes: { value: string; label: string }[];
  sections: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: "investment-property-platform",
    name: "Investment & Property Management Platform",
    domain: "Fintech · Real Estate",
    period: "Apr 2022 — Present",
    flagship: true,
    summary:
      "A single sign-on platform unifying Admin, Advisor, Investor and Acquisition modules, with independently scalable finance microservices behind it.",
    problem:
      "Investor and advisor workflows were fragmented across separate modules, each with its own login. Users were re-authenticating to move between parts of the same product, and support absorbed the friction as duplicate-login tickets.",
    stack: [
      "Angular Material",
      "ASP.NET Core Web API",
      "EF Core",
      "SQL Server",
      "PostgreSQL",
      "Azure Service Bus",
      "Redis",
      "Docker",
      "Azure DevOps",
    ],
    preview: ["Angular", "Auth", "Services", "Bus", "Data"],
    outcomes: [
      { value: "4+", label: "apps on one auth flow" },
      { value: "~25%", label: "support requests deflected" },
      { value: "~35%", label: "faster API responses" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "The platform had grown into four distinct modules, Admin, Advisor, Investor and Acquisition, that a single person often needed in one sitting. An advisor reviewing a portfolio would log in again to reach acquisition data. Each module carried its own session handling, so a change to authentication meant four changes.",
          "The visible cost was support tickets about duplicate logins. The structural cost was worse: authentication logic had been copied rather than shared, so security fixes had to be applied four times and could silently drift apart.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "I engineered a single sign-on platform as the front door. Authentication moved out of the individual modules and behind OpenID Connect and OAuth2, issuing JWTs that every downstream service validates the same way. One identity, one token format, one place to change.",
          "Behind that, the finance domain was split into services along business seams rather than technical ones. Subscriptions, payments and goal tracking each own their data and deploy on their own cadence. Services communicate over Azure Service Bus for anything asynchronous, and over REST where a caller genuinely needs an answer before it can continue.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "CQRS with MediatR. Read and write paths in the finance services have genuinely different shapes: writes are transactional and validation-heavy, reads are wide, frequent and tolerant of slightly stale data. Separating them let each side be optimised without compromise, and MediatR kept controllers thin, so a request maps to a handler and cross-cutting concerns like validation and logging sit in pipeline behaviours instead of being repeated.",
          "Message bus over direct calls. Payment confirmation triggers work in subscriptions and goal tracking. Wiring that as synchronous HTTP would have made the payment path only as available as its slowest dependant. Publishing an event instead means those services consume at their own pace, and a consumer being redeployed delays work rather than failing a payment.",
          "Redis where the read pattern justified it. Reference and portfolio data was being read far more often than it changed. Caching it cut repeated database work and was one of the main contributors to the API response time improvement, applied to the hot paths that measurement pointed at rather than as a blanket layer.",
          "Two relational stores. The platform spans SQL Server and PostgreSQL, so EF Core sits behind a provider-agnostic data layer and query tuning is done per store rather than assuming one plan generalises to the other.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Independent deployability was the hard part, not the diagram. Splitting services only pays off if teams stop blocking each other, and early on shared contracts still forced coordinated releases. Tightening service boundaries and moving cross-service work onto the bus is what cut cross-team deployment conflicts by around 40%.",
          "Consistency across an asynchronous boundary needed care. Once payments and subscriptions no longer share a transaction, handlers have to tolerate retries and duplicate delivery without double-applying an effect.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "Authentication is standardised across 4+ client applications, so a security change is made once. Average API response time improved by roughly 35%. Cross-team deployment conflicts fell by around 40%.",
          "An AI-powered chatbot for investment and subscription queries now deflects approximately 25% of routine support requests, which moved a class of repetitive questions off the support queue entirely.",
        ],
      },
    ],
  },
  {
    slug: "video-streaming-platform",
    name: "Subscription-Based Video Streaming Platform",
    domain: "Media · Streaming",
    period: "May 2024 — Nov 2024",
    summary:
      "Real-time playback state and notifications over SignalR, with subscription-gated access and support for concurrent streaming and uploads.",
    problem:
      "Playback state and notifications needed to reach viewers as they happened, across concurrent global streams and uploads, without the client polling the API into the ground.",
    stack: [
      "Angular",
      "Ant Design",
      "ASP.NET Core",
      "SignalR",
      "Pub/Sub messaging",
      "EF Core",
      "SQL Server",
    ],
    preview: ["Angular", "SignalR", "Pub/Sub", "SQL"],
    outcomes: [
      { value: "Real-time", label: "playback + notifications" },
      { value: "Concurrent", label: "streaming and uploads" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Viewers needed playback status and notifications to update live. The straightforward approach, polling an endpoint on a timer, scales badly in exactly the situation that matters: a busy day, when many clients are open at once and each one is asking a question whose answer is usually that nothing changed.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "An Angular front end built on Ant Design holds a persistent SignalR connection to ASP.NET Core, so the server pushes playback state and notifications instead of the client asking for them.",
          "Behind the hub, pub/sub messaging carries events between the components that produce them and the ones that broadcast them. That indirection is what lets streaming and upload work happen concurrently without the two paths contending on the same request thread.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "SignalR over polling. The update pattern is event-driven and bursty. A persistent connection delivers changes when they happen and stays quiet otherwise, which both cut content-delivery latency and removed a large volume of empty polling requests.",
          "Pub/sub between producers and the hub. Decoupling the component that knows something changed from the component that tells clients means an upload finishing, a transcode completing and a subscription changing all flow through one broadcast path rather than each growing its own.",
          "Subscription-based access control enforced server-side. Entitlement is checked where content is served, not in the Angular route guard. The guard is there for user experience, not as the security boundary.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "Playback status and notifications became genuinely real-time, reducing content-delivery latency and supporting concurrent global streaming and uploads. The responsive Angular front end improved stream start-up experience on high-traffic days.",
        ],
      },
    ],
  },
  {
    slug: "ecommerce-platform",
    name: "Customer-Centric E-Commerce Platform",
    domain: "E-Commerce · Payments",
    period: "Sep 2021 — Mar 2022",
    summary:
      "Secure Stripe checkout, live order tracking on Google Maps and delivery management, with the search and checkout paths tuned for responsiveness.",
    problem:
      "Customers could place an order but then lost sight of it. Order-to-delivery visibility was the gap, and a slow search and checkout path was costing conversions before that even mattered.",
    stack: [
      "Angular Material",
      "ASP.NET Core Web API",
      "EF Core",
      "SQL Server",
      "Stripe",
      "Google Maps API",
    ],
    preview: ["Angular", "API", "Stripe", "Maps"],
    outcomes: [
      { value: "Live", label: "order tracking" },
      { value: "Secure", label: "Stripe checkout" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Two things were hurting the same funnel from opposite ends. Product search and checkout were slow enough to lose customers mid-flow, and once an order was placed there was no way to see where it actually was, which turned into support contact and lost repeat business.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "An Angular Material front end over an ASP.NET Core Web API with EF Core and SQL Server. Stripe handles payment so card data never touches our servers, and the Google Maps API drives live order tracking, with delivery managed through Bring.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Stripe as the payment boundary. Delegating card handling keeps sensitive data out of the application entirely, and the smallest possible surface is the one you never have.",
          "Tracking as a first-class feature, not a status field. Surfacing delivery position on a map answers the question customers were otherwise asking support, which is the cheaper place to answer it.",
          "Query and flow optimisation on the paths that convert. Product search, order placement and payment tracking were the flows measured and tuned, because those are where responsiveness turns directly into completed checkouts.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "Order-to-delivery visibility improved materially for customers, and the optimised search, order and payment flows improved page responsiveness and reduced checkout drop-offs.",
        ],
      },
    ],
  },
];

export const flagship = projects.find((p) => p.flagship)!;

/* ------------------------------------------------------------------ */
/* Engineering principles                                              */
/* ------------------------------------------------------------------ */

export const principles = [
  {
    title: "Build for maintainability",
    body: "The code is read and changed far more often than it is written. Clear seams and boring, predictable structure beat cleverness every time.",
  },
  {
    title: "Optimise where it matters",
    body: "Measure first. A 35% response-time gain came from indexing, query tuning and caching the paths that were actually hot, not from optimising everything.",
  },
  {
    title: "Keep services loosely coupled",
    body: "Services should fail, deploy and scale on their own. Asynchronous messaging is what turns that from a diagram into a property the system actually has.",
  },
  {
    title: "Security is part of architecture",
    body: "Authentication belongs in the design, not in a later hardening pass. One standardised flow across applications is safer than four that drifted apart.",
  },
  {
    title: "Observability belongs in production",
    body: "A system you cannot see is a system you cannot support. Structured logs and dashboards are what turn an outage into a diagnosis.",
  },
  {
    title: "Automate repetitive work",
    body: "Anything done by hand on every release will eventually be done wrong. Pipelines removed the manual steps and cut deployment time by around 40%.",
  },
  {
    title: "Test critical behaviour",
    body: "Coverage is a means, not a goal. Tests earn their place on the logic that would genuinely hurt if it broke, which is how core services reached 80%+.",
  },
  {
    title: "Do not over-engineer",
    body: "Split a system when there is a real reason to. Every boundary you add is a boundary someone has to operate, debug and deploy across.",
  },
];

/* ------------------------------------------------------------------ */
/* Architecture explainer                                              */
/* ------------------------------------------------------------------ */

export type ArchNode = {
  id: string;
  label: string;
  role: string;
  detail: string;
  tech: string[];
};

export const archLayers: ArchNode[] = [
  {
    id: "client",
    label: "Client",
    role: "Browser and device",
    detail:
      "Where the product is actually experienced. Everything below exists to make this feel immediate and trustworthy.",
    tech: ["Web", "Mobile web"],
  },
  {
    id: "ui",
    label: "Angular",
    role: "Presentation layer",
    detail:
      "A typed component front end. RxJS models asynchronous state properly instead of scattering subscriptions, and route guards shape the experience while the real authorisation check stays server-side.",
    tech: ["Angular", "TypeScript", "RxJS", "Angular Material"],
  },
  {
    id: "api",
    label: "Secure API",
    role: "Authentication and entry point",
    detail:
      "The trust boundary. Requests carry a JWT issued through OAuth2 and OpenID Connect, and every downstream service validates it the same way, so authentication is defined once rather than per application.",
    tech: ["ASP.NET Core", "JWT", "OAuth2", "OIDC", "IdentityServer"],
  },
  {
    id: "services",
    label: "Microservices",
    role: "Business capabilities",
    detail:
      "Services split along business seams such as subscriptions, payments and goal tracking, each owning its data. CQRS separates read and write responsibilities so each path can be optimised on its own terms, with MediatR keeping handlers isolated and controllers thin.",
    tech: ["Microservices", "CQRS", "MediatR", "Background Services"],
  },
  {
    id: "bus",
    label: "Message bus",
    role: "Asynchronous communication",
    detail:
      "RabbitMQ and Azure Service Bus carry work that does not need an immediate answer. A slow or restarting consumer delays processing instead of failing the caller, which is what makes independent deployment realistic.",
    tech: ["RabbitMQ", "Azure Service Bus", "SignalR"],
  },
  {
    id: "data",
    label: "Data & cache",
    role: "Persistence and read performance",
    detail:
      "Relational stores accessed through EF Core, with indexing and query tuning done against real access patterns. Redis absorbs the reads that repeat far more often than the underlying data changes.",
    tech: ["SQL Server", "PostgreSQL", "MongoDB", "Redis", "EF Core"],
  },
  {
    id: "ops",
    label: "Delivery & observability",
    role: "Runs alongside every layer",
    detail:
      "Containerised services shipped through automated pipelines, with structured logging and dashboards so behaviour in production is visible rather than inferred.",
    tech: ["Docker", "Azure DevOps", "GitHub Actions", "Serilog", "Grafana", "Prometheus"],
  },
];

/* ------------------------------------------------------------------ */
/* Knowledge sharing                                                   */
/* ------------------------------------------------------------------ */

export const knowledgeSharing = {
  intro:
    "Most of my knowledge sharing happens inside delivery rather than on a blog: in workshops with clients, in review, and in the practices I have introduced to the team.",
  items: [
    {
      title: "Client requirement workshops",
      body: "Leading sessions that turn a business problem into something a team can actually build, and staying close enough to the requirement to catch where it will break.",
    },
    {
      title: "Sprint demos",
      body: "Presenting completed work to clients and stakeholders each sprint, translating engineering detail into the outcome the audience cares about.",
    },
    {
      title: "Testing practice",
      body: "Introducing unit and integration testing with xUnit to services that had little, and raising coverage on core services past 80% without turning coverage into the goal.",
    },
    {
      title: "Code review",
      body: "Reviewing as a teaching channel: the place where architectural intent gets transferred, not just where defects get caught.",
    },
  ],
  topics: [
    "CQRS in practice",
    "Message-driven service boundaries",
    "Caching strategy with Redis",
    "API security with OIDC",
    "EF Core query performance",
    "Observability for .NET services",
  ],
};
