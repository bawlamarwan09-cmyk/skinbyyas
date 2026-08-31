import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { JsonLd } from "../../components/JsonLd";
import { ArticleDetail } from "../../components/StoreData";
import { getArticle, getBrands, optional } from "../../lib/api";
import { createPageMetadata, missingPageMetadata } from "../../lib/seo";
import { absolutePublicUrl, BUSINESS, canonicalUrl } from "../../lib/site";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return missingPageMetadata("Article");

  return createPageMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || article.title,
    path: `/conseils/${article.slug}`,
    image: article.coverImage,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function Page({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, brands] = await Promise.all([getArticle(slug), optional(getBrands())]);
  if (!article) notFound();

  const articleText = `${article.title} ${article.excerpt || ""} ${article.content}`.toLocaleLowerCase("fr");
  const matchingBrand = brands?.find((brand) => articleText.includes(brand.name.toLocaleLowerCase("fr")));
  const categoryLink = article.category === "SOLAIRES"
    ? { href: "/solaires", label: "Découvrir les protections solaires" }
    : article.category === "CHEVEUX"
      ? { href: "/soins-cheveux", label: "Voir les soins cheveux" }
      : article.category === "NAILS"
        ? { href: "/nails-agadir", label: "Découvrir l’espace Nails à Agadir" }
        : { href: "/skincare", label: "Explorer les produits skincare" };
  const relatedLinks = [
    categoryLink,
    ...(matchingBrand ? [{ href: `/marques/${matchingBrand.slug}`, label: `Voir la marque ${matchingBrand.name}` }] : []),
    { href: "/conseils", label: "Lire les autres conseils Skin by Yas" },
  ];

  const url = canonicalUrl(`/conseils/${article.slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.seoDescription || article.excerpt || article.title,
    ...(article.coverImage ? { image: [absolutePublicUrl(article.coverImage)] } : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: canonicalUrl(BUSINESS.logoPath) },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Conseils", item: canonicalUrl("/conseils") },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return <div className="public-page">
    <JsonLd data={[articleSchema, breadcrumbSchema]}/>
    <CommerceHeader/>
    <main><section className="inner-content article-page"><ArticleDetail slug={slug} initialData={article} relatedLinks={relatedLinks}/></section></main>
    <CommerceFooter/>
  </div>;
}
