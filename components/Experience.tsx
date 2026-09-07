import Reveal from "./Reveal";
import Section from "./Section";
import { site, timeline } from "@/lib/content";

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="04 / Experience"
      title="Five years, one company, four domains."
      lead={
        <>
          Software Engineer at {site.employer}, Jabalpur — July 2021 to present.
          Staying through several product generations meant owning systems long
          enough to live with my own architectural decisions.
        </>
      }
    >
      <ol className="relative">
        {/* Spine */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent sm:left-[calc(10.5rem+7px)]"
        />

        {timeline.map((entry, i) => (
          <Reveal as="li" key={entry.title} delay={i * 70} className="relative">
            <div className="group grid gap-1 pb-12 pl-8 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-8 sm:pl-0">
              {/* Period */}
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint sm:pt-0.5 sm:text-right">
                {entry.period}
              </p>

              {/* Marker */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-colors duration-500 sm:left-[10.5rem] ${
                  entry.current
                    ? "border-accent bg-accent/15"
                    : "border-line-strong bg-bg group-hover:border-accent"
                }`}
              >
                <span
                  className={`h-[5px] w-[5px] rounded-full transition-colors duration-500 ${
                    entry.current ? "bg-accent" : "bg-faint group-hover:bg-accent"
                  }`}
                />
              </span>

              <div className="sm:pl-6">
                <h3 className="text-base font-medium tracking-tight text-fg">
                  {entry.title}
                </h3>
                {entry.org && (
                  <p className="mt-1 text-[13px] text-accent">{entry.org}</p>
                )}
                <p className="mt-2.5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">
                  {entry.body}
                </p>
                {entry.tags && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
