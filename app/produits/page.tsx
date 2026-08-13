import type { Metadata } from "next";
import { CommerceFooter, CommerceHeader } from "../components/CommercePage";
import { ShopCatalog } from "../components/StoreData";
export const metadata: Metadata = { title: "Produits Parapharmacie & Skincare | Skin by Yas", description: "Découvrez tous les produits disponibles chez Skin by Yas : skincare, soins cheveux, soins corps et protections solaires." };
export default function Page(){return <div className="public-page shop-catalog-page"><CommerceHeader/><main><section className="catalog-hero"><p className="kicker">BOUTIQUE EN LIGNE</p><h1>Tous nos produits</h1><p>Découvrez notre sélection skincare, cheveux, corps et solaire, choisie avec soin chez Skin by Yas.</p></section><ShopCatalog/></main><CommerceFooter/></div>}
