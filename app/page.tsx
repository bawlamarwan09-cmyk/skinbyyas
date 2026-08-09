"use client";

import { useState } from "react";

const categories = [
  { name: "Skincare", href: "/skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins cheveux", href: "/soins-cheveux", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=88" },
  { name: "Soins corps", href: "/soins-corps", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=88" },
  { name: "Protection solaire", href: "/solaires", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=88" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return <main className="shop-home">
    <header className="shop-header">
      <a href="/" className="shop-logo" aria-label="Skin by Yas — accueil"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /></a>
      <nav className={menuOpen ? "shop-nav open" : "shop-nav"} aria-label="Navigation principale">
        <a href="/">Accueil</a><a href="/produits">Boutique</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a>
      </nav>
      <div className="shop-actions"><button onClick={() => setSearchOpen(true)}>Recherche</button><a href="/produits">Panier <span>0</span></a><button className="shop-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu"><i></i><i></i></button></div>
    </header>

    {searchOpen && <div className="search-panel" role="dialog" aria-modal="true" aria-label="Recherche de produits"><button className="search-close" onClick={() => setSearchOpen(false)}>Fermer ×</button><form action="/produits" className="search-form"><label htmlFor="search">Que recherchez-vous ?</label><div><input id="search" name="q" autoFocus placeholder="Rechercher dans la boutique"/><button type="submit">Rechercher ↗</button></div></form></div>}

    <section className="shop-hero">
      <div className="shop-hero-copy"><p className="shop-eyebrow">SKIN BY YAS — AGADIR</p><h1>Votre peau,<br/><em>en mieux.</em></h1><p className="shop-lead">Parapharmacie, skincare &amp; beauté à Agadir.</p><p className="shop-support">Explorez nos univers visage, cheveux, corps et protection solaire.</p><div className="shop-ctas"><a href="/produits" className="shop-button primary">Découvrir la boutique <span>↗</span></a><a href="#shop-categories" className="shop-button secondary">Voir nos catégories</a></div></div>
      <div className="shop-hero-image"><img src="/brand/storefront.png" alt="Boutique Skin by Yas à Agadir"/></div>
    </section>

    <section className="shop-section shop-categories" id="shop-categories">
      <div className="shop-section-head"><div><p className="shop-eyebrow">SHOP</p><h2>Achetez par catégorie</h2></div></div>
      <div className="shop-category-grid">{categories.map(category => <a href={category.href} className="shop-category" key={category.href}><div><img src={category.image} alt=""/></div><p><span>{category.name}</span><b>↗</b></p></a>)}</div>
    </section>

    <section className="shop-editorial">
      <div className="shop-editorial-image"><div className="brand-art"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/></div></div>
      <div className="shop-editorial-copy"><p className="shop-eyebrow">SKINCARE — SELFCARE — BEAUTY</p><h2>YOUR SKIN<br/><span>BUT BETTER</span></h2><p>Parcourez notre sélection skincare disponible en ligne.</p><a href="/skincare" className="shop-button dark">Découvrir le skincare <span>↗</span></a></div>
    </section>

    <section className="shop-section shop-nails">
      <div className="shop-nails-panel"><p className="shop-eyebrow">SKIN BY YAS NAILS</p><h2>Votre espace Nails<br/>à Agadir</h2><p>Découvrez l’espace Nails de Skin by Yas et consultez les prestations actuellement disponibles.</p><a href="/nails-agadir" className="shop-button dark">Découvrir l’espace <span>↗</span></a></div>
    </section>

    <section className="shop-store"><div><p className="shop-eyebrow">AGADIR, MAROC</p><h2>Retrouvez Skin by Yas à Agadir</h2><p>Parapharmacie, skincare et Nails réunis dans l’univers Skin by Yas.</p><a href="/parapharmacie-agadir" className="shop-button secondary">En savoir plus <span>↗</span></a></div></section>

    <footer className="shop-footer"><div className="shop-footer-brand"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/><p>Parapharmacie, skincare &amp; beauté à Agadir.</p></div><div><h3>Boutique</h3><a href="/produits">Produits</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a></div><div><h3>Skin by Yas</h3><a href="/parapharmacie-agadir">À propos</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a></div><div><h3>Localisation</h3><p>Agadir, Maroc</p></div><small>© 2026 SKIN BY YAS</small></footer>
  </main>;
}
