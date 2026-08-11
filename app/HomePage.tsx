"use client";

import { useEffect, useState } from "react";
import { HomeArticles, HomeBrands, HomeProducts } from "./components/StoreData";

const categories = [
  { name: "Skincare", href: "/skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins cheveux", href: "/soins-cheveux", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins corps", href: "/soins-corps", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=88" },
  { name: "Protection solaire", href: "/solaires", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=88" },
];

function OpeningAnimation(){
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  function finish() {
    sessionStorage.setItem("sby_intro_seen", "1");
    setLeaving(true);
    document.body.style.overflow = "";
    window.setTimeout(() => setVisible(false), 700);
  }

  useEffect(() => {
    if (sessionStorage.getItem("sby_intro_seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      sessionStorage.setItem("sby_intro_seen", "1");
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(finish, 4200);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return <div className={`opening-animation${leaving ? " leaving" : ""}`} aria-label="Bienvenue chez Skin by Yas">
    <div className="opening-logo"><img src="/brand/logo.jpg" alt="Skin by Yasmine — Agadir" /></div>
    <div className="opening-store"><img src="/brand/storefront.png" alt="Boutique Skin by Yas à Agadir" /><div></div><span>SKINCARE · SELFCARE · BEAUTY</span></div>
    <button type="button" onClick={finish}>Passer</button>
  </div>;
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
    <header className="shop-header">
      <a href="/" className="shop-logo" aria-label="Skin by Yas — accueil"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /></a>
      <nav className={menuOpen ? "shop-nav open" : "shop-nav"} aria-label="Navigation principale">
        <a href="/">Accueil</a><a href="/produits">Boutique</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a>
      </nav>
      <div className="shop-actions"><button onClick={() => setSearchOpen(true)}>Recherche</button><a href="/produits">Panier <span>0</span></a><button className="shop-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu"><i></i><i></i></button></div>
    </header>

    {searchOpen && <div className="search-panel" role="dialog" aria-modal="true" aria-label="Recherche de produits"><button className="search-close" onClick={() => setSearchOpen(false)}>Fermer ×</button><form action="/produits" className="search-form"><label htmlFor="search">Que recherchez-vous ?</label><div><input id="search" name="q" autoFocus placeholder="Rechercher dans la boutique"/><button type="submit">Rechercher ↗</button></div></form></div>}

    <main>
      <section className="shop-hero">
        <div className="shop-hero-copy"><h1><span className="shop-hero-label">PARAPHARMACIE &amp; SKINCARE À AGADIR</span><span className="sr-only"> — </span><span className="shop-hero-title">Votre peau,<br/><em>en mieux.</em></span></h1><p className="shop-lead">Parapharmacie, skincare &amp; beauté à Agadir.</p><p className="shop-support">Découvrez nos produits skincare à Agadir, cosmétiques, soins cheveux, soins corps et protections solaires.</p><div className="shop-ctas"><a href="/produits" className="shop-button primary">Découvrir les produits beauté <span>↗</span></a><a href="#shop-categories" className="shop-button secondary">Voir nos catégories</a></div></div>
        <div className="shop-hero-image"><img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1800&q=90" alt="Sélection de produits skincare et cosmétiques Skin by Yas à Agadir"/></div>
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

    <footer className="shop-footer"><div className="shop-footer-brand"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/><p>Parapharmacie, skincare &amp; beauté à Agadir.</p></div><div><h3>Boutique</h3><a href="/produits">Produits</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a></div><div><h3>Skin by Yas</h3><a href="/parapharmacie-agadir">À propos</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a></div><div><h3>Localisation</h3><p>Agadir, Maroc</p></div><small>© 2026 SKIN BY YAS</small></footer>
  </div>;
}
