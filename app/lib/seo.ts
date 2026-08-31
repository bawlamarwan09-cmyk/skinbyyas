import type { Metadata } from "next";
import { absolutePublicUrl, canonicalUrl } from "./site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og.png",
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absolutePublicUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: "Skin by Yas",
      locale: "fr_MA",
      ...(imageUrl ? { images: [{ url: imageUrl, alt: title }] } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export function missingPageMetadata(kind: string): Metadata {
  return {
    title: `${kind} introuvable | Skin by Yas`,
    robots: { index: false, follow: false },
  };
}
