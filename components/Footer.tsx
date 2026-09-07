import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-sm font-medium tracking-tight text-fg">{site.name}</p>
          <p className="mt-1 font-mono text-[11.5px] text-faint">
            {site.title}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted transition-colors duration-300 hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted transition-colors duration-300 hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-[13px] text-muted transition-colors duration-300 hover:text-accent"
          >
            Email
          </a>
          <Link
            href="/#top"
            className="text-[13px] text-muted transition-colors duration-300 hover:text-accent"
          >
            Back to top ↑
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl border-t border-line px-6 py-6 lg:px-8">
        <p className="font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript
          and Tailwind CSS. Statically exported, deployed on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
