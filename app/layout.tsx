import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skin by Yas — Parapharmacie, Skincare & Nails à Agadir",
  description: "Votre peau, mais en mieux. Découvrez la sélection skincare, beauté et nails de Skin by Yas à Agadir.",
  icons: { icon: "/brand/logo.jpg" },
  metadataBase: new URL("https://skin-by-yas.sites.openai.com"),
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
  return <html lang="fr"><body>{children}</body></html>;
}
