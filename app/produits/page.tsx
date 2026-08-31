import type { Metadata } from "next";
import { CommerceFooter, CommerceHeader } from "../components/CommercePage";
import { ShopCatalog } from "../components/StoreData";
import { getProducts, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";
const baseMetadata = createPageMetadata({ title: "Produits Parapharmacie & Skincare | Skin by Yas", description: "Découvrez tous les produits disponibles chez Skin by Yas : skincare, soins cheveux, soins corps et protections solaires.", path: "/produits" });

type ProductsPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const parameters = await searchParams;
  return Object.values(parameters).some((value) => value !== undefined && value !== "")
    ? { ...baseMetadata, robots: { index: false, follow: true } }
    : baseMetadata;
}

export default async function Page({ searchParams }: ProductsPageProps){
  const [initialData, parameters] = await Promise.all([optional(getProducts()), searchParams]);
  const rawSearch = parameters.q;
  const initialSearch = Array.isArray(rawSearch) ? rawSearch[0] : rawSearch || "";
  return <div className="public-page shop-catalog-page"><CommerceHeader/><main><section className="catalog-hero"><p className="kicker">BOUTIQUE EN LIGNE</p><h1>Tous nos produits</h1><p>Découvrez notre sélection skincare, cheveux, corps et solaire, choisie avec soin chez Skin by Yas.</p></section><ShopCatalog initialData={initialData} initialSearch={initialSearch}/></main><CommerceFooter/></div>;
}
