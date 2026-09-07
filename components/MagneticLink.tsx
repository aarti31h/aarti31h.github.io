"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/reveal";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium " +
  "transition-[background-color,border-color,color,box-shadow] duration-300 will-change-transform";

const variants = {
  primary:
    "bg-accent text-ink hover:bg-accent-soft hover:shadow-[0_8px_30px_-6px_var(--btn-glow)]",
  ghost:
    "border border-line-strong text-fg hover:border-accent hover:text-accent bg-[var(--ghost-bg)]",
} as const;

/**
 * A button that leans a few pixels toward the cursor.
 *
 * The pull is deliberately small (max ~6px) — enough to feel responsive,
 * not enough to make the target harder to hit. Pointer-coarse devices and
 * reduced-motion users get a plain, static button.
 */
export default function MagneticLink({
  href,
  children,
  className = "",
  variant = "primary",
  external = false,
  download = false,
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    el.style.transform = `translate3d(${dx * 12}px, ${dy * 8}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const props = {
    ref,
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onBlur: reset,
    style: { transition: "transform 350ms cubic-bezier(0.16,1,0.3,1)" },
    "aria-label": ariaLabel,
  };

  if (external || download) {
    return (
      <a
        {...props}
        href={href}
        {...(download ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...props} href={href}>
      {children}
    </Link>
  );
}
