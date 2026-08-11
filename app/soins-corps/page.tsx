import type { Metadata } from "next";
import { CommercePage } from "../components/CommercePage";
import { CatalogProducts } from "../components/StoreData";
export const metadata: Metadata = { title: "Soins Corps à Agadir | Skin by Yas", description: "Découvrez la sélection de soins corps disponible chez Skin by Yas à Agadir et commandez vos produits en ligne." };
export default function Page(){ return <CommercePage eyebrow="SKIN BY YAS — AGADIR" title="Soins Corps à Agadir" intro="Explorez notre sélection de produits pour les soins du corps disponibles chez Skin by Yas."><CatalogProducts category="soins-corps"/></CommercePage>; }
