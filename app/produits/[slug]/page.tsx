import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { JsonLd } from "../../components/JsonLd";
import { ProductDetail } from "../../components/StoreData";
import { getArticles, getProduct, getProducts, optional } from "../../lib/api";
import { createPageMetadata, missingPageMetadata } from "../../lib/seo";
import { absolutePublicUrl, BUSINESS, canonicalUrl, categoryRoute } from "../../lib/site";

type ProductPageProps = { params: Promise<{ slug: string }> };

function productDescription(product: Awaited<ReturnType<typeof getProduct>>) {
  if (!product) return "";
  return (
    product.seoDescription ||
    product.description?.split(/\n\n|\r?\n/).find(Boolean) ||
    `Découvrez ${product.name}, son prix et sa disponibilité chez Skin by Yas.`
  ).slice(0, 320);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return missingPageMetadata("Produit");

  const title = product.seoTitle || `${product.name} | Prix au Maroc | Skin by Yas`;
  return createPageMetadata({
    title,
    description: productDescription(product),
    path: `/produits/${product.slug}`,
    image: product.images?.[0]?.url,
  });
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [related, articles] = await Promise.all([
    optional(getProducts(`category=${encodeURIComponent(product.category.slug)}`)),
    optional(getArticles()),
  ]);
  const productTopic = `${product.name} ${product.brand?.name || ""} ${product.category.name}`.toLocaleLowerCase("fr");
  const relevantAdvice = (articles?.data || [])
    .filter((article) => {
      const articleTopic = `${article.title} ${article.excerpt || ""}`.toLocaleLowerCase("fr");
      if (product.category.slug === "solaires") return article.category === "SOLAIRES";
      if (product.category.slug === "soins-cheveux") return article.category === "CHEVEUX";
      return article.category === "SKINCARE" || (product.brand?.name && articleTopic.includes(product.brand.name.toLocaleLowerCase("fr"))) || productTopic.includes(article.title.toLocaleLowerCase("fr"));
    })
    .slice(0, 3);
  const url = canonicalUrl(`/produits/${product.slug}`);
  const categoryPath = categoryRoute(product.category.slug);
  const images = product.images.map((image) => absolutePublicUrl(image.url)).filter(Boolean);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description || productDescription(product),
    ...(images.length ? { image: images } : {}),
    ...(product.brand?.name ? { brand: { "@type": "Brand", name: product.brand.name } } : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    url,
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "MAD",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url,
      seller: { "@type": "Organization", name: BUSINESS.name },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: product.category.name, item: canonicalUrl(categoryPath) },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  return <div className="public-page">
    <JsonLd data={[productSchema, breadcrumbSchema]}/>
    <CommerceHeader/>
    <main><section className="inner-content product-page"><ProductDetail slug={slug} initialData={product} initialRelated={related} initialAdvice={relevantAdvice}/></section></main>
    <CommerceFooter/>
  </div>;
}
