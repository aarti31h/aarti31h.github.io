"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

/**
 * Copies the email address to the clipboard, with the state reset on a timer.
 * Falls back silently to doing nothing visible if the Clipboard API is
 * unavailable — the adjacent mailto: link is the real affordance.
 */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      /* Clipboard blocked or unsupported; the mailto link still works. */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-[12px] text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
      {copied ? "Copied" : "Copy address"}
      <span className="sr-only">{copied ? "" : ` — ${site.email}`}</span>
    </button>
  );
}
