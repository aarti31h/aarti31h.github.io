import type { Metadata } from "next";
import MagneticLink from "@/components/MagneticLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-32 lg:px-8">
      <p className="kicker">404</p>
      <h1 className="display mt-5 text-[clamp(2rem,1.4rem+2.6vw,3rem)]">
        This page does not exist.
      </h1>
      <p className="prose-body mt-6 max-w-md text-pretty">
        The link may be out of date. Everything on this site is reachable from the
        home page.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <MagneticLink href="/">Back to home</MagneticLink>
        <MagneticLink href="/#work" variant="ghost">
          View my work
        </MagneticLink>
      </div>
    </section>
  );
}
