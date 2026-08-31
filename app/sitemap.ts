import type { MetadataRoute } from "next";
import { getArticles, getBrands, getProducts, optional } from "./lib/api";
import { canonicalUrl } from "./lib/site";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/produits", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/skincare", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/soins-cheveux", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/soins-corps", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/solaires", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/marques", changeFrequency: "weekly" as const, priority: 0.75 },
  { path: "/parapharmacie-agadir", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/nails-agadir", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/conseils", changeFrequency: "weekly" as const, priority: 0.8 },
];

function reliableLastModified(value?: string | null) {
  if (!value || Number.isNaN(Date.parse(value))) return {};
  return { lastModified: value };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles, brands] = await Promise.all([
    optional(getProducts()),
    optional(getArticles()),
    optional(getBrands()),
  ]);

  return [
    ...staticRoutes.map(({ path, ...entry }) => ({ url: canonicalUrl(path), ...entry })),
    ...(products?.data || []).map((product) => ({
      url: canonicalUrl(`/produits/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...reliableLastModified(product.updatedAt),
    })),
    ...(brands || []).map((brand) => ({
      url: canonicalUrl(`/marques/${brand.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.65,
      ...reliableLastModified(brand.updatedAt),
    })),
    ...(articles?.data || []).map((article) => ({
      url: canonicalUrl(`/conseils/${article.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...reliableLastModified(article.updatedAt || article.publishedAt),
    })),
  ];
}
