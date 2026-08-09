"use client";

import { useState } from "react";

const categories = [
  { name: "Skincare", description: "Découvrez notre sélection de produits skincare et trouvez les soins adaptés à votre routine.", cta: "Découvrir", href: "/skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1100&q=85" },
  { name: "Soins cheveux", description: "Découvrez les produits disponibles chez Skin by Yas pour compléter votre routine capillaire.", cta: "Voir les produits", href: "/soins-cheveux", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1100&q=85" },
  { name: "Soins corps", description: "Retrouvez notre sélection de produits dédiés aux soins du corps.", cta: "Découvrir", href: "/soins-corps", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1100&q=85" },
  { name: "Protection solaire", description: "Découvrez notre sélection de protections solaires disponibles chez Skin by Yas.", cta: "Voir les solaires", href: "/solaires", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1100&q=85" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Skin by Yas — accueil">
          <img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <a href="#categories" onClick={() => setMenuOpen(false)}>Nos soins</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Produits</a>
          <a href="#nails" onClick={() => setMenuOpen(false)}>Nails</a>
          <a href="#store" onClick={() => setMenuOpen(false)}>La boutique</a>
        </nav>
        <div className="header-actions">
          <button className="search-button" onClick={() => setSearchOpen(true)}>Recherche</button>
          <button className="cart" aria-label={`Panier, ${cartCount} articles`}>Panier <span>{cartCount}</span></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
            <i></i><i></i>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel" role="dialog" aria-modal="true" aria-label="Recherche de produits">
          <button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Fermer la recherche">Fermer ×</button>
          <form action="/produits" className="search-form">
            <label htmlFor="search">Que recherchez-vous ?</label>
            <div><input id="search" name="q" autoFocus placeholder="Sérum, solaire, hydratant…" /><button type="submit">Rechercher ↗</button></div>
          </form>
        </div>
      )}

      <section className="hero" id="top">
        <img src="/brand/storefront.png" alt="La boutique Skin by Yas à Agadir, éclairée le soir" />
        <div className="hero-wash"></div>
        <div className="hero-content">
          <p className="eyebrow">SKIN BY YAS — AGADIR</p>
          <h1>Skin by Yas —<br /><span>Parapharmacie, Skincare<br />&amp; Nails à Agadir</span></h1>
          <p className="hero-copy">Bienvenue chez Skin by Yas, votre univers parapharmacie, skincare et beauté à Agadir. Découvrez notre sélection de produits pour le visage, les cheveux, le corps et la protection solaire, directement en ligne.</p>
          <div className="hero-actions">
            <a href="/produits" className="button primary">Découvrir nos produits <span>↗</span></a>
            <a href="#categories" className="text-link">Voir nos catégories <span>↓</span></a>
          </div>
        </div>
        <p className="hero-note">Skincare · Selfcare · Beauty</p>
      </section>

      <section className="categories section" id="categories">
        <div className="section-heading">
          <p className="kicker">01 — Votre rituel</p>
          <h2>Découvrez<br /><em>nos catégories.</em></h2>
          <p>Skincare, soins cheveux, soins corps et protections solaires disponibles dans notre boutique en ligne.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a href={category.href} className={`category category-${index + 1}`} key={category.name}>
              <div className="category-image"><img src={category.image} alt="" /></div>
              <div className="category-label"><span>{category.name}</span><b>↗</b></div>
              <p className="category-description">{category.description} <strong>{category.cta}</strong></p>
            </a>
          ))}
        </div>
      </section>

      <section className="products section" id="products">
        <div className="products-top">
          <div><p className="kicker">02 — La boutique</p><h2>Nos<br /><em>produits.</em></h2></div>
          <a href="/produits" className="underlined">Voir toute la sélection <span>↗</span></a>
        </div>
        <div className="catalog-empty"><p>Aucun produit n’est actuellement publié dans le catalogue.</p><a href="/produits" className="button primary">Voir la boutique <span>↗</span></a></div>
      </section>

      <section className="manifesto">
        <div className="manifesto-photo"><img src="/brand/storefront.png" alt="Devanture Skin by Yas à Agadir" /></div>
        <div className="manifesto-copy">
          <p>SKINCARE — SELFCARE — BEAUTY</p>
          <h2>YOUR SKIN<br /><span>BUT BETTER</span></h2>
          <div><p>Des soins choisis avec exigence, des conseils sincères et une approche profondément personnelle de la beauté.</p><a href="/produits">Découvrir le skincare <span>↗</span></a></div>
        </div>
      </section>

      <section className="nails section" id="nails">
        <div className="nails-card">
          <div className="nails-image nails-brand"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /></div>
          <div className="nails-copy"><p className="kicker">03 — SKIN BY YAS NAILS</p><h2>Votre espace Nails<br /><em>à Agadir.</em></h2><p>Découvrez l’espace Nails de Skin by Yas à Agadir et consultez les prestations actuellement disponibles.</p><a href="/nails-agadir" className="button secondary">Découvrir <span>↗</span></a></div>
        </div>
      </section>

      <section className="store" id="store">
        <div className="store-copy"><p className="kicker">04 — Nous trouver</p><h2>Skin by Yas<br /><em>à Agadir.</em></h2><p>Skin by Yas réunit parapharmacie, skincare et beauté dans un même univers à Agadir.</p><div className="store-meta"><p><span>LOCALISATION</span>Agadir, Maroc</p></div><a href="/parapharmacie-agadir" className="button primary">Découvrir Skin by Yas <span>↗</span></a></div>
        <div className="store-image"><img src="/brand/storefront.png" alt="Entrée de la boutique Skin by Yas à Agadir" /></div>
      </section>

      <footer>
        <div className="footer-top"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /><p>Votre peau, mais en mieux.</p></div>
        <div className="footer-links"><div><span>BOUTIQUE</span><a href="/produits">Produits</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Soins cheveux</a><a href="/soins-corps">Soins corps</a><a href="/solaires">Solaires</a></div><div><span>DÉCOUVRIR</span><a href="/marques">Marques</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a><a href="/parapharmacie-agadir">À propos</a></div><div><span>VISITER</span><p>Agadir, Maroc</p></div></div>
        <div className="footer-bottom"><span>© 2026 SKIN BY YAS</span><span>SKINCARE · SELFCARE · BEAUTY</span></div>
      </footer>
    </main>
  );
}
