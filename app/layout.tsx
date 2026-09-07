import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HydrationFlag from "@/components/HydrationFlag";
import { description, site } from "@/lib/content";
import "./globals.css";

/* Self-hosted at build time by next/font — no request to Google at runtime,
   and no layout shift because the metrics are known ahead of time. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-face",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Aarti Hariharno",
    "Full Stack Software Engineer",
    ".NET Developer",
    "ASP.NET Core Developer",
    "Angular Developer",
    ".NET Angular Developer",
    "Microservices Developer",
    "C# Developer",
    "Full Stack Developer India",
    "Software Engineer Jabalpur",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.title}`,
    title: `${site.name} — ${site.title}`,
    description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0e" },
  ],
};

/** Schema.org graph describing the person and the site itself. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.title,
      description,
      url: site.url,
      image: `${site.url}/og.png`,
      email: `mailto:${site.email}`,
      sameAs: [site.linkedin, site.github],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jabalpur",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Organization",
        name: site.employer,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Gyan Ganga College of Technologies, Jabalpur",
      },
      knowsAbout: [
        "ASP.NET Core",
        ".NET 8",
        "C#",
        "Angular",
        "TypeScript",
        "Microservices",
        "CQRS",
        "MediatR",
        "RabbitMQ",
        "Azure Service Bus",
        "Entity Framework Core",
        "SQL Server",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Microsoft Azure",
        "AWS",
        "OAuth2",
        "OpenID Connect",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — ${site.title}`,
      description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Runs before first paint, as the first thing in the body.
            Opts the page into the scroll-reveal animation, then starts a
            watchdog: if React has not hydrated within 4s the flag is dropped
            and all content becomes visible, so a failed bundle degrades to a
            static page rather than a blank one. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var d=document.documentElement;d.dataset.js="on";' +
              'try{var s=localStorage.getItem("theme");' +
              'd.dataset.theme=(s==="light"||s==="dark")?s:' +
              '(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");' +
              '}catch(e){d.dataset.theme="dark";}' +
              'setTimeout(function(){if(!d.dataset.hydrated)d.removeAttribute("data-js")},4000)})()',
          }}
        />
        <HydrationFlag />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        {/* Decorative background layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-70"
        />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-drift" />

        <Nav />

        <main id="main">{children}</main>

        <Footer />

        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
