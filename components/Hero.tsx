import HeroDiagram from "./HeroDiagram";
import MagneticLink from "./MagneticLink";
import Reveal from "./Reveal";
import { site } from "@/lib/content";

const proof = [
  { value: "5+", label: "Years experience" },
  { value: "20K+", label: "Daily requests" },
  { value: "Microservices", label: "CQRS · Messaging" },
  { value: "Cloud", label: "Azure · AWS · CI/CD" },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:px-8 lg:pb-32 lg:pt-44"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)] lg:gap-10">
        {/* ---------------------------------------------------------- */}
        {/* Copy                                                        */}
        {/* ---------------------------------------------------------- */}
        <div>
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {site.location}
            </p>
          </Reveal>

          <h1
            id="hero-heading"
            className="display mt-7 text-[clamp(2.75rem,1.4rem+5.6vw,5.25rem)]"
          >
            <Reveal as="span" className="block" delay={60}>
              Aarti
            </Reveal>
            <Reveal as="span" className="block" delay={140}>
              Hariharno
            </Reveal>
          </h1>

          <Reveal delay={220}>
            <p className="mt-7 font-mono text-[13px] uppercase tracking-[0.22em] text-accent sm:text-sm">
              {site.title}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="prose-body mt-6 max-w-lg text-pretty text-lg sm:text-xl">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={370}>
            <p className="mt-6 font-mono text-[13px] text-faint">
              {site.stack.join("  ·  ")}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticLink href="/#work">
                View my work
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </MagneticLink>
              <MagneticLink href="/#contact" variant="ghost">
                Let&apos;s connect
              </MagneticLink>
              <a
                href={site.resume}
                download=""
                className="ml-1 inline-flex items-center gap-2 border-b border-line-strong py-1 text-sm text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true">↓</span> Download resume
              </a>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Architecture visual                                         */}
        {/* ---------------------------------------------------------- */}
        <Reveal delay={200} className="justify-self-center lg:justify-self-end">
          <HeroDiagram />
        </Reveal>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Proof strip                                                   */}
      {/* ------------------------------------------------------------ */}
      <Reveal delay={520}>
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-20 lg:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="bg-bg px-5 py-6 sm:px-6">
              <dt className="text-base font-medium tracking-tight text-fg sm:text-lg">
                {item.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
