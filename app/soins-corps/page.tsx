import type { Metadata } from "next";
import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
export const metadata: Metadata = { title: "Soins Corps à Agadir | Skin by Yas", description: "Découvrez la sélection de soins corps disponible chez Skin by Yas à Agadir et commandez vos produits en ligne." };
export default function Page(){return <CategoryCatalogPage title="Soins Corps à Agadir" intro="Explorez notre sélection de produits pour les soins du corps disponibles chez Skin by Yas." category="soins-corps"/>}
