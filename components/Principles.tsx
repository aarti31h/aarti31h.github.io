import Reveal from "./Reveal";
import Section from "./Section";
import { principles } from "@/lib/content";

export default function Principles() {
  return (
    <Section
      id="principles"
      kicker="06 / Engineering principles"
      title="What I optimise for when nobody is watching."
      lead="These are not slogans. Each one is a rule I have arrived at by living with the consequences of getting it wrong."
    >
      <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {principles.map((principle, i) => (
          <Reveal
            as="li"
            key={principle.title}
            delay={(i % 2) * 60 + Math.floor(i / 2) * 40}
            className="group bg-bg p-7 transition-colors duration-500 hover:bg-surface sm:p-8"
          >
            <span className="font-mono text-[11px] text-faint transition-colors duration-500 group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-[17px] font-medium tracking-tight text-fg">
              {principle.title}
            </h3>
            <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-muted">
              {principle.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
