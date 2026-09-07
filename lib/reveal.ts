/**
 * One shared IntersectionObserver for every scroll-revealed element on the
 * page, rather than one observer per component.
 *
 * The site has ~80 revealed elements. Allocating an observer for each is
 * wasteful when they all want identical thresholds, and the browser can
 * batch callbacks from a single observer far more cheaply.
 */

let observer: IntersectionObserver | null = null;

function show(el: Element) {
  (el as HTMLElement).dataset.shown = "true";
}

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        // Reveal is one-way: stop watching once an element has appeared.
        obs.unobserve(entry.target);
      }
    },
    {
      // Trigger slightly before the element reaches the bottom edge so the
      // animation is already settling by the time it is comfortably read.
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    },
  );

  return observer;
}

/**
 * Start observing an element. Returns a cleanup function.
 * If IntersectionObserver is unavailable, the element is shown immediately
 * so content is never left invisible.
 */
export function observeReveal(el: Element): () => void {
  const obs = getObserver();

  if (!obs) {
    show(el);
    return () => {};
  }

  obs.observe(el);
  return () => obs.unobserve(el);
}

/** True when the user has asked the OS to minimise motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
