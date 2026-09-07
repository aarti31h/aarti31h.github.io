import Reveal from "./Reveal";
import Section from "./Section";
import { site } from "@/lib/content";

const cards = [
  {
    href: site.github,
    title: `@${site.githubUser}`,
    body: "Profile, activity and the public work I am building out.",
    meta: "GitHub profile",
  },
  {
    href: `${site.github}/aarti31h.github.io`,
    title: "This site",
    body: "Source for this portfolio — Next.js, TypeScript, Tailwind, statically exported and deployed by GitHub Actions.",
    meta: "Public repository",
  },
];

export default function GitHubSection() {
  return (
    <Section
      id="github"
      kicker="08 / Code"
      title="Where the code actually lives."
      lead="Worth being straight about this: five years of production work at Logimonk sits in private client repositories, so my public commit history is not a measure of it."
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
          The most useful proof of how I work is the case studies above — they
          describe the same decisions a code review would surface. If you would
          like to talk through any of that architecture in detail, or see how I
          reason about a problem live, I am glad to.
        </p>
      </Reveal>
    </Section>
  );
}
