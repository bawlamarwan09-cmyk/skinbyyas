import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
import { getProducts, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Soins Cheveux à Agadir | Skin by Yas",
  description: "Découvrez les produits de soins cheveux disponibles chez Skin by Yas à Agadir et achetez vos produits en ligne.",
  path: "/soins-cheveux",
});

export default async function Page(){
  const initialData = await optional(getProducts());
  return <CategoryCatalogPage
    title="Soins Cheveux à Agadir"
    intro="Découvrez notre sélection de produits dédiés aux soins des cheveux disponibles chez Skin by Yas."
    category="soins-cheveux"
    initialData={initialData}
    guideTitle="Choisir ses soins cheveux"
    guide={[
      "Le choix d’un soin cheveux dépend de votre routine et du résultat recherché. Cette sélection présente les références actuellement publiées dans le catalogue Skin by Yas.",
      "Les fiches produits permettent de consulter les informations disponibles avant de faire votre choix.",
    ]}
    relatedLinks={[
      { href: "/produits", label: "Voir tous les produits" },
      { href: "/conseils", label: "Lire les conseils Skin by Yas" },
      { href: "/marques", label: "Explorer les marques" },
    ]}
    faq={[
      { question: "Comment voir les soins cheveux disponibles ?", answer: "Les références actuellement publiées apparaissent directement dans cette page. Leur fiche détaille les informations disponibles." },
      { question: "Puis-je consulter d’autres conseils avant de choisir ?", answer: "Oui. La rubrique Conseils Skin by Yas rassemble les guides et routines actuellement publiés." },
    ]}
  />;
}
