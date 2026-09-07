import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagneticLink from "@/components/MagneticLink";
import Reveal from "@/components/Reveal";
import { projects, site } from "@/lib/content";

type Params = { slug: string };

/** Prerender one HTML file per case study at build time. */
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

  const title = `${project.name} — Case Study`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      type: "article",
      title: `${title} · ${site.name}`,
      description: project.summary,
      url: `${site.url}/work/${project.slug}/`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description: project.summary,
      images: ["/og.png"],
    },
  };
}

/** Vertical architecture chain, animated the same way as the hero diagram. */
function ProjectFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-5">
      {steps.map((step, i) => (
        <li key={step}>
          <div className="rounded-lg border border-accent/30 bg-accent/[0.07] px-4 py-3 text-center font-mono text-[12px] text-accent">
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="flex h-5 justify-center" aria-hidden="true">
              <svg width="2" height="20" className="overflow-visible">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="20"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  className="diag-edge flow-line"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              </svg>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${site.url}/work/${project.slug}/`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-8 lg:pt-40">
      {/* -------------------------------------------------------------- */}
      {/* Header                                                          */}
      {/* -------------------------------------------------------------- */}
      <Reveal>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-accent"
        >
          <span aria-hidden="true">←</span> All work
        </Link>
      </Reveal>

      <header className="mt-10 border-b border-line pb-12">
        <Reveal delay={60}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {project.domain}
            </span>
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            <span className="font-mono text-[11px] text-faint">{project.period}</span>
            {project.flagship && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
                Flagship
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={130}>
          <h1 className="display mt-6 max-w-4xl text-balance text-[clamp(2rem,1.3rem+3vw,3.5rem)]">
            {project.name}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="prose-body mt-7 max-w-2xl text-pretty text-lg">
            {project.summary}
          </p>
        </Reveal>
      </header>

      {/* -------------------------------------------------------------- */}
      {/* Body + sidebar                                                  */}
      {/* -------------------------------------------------------------- */}
      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:gap-16">
        <div>
          {project.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 40} className="mb-14 last:mb-0">
              <section>
                <h2 className="flex items-baseline gap-4 text-xl font-medium tracking-tight sm:text-2xl">
                  <span className="font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-5 border-l border-line pl-6 sm:pl-8">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="prose-body text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal delay={80}>
            <div className="rounded-xl border border-line bg-surface/40 p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Architecture
              </h2>
              <ProjectFlow steps={project.preview} />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-6 rounded-xl border border-line bg-surface/40 p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Outcome
              </h2>
              <dl className="mt-5 space-y-3.5">
                {project.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <dt className="font-mono text-base text-accent">{outcome.value}</dt>
                    <dd className="mt-0.5 text-[13px] text-muted">{outcome.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 rounded-xl border border-line bg-surface/40 p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Stack
              </h2>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-line px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Footer navigation                                               */}
      {/* -------------------------------------------------------------- */}
      <Reveal>
        <div className="mt-20 grid gap-6 border-t border-line pt-12 sm:grid-cols-2 sm:items-center">
          <Link href={`/work/${next.slug}`} className="group">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Next case study
            </p>
            <p className="mt-2 text-balance text-lg font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
              {next.name}
              <span
                aria-hidden="true"
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </Link>

          <div className="sm:justify-self-end">
            <MagneticLink href="/#contact">Let&apos;s connect</MagneticLink>
          </div>
        </div>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </article>
  );
}
