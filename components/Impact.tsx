import Counter from "./Counter";
import Reveal from "./Reveal";
import Section from "./Section";
import { metrics, secondaryProof } from "@/lib/content";

export default function Impact() {
  return (
    <Section
      id="impact"
      kicker="01 / Engineering impact"
      title="Outcomes, not a technology checklist."
      lead="Numbers from production systems I have built and supported at Logimonk. Each one is the result of a specific engineering decision, described in the case studies below."
      divider={false}
    >
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((metric, i) => (
          <Reveal
            key={metric.label}
            delay={i * 70}
            className="flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface"
          >
            <dt className="order-2 mt-3 text-sm font-medium tracking-tight text-fg">
              {metric.label}
            </dt>
            <dd className="order-1">
              <Counter
                to={metric.value}
                suffix={metric.suffix}
                className="display text-[clamp(2.25rem,1.6rem+1.6vw,3rem)] text-accent"
              />
            </dd>
            <dd className="order-3 mt-2.5 text-[13px] leading-relaxed text-faint">
              {metric.detail}
            </dd>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={120}>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {secondaryProof.map((item) => (
            <li
              key={item.text}
              className="border-l border-line-strong pl-4 text-[13px] leading-relaxed text-muted"
            >
              <strong className="font-mono font-normal text-fg">{item.value}</strong>{" "}
              {item.text}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
