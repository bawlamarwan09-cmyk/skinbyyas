import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { JsonLd } from "../../components/JsonLd";
import { BrandPage } from "../../components/StoreData";
import { getBrand, getProducts, optional } from "../../lib/api";
import { createPageMetadata, missingPageMetadata } from "../../lib/seo";
import { canonicalUrl } from "../../lib/site";

type BrandPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) return missingPageMetadata("Marque");
  return createPageMetadata({
    title: brand.seoTitle || `${brand.name} | Produits disponibles | Skin by Yas`,
    description: brand.seoDescription || brand.description || `Découvrez les produits ${brand.name} actuellement publiés chez Skin by Yas.`,
    path: `/marques/${brand.slug}`,
    image: brand.logo,
  });
}

export default async function Page({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();
  const products = await optional(getProducts(`brand=${encodeURIComponent(brand.slug)}`));
  const url = canonicalUrl(`/marques/${brand.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Marques", item: canonicalUrl("/marques") },
      { "@type": "ListItem", position: 3, name: brand.name, item: url },
    ],
  };
  return <div className="public-page">
    <JsonLd data={breadcrumbSchema}/>
    <CommerceHeader/>
    <main><BrandPage slug={slug} initialData={brand} initialProducts={products}/></main>
    <CommerceFooter/>
  </div>;
}
