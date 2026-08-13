import type { Metadata } from "next";
import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
export const metadata: Metadata = { title: "Soins Cheveux à Agadir | Skin by Yas", description: "Découvrez les produits de soins cheveux disponibles chez Skin by Yas à Agadir et achetez vos produits en ligne." };
export default function Page(){return <CategoryCatalogPage title="Soins Cheveux à Agadir" intro="Découvrez notre sélection de produits dédiés aux soins des cheveux disponibles chez Skin by Yas." category="soins-cheveux"/>}
