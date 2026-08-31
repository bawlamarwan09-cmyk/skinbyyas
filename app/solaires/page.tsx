import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
import { getProducts, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Crèmes & Protections Solaires à Agadir | Skin by Yas",
  description: "Découvrez les protections solaires disponibles chez Skin by Yas à Agadir et trouvez votre produit solaire en ligne.",
  path: "/solaires",
});

export default async function Page(){
  const initialData = await optional(getProducts());
  return <CategoryCatalogPage
    title="Protections & Crèmes Solaires à Agadir"
    intro="Découvrez notre sélection de protections solaires disponibles chez Skin by Yas."
    category="solaires"
    initialData={initialData}
    guideTitle="Choisir sa protection solaire"
    guide={[
      "Le choix d’une protection solaire peut notamment tenir compte de sa texture et de la place qu’elle occupe dans votre routine. Cette page affiche les références solaires actuellement publiées par Skin by Yas.",
      "Notre guide dédié vous aide à comparer les critères utiles avant de consulter les fiches des produits disponibles.",
    ]}
    relatedLinks={[
      { href: "/conseils/quelle-creme-solaire-choisir-maroc", label: "Quelle crème solaire choisir au Maroc ?" },
      { href: "/skincare", label: "Découvrir les produits skincare" },
      { href: "/conseils", label: "Voir tous les conseils" },
    ]}
    faq={[
      { question: "Comment choisir une protection solaire ?", answer: "Comparez les informations présentes sur les fiches produits et consultez notre guide pour identifier les critères adaptés à votre routine et à vos préférences." },
      { question: "Où voir les protections solaires actuellement publiées ?", answer: "Les références actives rattachées à la catégorie solaires sont affichées automatiquement sur cette page." },
    ]}
  />;
}
