import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Parapharmacie & Skincare à Agadir | Skin by Yas",
  description: "Découvrez Skin by Yas, parapharmacie et skincare à Agadir : produits skincare, cosmétiques, soins cheveux, protection solaire, beauté et espace Nails.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Parapharmacie & Skincare à Agadir | Skin by Yas",
    description: "Produits skincare, cosmétiques, soins cheveux, protection solaire et espace Nails chez Skin by Yas à Agadir.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
