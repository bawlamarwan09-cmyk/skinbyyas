"use client";

import { useState } from "react";

const categories = [
  { name: "Skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1100&q=85" },
  { name: "Soins cheveux", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1100&q=85" },
  { name: "Soins corps", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1100&q=85" },
  { name: "Protection solaire", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1100&q=85" },
];

const products = [
  { brand: "LA ROCHE-POSAY", name: "Anthelios UVMune 400 Fluide SPF50+", price: "189 MAD", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85" },
  { brand: "CERAVE", name: "Crème Hydratante Visage", price: "159 MAD", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85" },
  { brand: "THE ORDINARY", name: "Niacinamide 10% + Zinc 1%", price: "125 MAD", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85" },
  { brand: "NUXE", name: "Huile Prodigieuse", price: "285 MAD", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
          <button className="cart" aria-label={`Panier, ${cartCount} articles`}>Panier <span>{cartCount}</span></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
            <i></i><i></i>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <img src="/brand/storefront.png" alt="La boutique Skin by Yas à Agadir, éclairée le soir" />
        <div className="hero-wash"></div>
        <div className="hero-content">
          <p className="eyebrow">SKIN BY YAS — AGADIR</p>
          <h1>Votre peau,<br />mais en mieux.</h1>
          <p className="hero-copy">Parapharmacie, skincare &amp; nails à Agadir.</p>
          <div className="hero-actions">
            <a href="/produits" className="button primary">Découvrir nos produits <span>↗</span></a>
            <a href="#categories" className="text-link">Explorer Skin by Yas <span>↓</span></a>
          </div>
        </div>
        <p className="hero-note">Skincare · Selfcare · Beauty</p>
      </section>

      <section className="categories section" id="categories">
        <div className="section-heading">
          <p className="kicker">01 — Votre rituel</p>
          <h2>Prendre soin,<br /><em>naturellement.</em></h2>
          <p>Une sélection experte pour accompagner chaque peau, chaque saison et chaque envie.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a href="/produits" className={`category category-${index + 1}`} key={category.name}>
              <div className="category-image"><img src={category.image} alt="" /></div>
              <div className="category-label"><span>{category.name}</span><b>↗</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className="products section" id="products">
        <div className="products-top">
          <div><p className="kicker">02 — Les favoris</p><h2>Les essentiels<br /><em>du moment.</em></h2></div>
          <a href="/produits" className="underlined">Voir toute la sélection <span>↗</span></a>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <a href="/produits" className="product-image"><img src={product.image} alt={product.name} /></a>
              <p className="product-brand">{product.brand}</p>
              <h3>{product.name}</h3>
              <div className="product-bottom"><span>{product.price}</span><button onClick={() => setCartCount(cartCount + 1)} aria-label={`Ajouter ${product.name} au panier`}>Ajouter +</button></div>
            </article>
          ))}
        </div>
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
          <div className="nails-image"><img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85" alt="Manucure naturelle aux tons doux" /></div>
          <div className="nails-copy"><p className="kicker">03 — Studio Nails</p><h2>Des mains<br /><em>qui parlent.</em></h2><p>Manucure soignée, couleurs naturelles et détails délicats — dans l’univers chaleureux de Skin by Yas.</p><a href="#store" className="button secondary">Prendre rendez-vous <span>↗</span></a></div>
        </div>
      </section>

      <section className="store" id="store">
        <div className="store-copy"><p className="kicker">04 — Nous trouver</p><h2>Skin by Yas<br /><em>à Agadir.</em></h2><p>Une adresse de proximité dédiée au soin, à la beauté et au conseil.</p><div className="store-meta"><p><span>ADRESSE</span>Agadir, Maroc</p><p><span>OUVERTURE</span>Lun — Sam · 10h — 20h</p></div><a href="https://maps.google.com/?q=Skin+by+Yas+Agadir" className="button primary">Voir l’itinéraire <span>↗</span></a></div>
        <div className="store-image"><img src="/brand/storefront.png" alt="Entrée de la boutique Skin by Yas à Agadir" /></div>
      </section>

      <footer>
        <div className="footer-top"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /><p>Votre peau, mais en mieux.</p></div>
        <div className="footer-links"><div><span>EXPLORER</span><a href="#categories">Nos soins</a><a href="#products">Produits</a><a href="#nails">Nails</a></div><div><span>SUIVRE</span><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">WhatsApp</a></div><div><span>VISITER</span><p>Agadir, Maroc<br />Lun — Sam · 10h — 20h</p></div></div>
        <div className="footer-bottom"><span>© 2026 SKIN BY YAS</span><span>SKINCARE · SELFCARE · BEAUTY</span></div>
      </footer>
    </main>
  );
}
