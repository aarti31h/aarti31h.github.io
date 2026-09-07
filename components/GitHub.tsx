import Reveal from "./Reveal";
import Section from "./Section";
import { site } from "@/lib/content";

const cards = [
  {
    href: `${site.github}/subscription-service`,
    title: "subscription-service",
    body: "A CQRS subscription API in ASP.NET Core (.NET 8): MediatR pipeline behaviours, EF Core, Redis cache-aside invalidated on write, JWT auth, RFC 7807 errors, Docker Compose and 30 tests. The architecture from the case studies above, readable end to end.",
    meta: "C# · Reference implementation",
  },
  {
    href: `${site.github}/aarti31h.github.io`,
    title: "aarti31h.github.io",
    body: "Source for this site — Next.js, TypeScript and Tailwind, statically exported and deployed by GitHub Actions, with a headless verification harness for accessibility and layout.",
    meta: "TypeScript · This portfolio",
  },
];

export default function GitHubSection() {
  return (
    <Section
      id="github"
      kicker="08 / Code"
      title="Where the code actually lives."
      lead="Five years of production work at Logimonk sits in private client repositories, so my public commit history is not a measure of it. These two are public, and they are the real thing rather than a demo."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.href} delay={i * 80}>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-line bg-surface/30 p-7 transition-all duration-500 hover:border-line-strong hover:bg-surface/60"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {card.meta}
              </p>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-medium tracking-tight">
                {card.title}
                <span
                  aria-hidden="true"
                  className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </h3>
              <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-muted">
                {card.body}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <p className="mt-8 max-w-2xl text-pretty text-[14.5px] leading-relaxed text-faint">
Both build and test in CI on every push. The subscription service is the
          one to read if you want to see how I actually structure a system: the
          README explains each decision and the trade-off it accepted, including
          the two bugs the test suite caught while it was being written.
        </p>
      </Reveal>
    </Section>
  );
}
