import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagneticLink from "@/components/MagneticLink";
import Reveal from "@/components/Reveal";
import { articles, type ArticleBlock } from "@/lib/articles";
import { site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.deck,
    alternates: { canonical: `/notes/${article.slug}/` },
    openGraph: {
      type: "article",
      title: `${article.title} · ${site.name}`,
      description: article.deck,
      url: `${site.url}/notes/${article.slug}/`,
      publishedTime: article.published,
      authors: [site.name],
      tags: [...article.tags],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} · ${site.name}`,
      description: article.deck,
      images: ["/og.png"],
    },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 className="mt-14 scroll-mt-28 text-balance text-2xl font-medium tracking-tight sm:text-[1.75rem]">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-10 text-balance text-lg font-medium tracking-tight text-fg sm:text-xl">
          {block.text}
        </h3>
      );

    case "p":
      return <p className="prose-body mt-5 text-pretty">{block.text}</p>;

    case "quote":
      return (
        <blockquote className="my-9 border-l-2 border-accent pl-6">
          <p className="text-pretty text-lg leading-relaxed text-fg sm:text-xl">
            {block.text}
          </p>
        </blockquote>
      );

    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item.slice(0, 32)} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-strong" />
              <span className="prose-body text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div className="my-6 rounded-lg border border-accent/30 bg-accent/[0.06] px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {block.label}
          </p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{block.text}</p>
        </div>
      );

    case "code":
      return (
        <figure className="my-7">
          {block.caption && (
            <figcaption className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {block.caption}
            </figcaption>
          )}
          <pre className="overflow-x-auto rounded-lg border border-line bg-surface/60 p-5 font-mono text-[12.5px] leading-relaxed text-muted">
            <code>{block.text}</code>
          </pre>
        </figure>
      );
  }
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const published = new Date(article.published).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.deck,
    datePublished: article.published,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/notes/${article.slug}/`,
    keywords: article.tags.join(", "),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-8 lg:pt-40">
      <Reveal>
        <Link
          href="/#knowledge"
          className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-accent"
        >
          <span aria-hidden="true">←</span> Engineering notes
        </Link>
      </Reveal>

      <header className="mt-10 border-b border-line pb-10">
        <Reveal delay={60}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-faint">
            <time dateTime={article.published}>{published}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="display mt-6 text-balance text-[clamp(1.875rem,1.3rem+2.6vw,3rem)]">
            {article.title}
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="prose-body mt-6 text-pretty text-lg">{article.deck}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-[13px] text-muted">
              <span className="text-fg">{site.name}</span> · {site.title}
            </p>
            {article.repo && (
              <a
                href={article.repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] text-accent transition-opacity duration-300 hover:opacity-80"
              >
                {article.repo.label}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      <div className="mt-4">
        {article.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <Reveal>
        <div className="mt-16 grid gap-6 border-t border-line pt-12 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Read the code
            </p>
            {article.repo && (
              <a
                href={article.repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-2 text-lg font-medium tracking-tight transition-colors duration-300 hover:text-accent"
              >
                {article.repo.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            )}
          </div>
          <div className="sm:justify-self-end">
            <MagneticLink href="/#contact">Let&apos;s connect</MagneticLink>
          </div>
        </div>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
