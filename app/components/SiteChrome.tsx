"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CartCount } from "./StoreData";

const boutiqueLinks = [
  ["Tous les produits", "/produits"],
  ["Skincare", "/skincare"],
  ["Soins cheveux", "/soins-cheveux"],
  ["Soins corps", "/soins-corps"],
  ["Produits solaires", "/solaires"],
  ["Nails", "/nails-agadir"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const boutiqueActive = boutiqueLinks.some(([, href]) => active(href));

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); setSearchOpen(false); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return <>
    <header className="shop-header"><div className="header-container">
      <a href="/" className="shop-logo" aria-label="Skin by Yas — accueil"><img src="/brand/logo.png" alt="Skin by Yasmine Agadir" /></a>
      <nav id="site-navigation" className={menuOpen ? "shop-nav open" : "shop-nav"} aria-label="Navigation principale">
        <a href="/" className={active("/") ? "active" : ""}>Accueil</a>
        <details className={`boutique-menu ${boutiqueActive ? "active" : ""}`}>
          <summary>Boutique <span aria-hidden="true">⌄</span></summary>
          <div className="boutique-dropdown">{boutiqueLinks.map(([label, href]) => <a href={href} className={active(href) ? "active" : ""} aria-current={active(href) ? "page" : undefined} key={href}><span>{label}</span><b aria-hidden="true">→</b></a>)}</div>
        </details>
        <a href="/conseils" className={active("/conseils") ? "active" : ""}>Conseils</a>
        <a href="/parapharmacie-agadir" className={active("/parapharmacie-agadir") ? "active" : ""}>À propos</a>
      </nav>
      <div className="shop-actions"><button className="header-search" onClick={() => setSearchOpen(true)} aria-label="Rechercher"><span aria-hidden="true">⌕</span><em>Recherche</em></button><a className={`header-cart ${active("/panier") ? "active" : ""}`} href="/panier" aria-label="Voir le panier"><span className="cart-icon" aria-hidden="true"></span><span className="cart-label">Panier</span><CartCount /></a><button className="shop-menu" onClick={() => setMenuOpen(!menuOpen)} aria-controls="site-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}><i></i><i></i></button></div>
    </div></header>

    {searchOpen && <div className="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={event => { if (event.target === event.currentTarget) setSearchOpen(false); }}><div className="search-dialog"><button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Fermer la recherche">×</button><form action="/produits" className="search-form"><label id="search-title" htmlFor="site-search">Rechercher dans la boutique</label><div><input id="site-search" name="q" autoFocus placeholder="Rechercher un produit, une marque..."/><button type="submit">Rechercher <span>→</span></button></div></form></div></div>}
  </>;
}

export function SiteFooter() {
  return <footer className="shop-footer"><div className="footer-container"><div className="footer-grid"><div className="shop-footer-brand"><div className="footer-logo"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir"/></div><p>Votre destination skincare, parapharmacie et beauté à Agadir.</p></div><nav aria-label="Boutique"><h3>Boutique</h3><a href="/produits">Tous les produits</a><a href="/skincare">Skincare</a><a href="/soins-cheveux">Cheveux</a><a href="/soins-corps">Corps</a><a href="/solaires">Solaires</a><a href="/nails-agadir">Nails</a></nav><nav aria-label="Skin by Yas"><h3>Skin by Yas</h3><a href="/parapharmacie-agadir">À propos</a><a href="/conseils">Conseils</a><a href="https://www.instagram.com/skinby_yas/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a></nav><div className="footer-location"><h3>Retrouvez-nous</h3><p>Agadir, Maroc</p><a href="https://wa.me/212646324208" target="_blank" rel="noopener noreferrer" aria-label="Contacter Skin by Yas sur WhatsApp au plus 212 646 324208">WhatsApp : +212 646-324208 <span aria-hidden="true">↗</span></a><a href="https://share.google/TN4FWEUdYyxXwBF4A" target="_blank" rel="noopener noreferrer">Voir sur Google Maps <span>→</span></a></div></div><div className="footer-bottom"><small>© 2026 Skin by Yas</small></div></div></footer>;
}
