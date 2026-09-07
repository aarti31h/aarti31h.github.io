"use client";

import { useEffect } from "react";

/**
 * Marks the document as hydrated.
 *
 * The inline bootstrap script in the layout starts a watchdog: if this flag
 * has not appeared within a few seconds it assumes the client bundle failed
 * and drops `data-js`, which makes every scroll-revealed element visible
 * again. This component is how a healthy page cancels that fallback.
 */
export default function HydrationFlag() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "1";
  }, []);

  return null;
}
