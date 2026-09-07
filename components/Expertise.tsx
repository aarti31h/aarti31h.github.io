import Reveal from "./Reveal";
import Section from "./Section";
import { expertise } from "@/lib/content";

export default function Expertise() {
  return (
    <Section
      id="expertise"
      kicker="03 / Technical expertise"
      title="Grouped by the problem it solves."
      lead="A list of thirty logos says very little. These are the five areas I actually design in, and the tools I reach for inside each."
    >
      <ul className="border-t border-line">
        {expertise.map((group, i) => (
          <Reveal as="li" key={group.id} delay={i * 60}>
            <div className="group relative grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-surface/60 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 md:py-10">
              {/* Accent rail that grows on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />

              <div className="flex items-baseline gap-4 md:w-56 md:flex-col md:gap-2 md:pl-6">
                <span className="font-mono text-[11px] text-faint transition-colors duration-500 group-hover:text-accent">
                  {group.id}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-fg">
                  {group.title}
                </h3>
              </div>

              <div className="md:pr-2">
                <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-muted">
                  {group.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-line px-2.5 py-1 font-mono text-[11.5px] text-faint transition-colors duration-500 group-hover:border-line-strong group-hover:text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
