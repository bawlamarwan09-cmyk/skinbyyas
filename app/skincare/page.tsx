import { CategoryCatalogPage } from "../components/CategoryCatalogPage";
import { getProducts, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Skincare à Agadir | Produits Skincare | Skin by Yas",
  description: "Découvrez les produits skincare disponibles chez Skin by Yas à Agadir et trouvez les soins adaptés à votre routine.",
  path: "/skincare",
});

export default async function Page(){
  const initialData = await optional(getProducts());
  return <CategoryCatalogPage
    title="Produits Skincare à Agadir"
    intro="Découvrez la sélection skincare de Skin by Yas et composez votre routine selon vos besoins et vos préférences."
    category="skincare"
    initialData={initialData}
    guideTitle="Construire une routine skincare adaptée"
    guide={[
      "Une routine simple commence par des produits choisis selon les besoins et les préférences de votre peau. Cette page réunit uniquement les références skincare actuellement publiées par Skin by Yas.",
      "Consultez nos conseils pour mieux comprendre les différentes étapes d’une routine, puis ouvrez la fiche d’un produit pour vérifier ses informations et sa disponibilité.",
    ]}
    relatedLinks={[
      { href: "/conseils/meilleur-soin-visage-peau-grasse", label: "Conseils pour une peau grasse" },
      { href: "/conseils/choisir-creme-selon-type-peau", label: "Choisir une crème selon son type de peau" },
      { href: "/marques", label: "Découvrir nos marques" },
    ]}
    faq={[
      { question: "Comment choisir un produit skincare ?", answer: "Commencez par identifier les besoins de votre peau et l’étape de routine recherchée. Les fiches produits présentent les informations disponibles pour vous aider à comparer." },
      { question: "Les produits affichés sont-ils disponibles chez Skin by Yas ?", answer: "Le catalogue affiche les références actuellement publiées par Skin by Yas. Ouvrez la fiche du produit pour consulter les informations de disponibilité affichées." },
    ]}
  />;
}
