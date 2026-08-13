import type { Metadata } from "next";
import "./globals.css";
import "./chrome.css";
import "./cart.css";
import "./nails-agadir/nails.css";

export const metadata: Metadata = {
  title: "Skin by Yas Agadir | Parapharmacie, Skincare & Nails",
  description: "Découvrez Skin by Yas à Agadir : produits skincare, soins cheveux, soins corps, protections solaires et espace nails.",
  icons: { icon: "/brand/logo.jpg" },
  metadataBase: new URL("https://skin-by-yas-agadir.bawlamarwan09.chatgpt.site"),
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
