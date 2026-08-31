import type { Metadata } from "next";
import "./globals.css";
import "./chrome.css";
import "./cart.css";
import "./nails-agadir/nails.css";
import { JsonLd } from "./components/JsonLd";
import { BUSINESS, canonicalUrl, SITE_URL } from "./lib/site";

export const metadata: Metadata = {
  title: "Skin by Yas Agadir | Parapharmacie, Skincare & Nails",
  description: "Découvrez Skin by Yas à Agadir : produits skincare, soins cheveux, soins corps, protections solaires et espace nails.",
  icons: { icon: "/brand/logo.jpg" },
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Skin by Yas — Agadir",
    description: "Votre peau, mais en mieux.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Skin by Yas à Agadir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin by Yas — Agadir",
    description: "Votre peau, mais en mieux.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS.name,
    url: canonicalUrl("/"),
    inLanguage: "fr-MA",
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: canonicalUrl("/"),
      logo: canonicalUrl(BUSINESS.logoPath),
    },
  };

  return <html lang="fr" suppressHydrationWarning><body><JsonLd data={websiteSchema}/>{children}</body></html>;
}
