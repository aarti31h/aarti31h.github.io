"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * The resolved theme lives on <html data-theme>, applied by the inline
 * bootstrap script before first paint. That attribute is external state
 * React does not own, so it is read through useSyncExternalStore rather
 * than mirrored into component state — which also keeps the server and
 * client renders consistent without a mounted flag.
 */

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** SSR and the pre-hydration markup both assume the no-JS default. */
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onChange: () => void): () => void {
  const root = document.documentElement;

  // Any change to data-theme — from this button or another tab — re-renders.
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  // Follow the OS while the visitor has not made an explicit choice.
  const query = matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return; // explicit choice wins
    } catch {
      /* storage blocked — fall through and follow the OS */
    }
    root.dataset.theme = query.matches ? "dark" : "light";
  };
  query.addEventListener("change", onSystemChange);

  // Keep other tabs in step when the preference is changed in one of them.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    if (e.newValue === "light" || e.newValue === "dark") {
      root.dataset.theme = e.newValue;
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    query.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark";
    const root = document.documentElement;

    // Ease the swap, but only for its duration — leaving the transition on
    // permanently would slow every hover state on the page.
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 300);

    root.dataset.theme = next;

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private mode or blocked storage: the choice just will not persist. */
    }
  };

  const label = `Switch to ${isDark ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      {isDark ? (
        // Sun — shown in dark mode, meaning "switch to light"
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
        </svg>
      ) : (
        // Moon — shown in light mode, meaning "switch to dark"
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8Z" />
        </svg>
      )}
    </button>
  );
}
