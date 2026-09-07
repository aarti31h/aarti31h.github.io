import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  /** Adds a hairline rule above the section. */
  divider?: boolean;
  className?: string;
};

/**
 * Consistent section chrome: numbered mono kicker, display heading and an
 * optional lead paragraph. Keeping this in one place is what stops the page
 * drifting into eight slightly different header treatments.
 */
export default function Section({
  id,
  kicker,
  title,
  lead,
  children,
  divider = true,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32 ${className}`}
    >
      {divider && (
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-px bg-line lg:inset-x-8"
        />
      )}

      <Reveal>
        <p className="kicker">{kicker}</p>
      </Reveal>

      <Reveal delay={80}>
        <h2 id={`${id}-heading`} className="section-title mt-5 max-w-3xl text-balance">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={160}>
          <p className="prose-body mt-6 max-w-2xl text-pretty">{lead}</p>
        </Reveal>
      )}

      <div className="mt-14 sm:mt-16">{children}</div>
    </section>
  );
}
