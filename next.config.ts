import type { NextConfig } from "next";

/**
 * Static export: the site is deployed to GitHub Pages as a user site
 * (https://aarti31h.github.io), so there is no Node server at runtime.
 * Everything must be prerendered at build time.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // No Image Optimization API on a static host.
    unoptimized: true,
  },
  // Fail the build on type errors rather than shipping them.
  // (Next 16 removed the `eslint` config key; linting runs via the ESLint CLI
  // as a separate `npm run lint` step, including in CI.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
