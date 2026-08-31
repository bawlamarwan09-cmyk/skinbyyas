export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://skinbyyas.com"
).replace(/\/$/, "");

export const BUSINESS = {
  name: "Skin by Yas",
  city: "Agadir",
  country: "Maroc",
  telephone: "+212 646-324208",
  whatsappUrl: "https://wa.me/212646324208",
  instagramUrl: "https://www.instagram.com/skinby_yas/",
  mapsUrl: "https://share.google/TN4FWEUdYyxXwBF4A",
  logoPath: "/brand/logo.png",
  storefrontPath: "/brand/storefront.png",
} as const;

const CATEGORY_ROUTES: Record<string, string> = {
  skincare: "/skincare",
  "soins-cheveux": "/soins-cheveux",
  "soins-corps": "/soins-corps",
  solaires: "/solaires",
};

export const INDEXABLE_CATEGORY_ROUTES = Object.values(CATEGORY_ROUTES);

export function canonicalUrl(path = "/") {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function absolutePublicUrl(value?: string | null) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return canonicalUrl(value);
}

export function categoryRoute(slug?: string | null) {
  return (slug && CATEGORY_ROUTES[slug]) || "/produits";
}
