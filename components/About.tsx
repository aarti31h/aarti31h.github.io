import Reveal from "./Reveal";
import Section from "./Section";
import { cloudDetail, site } from "@/lib/content";

const domains = ["Fintech", "Real Estate", "E-Commerce", "Video Streaming"];

export default function About() {
  return (
    <Section
      id="about"
      kicker="02 / About"
      title="I work across the whole lifecycle of a system."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-16">
        {/* Portrait */}
        <Reveal className="order-2 lg:order-1">
          <figure className="relative max-w-[300px]">
            <div
              aria-hidden="true"
              className="portrait-glow absolute -inset-3 rounded-2xl blur-2xl"
            />
            {/* Deliberate plain <img>: scripts/build-images.mjs already emits
                exact-size WebP variants, and `output: export` disables Image
                Optimization anyway — next/image would add client JS for no gain. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait-960.webp"
              srcSet="/portrait-480.webp 480w, /portrait-960.webp 960w"
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 70vw"
              width={480}
              height={600}
              alt={`${site.name}, Full Stack Software Engineer`}
              loading="lazy"
              decoding="async"
              className="relative w-full rounded-xl border border-line-strong object-cover"
            />
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {site.title}
              <span className="mt-1 block normal-case tracking-normal text-muted">
                {site.employer} · since 2021
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Prose */}
        <div className="order-1 lg:order-2">
          <Reveal delay={60}>
            <p className="prose-body text-pretty text-lg">
              I am a full stack engineer who genuinely enjoys the whole span of a
              system — the Angular interface a user actually touches, the secure API
              behind it, the services and messaging that keep those pieces
              independent, the database and cache decisions that make it fast, and
              the pipelines and dashboards that keep it healthy once it is live.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="prose-body mt-6 text-pretty">
              Over five years at {site.employer} I have delivered products across
              four domains, which is the most useful thing that has happened to me
              professionally. A fintech platform and a streaming service fail in
              very different ways, and having supported both, I have learned to
              recognise which constraints are real and which are inherited habit.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="prose-body mt-6 text-pretty">
              My strength is that I do not hand a feature over at the API boundary.
              I have designed the microservices, published the events, tuned the
              queries, containerised the services, written the pipeline and then
              been the person on the other end when something misbehaved in
              production. That last part is what changed how I design the first
              part.
            </p>
          </Reveal>

          {/* Domains */}
          <Reveal delay={260}>
            <div className="mt-10">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                Domains delivered
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <li
                    key={domain}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-muted"
                  >
                    {domain}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Honest cloud scope */}
          <Reveal delay={320}>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  Azure
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-muted">
                  {cloudDetail.azure.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  AWS
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-muted">
                  {cloudDetail.aws.join(", ")}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
