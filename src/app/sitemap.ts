import type { MetadataRoute } from "next";
import { DEPARTMENTS } from "@/lib/data/departments";
import { getProductsByDepartment } from "@/lib/shopify";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ingefrancois.com";

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/new", priority: 0.8, changeFrequency: "daily" },
  { path: "/concierge", priority: 0.6, changeFrequency: "monthly" },
  { path: "/private-clientele", priority: 0.6, changeFrequency: "monthly" },
  { path: "/the-house", priority: 0.5, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const departmentEntries: MetadataRoute.Sitemap = DEPARTMENTS.map((dept) => ({
    url: `${siteUrl}/${dept.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productsByDepartment = await Promise.all(DEPARTMENTS.map((dept) => getProductsByDepartment(dept.slug)));
  const seenHandles = new Set<string>();
  const productEntries: MetadataRoute.Sitemap = [];
  for (const products of productsByDepartment) {
    for (const product of products) {
      if (seenHandles.has(product.handle)) continue;
      seenHandles.add(product.handle);
      productEntries.push({
        url: `${siteUrl}/product/${product.handle}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return [...staticEntries, ...departmentEntries, ...productEntries];
}
