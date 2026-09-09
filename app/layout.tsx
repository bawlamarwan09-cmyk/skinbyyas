import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./chrome.css";
import "./cart.css";
import "./nails-agadir/nails.css";
import { JsonLd } from "./components/JsonLd";
import { BUSINESS, canonicalUrl, SITE_URL } from "./lib/site";

const GOOGLE_ANALYTICS_ID = "G-M7K2RB3S9R";

export const metadata: Metadata = {
  title: "Skin by Yas Agadir | Parapharmacie, Skincare & Nails",
  description: "Découvrez Skin by Yas à Agadir : produits skincare, soins cheveux, soins corps, protections solaires et espace nails.",
  icons: { icon: "/brand/logo.jpg" },
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  verification: {
    google: "tuSzbcENLtvpSB8-KiATHfe7OlgCOcOlmt09uSM1awk",
  },
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

  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <JsonLd data={websiteSchema} />
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
