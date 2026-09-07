"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reveal";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Milliseconds for the full count. */
  duration?: number;
  className?: string;
};

/** Decelerating curve — fast start, gentle settle. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up to `to` the first time it enters the viewport.
 *
 * The final value is what gets server-rendered, so the correct number is in
 * the HTML for search engines, for readers without JavaScript, and for anyone
 * who has asked for reduced motion. The animation then writes to the DOM node
 * directly rather than through state: a counter is a leaf visual effect, and
 * routing ~60 frames through React would re-render the subtree on every one.
 *
 * The animated digits are hidden from assistive technology and the final
 * value is exposed once via aria-label, so a screen reader announces
 * "20K+" rather than every intermediate number.
 */
export default function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1500,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const digits = digitsRef.current;
    if (!el || !digits) return;

    // Leave the server-rendered final value in place.
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let start: number | null = null;

    const write = (n: number) => {
      digits.textContent = `${prefix}${n}${suffix}`;
    };

    const step = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      write(Math.round(easeOutExpo(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        write(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      write(to);
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>
      <span ref={digitsRef} aria-hidden="true">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}
