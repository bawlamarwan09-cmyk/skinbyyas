"use client";

import { useState } from "react";
import { CartCount } from "./StoreData";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return <>
    <header className="shop-header">
      <a href="/" className="shop-logo" aria-label="Skin by Yas — accueil"><img src="/brand/logo.png" alt="Skin by Yasmine Agadir" /></a>
      <nav className={menuOpen ? "shop-nav open" : "shop-nav"} aria-label="Navigation principale">
        <a href="/">Accueil</a><a href="/produits">Boutique</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a>
      </nav>
      <div className="shop-actions"><button onClick={() => setSearchOpen(true)}>Recherche</button><a href="/produits">Panier <CartCount /></a><button className="shop-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu"><i></i><i></i></button></div>
    </header>

    {searchOpen && <div className="search-panel" role="dialog" aria-modal="true" aria-label="Recherche de produits"><button className="search-close" onClick={() => setSearchOpen(false)}>Fermer ×</button><form action="/produits" className="search-form"><label htmlFor="site-search">Que recherchez-vous ?</label><div><input id="site-search" name="q" autoFocus placeholder="Rechercher dans la boutique"/><button type="submit">Rechercher ↗</button></div></form></div>}
  </>;
}

export function SiteFooter() {
  return <footer className="shop-footer"><div className="shop-footer-brand"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/><p>Parapharmacie, skincare &amp; beauté à Agadir.</p></div><div><h3>Boutique</h3><a href="/produits">Produits</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a></div><div><h3>Skin by Yas</h3><a href="/parapharmacie-agadir">À propos</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a></div><div><h3>Localisation</h3><p>Agadir, Maroc</p></div><small>© 2026 SKIN BY YAS</small></footer>;
}
