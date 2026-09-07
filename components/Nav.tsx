"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/lib/content";

const links = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#expertise", label: "Expertise", id: "expertise" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#architecture", label: "Architecture", id: "architecture" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  /* Condense the header once the page has moved off the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section currently owns the upper half of the screen. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /* While the mobile sheet is open, trap scroll and allow Escape to dismiss. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong font-mono text-[11px] tracking-tight text-accent transition-colors duration-300 group-hover:border-accent">
            AH
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            {site.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                  active === link.id
                    ? "text-accent"
                    : "text-muted hover:text-fg"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={site.resume}
              download=""
              className="rounded-full border border-line-strong px-4 py-2 text-[13px] text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Resume
            </a>
          </li>
          <li className="ml-1">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong"
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 block h-px w-4 bg-fg transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-fg transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
        </div>
      </nav>

      {/* Mobile sheet — a deliberate full-width list, not a shrunken desktop bar. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-6 py-4">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line last:border-0">
              <Link
                href={link.href}
                onClick={close}
                className="flex items-center justify-between py-4 text-base text-fg"
              >
                {link.label}
                <span aria-hidden="true" className="font-mono text-xs text-faint">
                  ↗
                </span>
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <a
              href={site.resume}
              download=""
              onClick={close}
              className="flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink"
            >
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
