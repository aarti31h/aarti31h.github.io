import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { projects, site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: project.flagship ? 0.9 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/notes/${article.slug}/`,
      lastModified: new Date(article.published),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
