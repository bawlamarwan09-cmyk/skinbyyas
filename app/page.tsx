import type { Metadata } from "next";
import { preload } from "react-dom";
import HomePage from "./HomePage";
import { getArticles, getBrands, getProducts, optional } from "./lib/api";
import { createPageMetadata } from "./lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Parapharmacie & Skincare à Agadir | Skin by Yas",
  description: "Découvrez Skin by Yas, parapharmacie et skincare à Agadir : produits skincare, cosmétiques, soins cheveux, protection solaire, beauté et espace Nails.",
  path: "/",
});

export default async function Page() {
  preload("/brand/intro-interior-hero.webp", { as: "image" });

  const [products, brands, articles] = await Promise.all([
    optional(getProducts()),
    optional(getBrands()),
    optional(getArticles()),
  ]);

  return <>
    <script dangerouslySetInnerHTML={{__html: `try{if(sessionStorage.getItem("sby_intro_seen")){document.documentElement.classList.add("sby-intro-seen")}}catch(e){}`}} />
    <HomePage initialProducts={products} initialBrands={brands} initialArticles={articles} />
  </>;
}
