import type { Metadata } from "next";
import { CommercePage } from "../components/CommercePage";
import { CatalogProducts } from "../components/StoreData";
export const metadata: Metadata = { title: "Produits Parapharmacie & Skincare | Skin by Yas", description: "Découvrez tous les produits disponibles chez Skin by Yas : skincare, soins cheveux, soins corps et protections solaires." };
export default function Page(){ return <CommercePage eyebrow="BOUTIQUE EN LIGNE" title="Tous nos produits" intro="Explorez les produits disponibles chez Skin by Yas et découvrez notre sélection skincare, cheveux, corps et solaire."><CatalogProducts/></CommercePage>; }
