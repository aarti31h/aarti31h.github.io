"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { observeReveal } from "@/lib/reveal";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds, applied via CSS custom property. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. The animation itself lives in CSS (`.reveal`), so this component
 * only decides *when* — keeping the work off the main thread.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
