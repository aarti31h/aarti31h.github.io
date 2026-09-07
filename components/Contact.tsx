import CopyEmail from "./CopyEmail";
import MagneticLink from "./MagneticLink";
import Reveal from "./Reveal";
import { site } from "@/lib/content";

const channels = [
  { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin },
  { label: "GitHub", value: `@${site.githubUser}`, href: site.github },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-line lg:inset-x-8" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal>
            <p className="kicker">10 / Contact</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="contact-heading" className="section-title mt-5 text-balance">
              Let&apos;s talk about what you are building.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="prose-body mt-6 max-w-lg text-pretty">
              I am open to conversations about full stack and backend engineering
              roles, and about consulting on .NET microservices, API security and
              performance work. The quickest way to reach me is email.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticLink href={`mailto:${site.email}`} external ariaLabel={`Email ${site.name}`}>
                {site.email}
              </MagneticLink>
              <CopyEmail />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:pt-[4.5rem]">
          <dl className="divide-y divide-line border-y border-line">
            {channels.map((channel) => (
              <div key={channel.label} className="group">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 py-5 transition-colors duration-300"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {channel.label}
                  </dt>
                  <dd className="flex items-center gap-2 text-[15px] text-fg transition-colors duration-300 group-hover:text-accent">
                    {channel.value}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </dd>
                </a>
              </div>
            ))}

            <div className="flex items-center justify-between gap-4 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Resume
              </dt>
              <dd>
                <a
                  href={site.resume}
                  download=""
                  className="inline-flex items-center gap-2 text-[15px] text-fg transition-colors duration-300 hover:text-accent"
                >
                  PDF <span aria-hidden="true">↓</span>
                </a>
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Based in
              </dt>
              <dd className="text-[15px] text-muted">{site.location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
