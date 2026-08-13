import type { Metadata } from "next";
import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
export const metadata: Metadata = { title: "Skincare à Agadir | Produits Skincare | Skin by Yas", description: "Découvrez les produits skincare disponibles chez Skin by Yas à Agadir et trouvez les soins adaptés à votre routine." };
export default function Page(){return <CategoryCatalogPage title="Produits Skincare à Agadir" intro="Découvrez la sélection skincare de Skin by Yas et composez votre routine selon vos besoins et vos préférences." category="skincare"/>}
