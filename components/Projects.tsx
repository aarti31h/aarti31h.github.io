import Link from "next/link";
import Reveal from "./Reveal";
import Section from "./Section";
import { projects, type Project } from "@/lib/content";

/** Compact left-to-right architecture strip used as the card's hover preview. */
function FlowStrip({ steps, bright = false }: { steps: string[]; bright?: boolean }) {
  return (
    <ol
      aria-hidden="true"
      className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[10.5px]"
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1.5">
          <span
            className={`rounded border px-2 py-1 transition-colors duration-500 ${
              bright
                ? "border-accent/35 bg-accent/[0.07] text-accent-soft"
                : "border-line text-faint group-hover:border-line-strong group-hover:text-muted"
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className={bright ? "text-accent/50" : "text-faint/60"}>→</span>
          )}
        </li>
      ))}
    </ol>
  );
}

function FlagshipCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface/40 transition-colors duration-500 hover:border-line-strong">
        {/* Animated top rule marks this as the flagship */}
        <span aria-hidden="true" className="rule-sweep absolute inset-x-0 top-0 h-px" />

        <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
                Flagship
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                {project.domain}
              </span>
            </div>

            <h3 className="mt-6 text-balance text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
                {project.name}
              </Link>
            </h3>

            <p className="mt-2 font-mono text-[11.5px] text-faint">{project.period}</p>

            <p className="prose-body mt-5 text-pretty text-[15px]">{project.problem}</p>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
              Read the case study
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </div>

          <div className="lg:border-l lg:border-line lg:pl-10">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Architecture
            </h4>
            <div className="mt-4">
              <FlowStrip steps={project.preview} bright />
            </div>

            <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Outcome
            </h4>
            <dl className="mt-4 space-y-3">
              {project.outcomes.map((o) => (
                <div key={o.label} className="flex items-baseline gap-3">
                  <dt className="min-w-[3.5rem] font-mono text-sm text-fg">{o.value}</dt>
                  <dd className="text-[13px] text-muted">{o.label}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Stack
            </h4>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/30 p-7 transition-all duration-500 hover:border-line-strong hover:bg-surface/60">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          {project.domain}
        </p>

        <h3 className="mt-4 text-balance text-xl font-medium tracking-tight">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>

        <p className="mt-2 font-mono text-[11.5px] text-faint">{project.period}</p>

        <p className="prose-body mt-4 text-pretty text-[14.5px]">{project.summary}</p>

        {/* Architecture preview — dim until the card is hovered or focused */}
        <div className="mt-6 opacity-60 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
          <FlowStrip steps={project.preview} />
        </div>

        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-accent">
            Case study
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [flagshipProject, ...rest] = projects;

  return (
    <Section
      id="work"
      kicker="05 / Featured work"
      title="Three systems, and why they are built that way."
      lead="Each of these is written up as a case study: the problem, the architecture, the decisions I would defend in review, and what actually changed as a result."
    >
      <FlagshipCard project={flagshipProject} />

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={i * 90} />
        ))}
      </div>
    </Section>
  );
}
