"use client";

import { useEffect, useRef, useState } from "react";
import { HomeArticles, HomeBrands, HomeProducts } from "./components/StoreData";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const categories = [
  { name: "Skincare", href: "/skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins cheveux", href: "/soins-cheveux", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins corps", href: "/soins-corps", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=88" },
  { name: "Protection solaire", href: "/solaires", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=88" },
];

function OpeningAnimation(){
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const removalTimer = useRef<number | null>(null);

  function finish() {
    if (leaving) return;
    sessionStorage.setItem("sby_intro_seen", "1");
    setLeaving(true);
    document.body.style.overflow = "";
    removalTimer.current = window.setTimeout(() => setVisible(false), 650);
  }

  useEffect(() => {
    if (sessionStorage.getItem("sby_intro_seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      sessionStorage.setItem("sby_intro_seen", "1");
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(finish, 4350);
    return () => {
      window.clearTimeout(timer);
      if (removalTimer.current) window.clearTimeout(removalTimer.current);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return <div className={`opening-animation${leaving ? " leaving" : ""}`} aria-label="Introduction Skin by Yas">
    <div className="opening-scene opening-brand-scene">
      <div className="opening-brand-mark">
        <img src="/brand/logo.jpg" alt="Skin by Yas" />
        <p>Parapharmacie &amp; Skincare<span>Agadir</span></p>
      </div>
    </div>
    <div className="opening-scene opening-storefront-scene">
      <img src="/brand/intro-storefront.jpg" alt="Façade de la boutique Skin by Yas à Agadir" fetchPriority="high" />
      <span aria-hidden="true" />
    </div>
    <div className="opening-scene opening-interior-scene">
      <img src="/brand/intro-interior.jpg" alt="Accueil et rayons skincare de la boutique Skin by Yas" fetchPriority="high" />
      <span aria-hidden="true" />
    </div>
    <button type="button" onClick={finish} aria-label="Passer l’introduction">Passer</button>
  </div>;
}

export default function HomePage() {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Skin by Yas",
    url: "https://skin-by-yas-agadir.bawlamarwan09.chatgpt.site/",
    image: "https://skin-by-yas-agadir.bawlamarwan09.chatgpt.site/brand/storefront.png",
    description: "Parapharmacie, skincare et beauté à Agadir.",
    areaServed: "Agadir",
  };

  return <div className="shop-home">
    <OpeningAnimation/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(storeSchema)}} />
    <SiteHeader />

    <main>
      <section className="shop-hero">
        <div className="shop-hero-copy"><h1><span className="shop-hero-label">PARAPHARMACIE &amp; SKINCARE À AGADIR</span><span className="sr-only"> — </span><span className="shop-hero-title">Votre peau,<br/><em>en mieux.</em></span></h1><p className="shop-lead">Parapharmacie, skincare &amp; beauté à Agadir.</p><p className="shop-support">Découvrez nos produits skincare à Agadir, cosmétiques, soins cheveux, soins corps et protections solaires.</p><div className="shop-ctas"><a href="/produits" className="shop-button primary">Découvrir les produits beauté <span>↗</span></a><a href="#shop-categories" className="shop-button secondary">Voir nos catégories</a></div></div>
        <div className="shop-hero-image"><img src="/brand/intro-interior.jpg" alt="Accueil et rayons skincare de la boutique Skin by Yas à Agadir"/></div>
      </section>

    <section className="shop-section shop-categories" id="shop-categories">
      <div className="shop-section-head"><div><p className="shop-eyebrow">SHOP</p><h2>Achetez par catégorie</h2></div></div>
      <div className="shop-category-grid">{categories.map(category => <a href={category.href} className="shop-category" key={category.href}><div><img src={category.image} alt={`${category.name} disponibles chez Skin by Yas à Agadir`}/></div><h3><span>{category.name}</span><b aria-hidden="true">↗</b></h3></a>)}</div>
    </section>

    <HomeProducts />

    <section className="shop-editorial">
      <div className="shop-editorial-image"><div className="brand-art"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/></div></div>
      <div className="shop-editorial-copy"><p className="shop-eyebrow">SKINCARE — SELFCARE — BEAUTY</p><h2>Nos essentiels<br/><span>skincare</span></h2><p>Parcourez notre sélection de produits skincare disponible à Agadir.</p><a href="/skincare" className="shop-button dark">Découvrir le skincare <span>↗</span></a></div>
    </section>

    <HomeBrands />

    <section className="shop-section shop-nails">
      <div className="shop-nails-panel"><p className="shop-eyebrow">SKIN BY YAS NAILS</p><h2>Votre espace Nails<br/>à Agadir</h2><p>Découvrez l’espace Nails de Skin by Yas et consultez les prestations actuellement disponibles.</p><a href="/nails-agadir" className="shop-button dark">Découvrir l’espace <span>↗</span></a></div>
    </section>

    <HomeArticles />

    <section className="shop-store"><div><p className="shop-eyebrow">AGADIR, MAROC</p><h2>Retrouvez Skin by Yas à Agadir</h2><p>Parapharmacie, skincare et Nails réunis dans l’univers Skin by Yas.</p><a href="/parapharmacie-agadir" className="shop-button secondary">En savoir plus <span>↗</span></a></div></section>
    </main>

    <SiteFooter />
  </div>;
}
