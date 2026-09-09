import Image from "next/image";
import { OpeningAnimation } from "./components/OpeningAnimation";
import { HomeArticles, HomeBrands, HomeProducts } from "./components/StoreData";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import type { Article, Brand, Collection, Product } from "./lib/api";
import { BUSINESS, canonicalUrl } from "./lib/site";

const categories = [
  { name: "Skincare", description: "Soins visage", href: "/skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins cheveux", description: "Routines capillaires", href: "/soins-cheveux", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins corps", description: "Hydratation & douceur", href: "/soins-corps", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=88" },
  { name: "Protection solaire", description: "Soins SPF", href: "/solaires", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=88" },
];

export default function HomePage({
  initialProducts,
  initialBrands,
  initialArticles,
}: {
  initialProducts?: Collection<Product>;
  initialBrands?: Brand[];
  initialArticles?: Collection<Article>;
}) {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${canonicalUrl("/")}#store`,
    name: BUSINESS.name,
    url: canonicalUrl("/"),
    logo: canonicalUrl(BUSINESS.logoPath),
    image: canonicalUrl(BUSINESS.storefrontPath),
    description: "Parapharmacie, skincare et beauté à Agadir.",
    telephone: BUSINESS.telephone,
    hasMap: BUSINESS.mapsUrl,
    sameAs: [BUSINESS.instagramUrl],
    areaServed: { "@type": "City", name: BUSINESS.city },
  };

  return <div className="shop-home">
    <OpeningAnimation/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(storeSchema)}} />
    <SiteHeader />

    <main>
      <section className="shop-hero">
        <div className="shop-hero-copy"><h1><span className="shop-hero-label">PARAPHARMACIE &amp; SKINCARE À AGADIR</span><span className="sr-only"> — </span><span className="shop-hero-title">Votre peau,<br/><em>en mieux.</em></span></h1><p className="shop-lead">Parapharmacie, skincare &amp; beauté à Agadir.</p><p className="shop-support">Découvrez nos produits skincare à Agadir, cosmétiques, soins cheveux, soins corps et protections solaires.</p><div className="shop-ctas"><a href="/produits" className="shop-button primary">Découvrir les produits beauté <span>↗</span></a><a href="#shop-categories" className="shop-button secondary">Voir nos catégories</a></div></div>
        <div className="shop-hero-image"><img src="/brand/intro-interior-hero.webp" alt="Accueil et rayons skincare de la boutique Skin by Yas à Agadir" width="1350" height="2400" loading="eager" fetchPriority="high" decoding="async" /></div>
      </section>

    <section className="shop-section shop-categories" id="shop-categories">
      <div className="shop-section-head"><div><p className="shop-eyebrow">NOS UNIVERS</p><h2>Découvrez nos essentiels</h2><p className="category-section-intro">Des soins sélectionnés pour chaque besoin.</p></div></div>
      <div className="shop-category-grid">{categories.map((category,index) => <a href={category.href} className="shop-category" key={category.href}><article><Image src={category.image} alt={`${category.name} disponibles chez Skin by Yas à Agadir`} fill sizes="(max-width: 700px) 82vw, (max-width: 1024px) 50vw, 25vw"/><span className="category-overlay" aria-hidden="true"></span><span className="shop-category-number">0{index+1}</span><div className="shop-category-content"><span>SKIN BY YAS</span><h3>{category.name}</h3><p>{category.description}</p></div><span className="shop-category-arrow" aria-hidden="true">→</span></article></a>)}</div>
    </section>

    <HomeProducts initialData={initialProducts} />

    <section className="shop-editorial">
      <div className="shop-editorial-image"><div className="brand-art"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/></div></div>
      <div className="shop-editorial-copy"><p className="shop-eyebrow">SKINCARE — SELFCARE — BEAUTY</p><h2>Nos essentiels<br/><span>skincare</span></h2><p>Parcourez notre sélection de produits skincare disponible à Agadir.</p><a href="/skincare" className="shop-button dark">Découvrir le skincare <span>↗</span></a></div>
    </section>

    <HomeBrands initialData={initialBrands} />

    <section className="shop-section shop-nails">
      <div className="shop-nails-panel"><p className="shop-eyebrow">SKIN BY YAS NAILS</p><h2>Votre espace Nails<br/>à Agadir</h2><p>Découvrez l’espace Nails de Skin by Yas et consultez les prestations actuellement disponibles.</p><a href="/nails-agadir" className="shop-button dark">Découvrir l’espace <span>↗</span></a></div>
    </section>

    <HomeArticles initialData={initialArticles} />

    <section className="shop-store"><div className="shop-store-copy"><p className="shop-eyebrow">AGADIR, MAROC</p><h2>Retrouvez Skin by Yas à Agadir</h2><p>Parapharmacie, skincare et Nails réunis dans l’univers Skin by Yas.</p><a href="https://share.google/TN4FWEUdYyxXwBF4A" target="_blank" rel="noopener noreferrer" className="shop-button secondary">Ouvrir dans Google Maps <span>↗</span></a></div><div className="shop-store-map"><iframe src="https://www.google.com/maps?q=Skin%20by%20Yas%20Agadir&output=embed" title="Localisation de Skin by Yas à Agadir sur Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe></div></section>
    </main>

    <SiteFooter />
  </div>;
}
