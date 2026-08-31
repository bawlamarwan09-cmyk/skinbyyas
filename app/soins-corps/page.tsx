import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
import { getProducts, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Soins Corps à Agadir | Skin by Yas",
  description: "Découvrez la sélection de soins corps disponible chez Skin by Yas à Agadir et commandez vos produits en ligne.",
  path: "/soins-corps",
});

export default async function Page(){
  const initialData = await optional(getProducts());
  return <CategoryCatalogPage
    title="Soins Corps à Agadir"
    intro="Explorez notre sélection de produits pour les soins du corps disponibles chez Skin by Yas."
    category="soins-corps"
    initialData={initialData}
    guideTitle="Composer une routine de soins corps"
    guide={[
      "Les soins corps s’intègrent dans une routine régulière choisie selon vos préférences. Vous trouverez ici uniquement les références actuellement publiées par Skin by Yas.",
      "Consultez chaque fiche pour comparer les informations du produit et vérifier sa disponibilité affichée.",
    ]}
    relatedLinks={[
      { href: "/produits", label: "Voir tout le catalogue" },
      { href: "/conseils", label: "Découvrir nos conseils" },
      { href: "/parapharmacie-agadir", label: "En savoir plus sur Skin by Yas" },
    ]}
    faq={[
      { question: "Quels soins corps sont présentés sur cette page ?", answer: "Cette page affiche automatiquement les produits actifs rattachés à la catégorie soins corps dans le catalogue Skin by Yas." },
      { question: "Comment consulter les détails d’un produit ?", answer: "Sélectionnez une référence pour ouvrir sa fiche et consulter les informations actuellement publiées." },
    ]}
  />;
}
