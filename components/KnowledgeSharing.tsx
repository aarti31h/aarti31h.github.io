import Reveal from "./Reveal";
import Section from "./Section";
import { knowledgeSharing } from "@/lib/content";

export default function KnowledgeSharing() {
  return (
    <Section
      id="knowledge"
      kicker="09 / Knowledge sharing"
      title="Where what I know actually gets transferred."
      lead={knowledgeSharing.intro}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {knowledgeSharing.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 60}
              className="bg-bg p-6 transition-colors duration-500 hover:bg-surface"
            >
              <h3 className="text-[15px] font-medium tracking-tight text-fg">
                {item.title}
              </h3>
              <p className="mt-2.5 text-pretty text-[14px] leading-relaxed text-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="rounded-xl border border-dashed border-line-strong p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Subjects I go deep on
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {knowledgeSharing.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-line px-3 py-1.5 text-[13px] text-muted"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13.5px] leading-relaxed text-faint">
              Long-form writing on these is something I am starting rather than
              something I can point at yet. I would rather say that plainly than
              pad this page.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
