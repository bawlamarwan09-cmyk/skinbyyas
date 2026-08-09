type CategoryLink = { name: string; href: string };

const categories: CategoryLink[] = [
  { name: "Skincare", href: "/skincare" },
  { name: "Soins cheveux", href: "/soins-cheveux" },
  { name: "Soins corps", href: "/soins-corps" },
  { name: "Produits solaires", href: "/solaires" },
];

export function CommerceHeader() {
  return <header className="inner-header"><a href="/" className="brand"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /></a><nav><a href="/produits">Produits</a><a href="/marques">Marques</a><a href="/conseils">Conseils</a><a href="/nails-agadir">Nails</a></nav><a href="/produits" className="inner-cart">Panier <span>0</span></a></header>;
}

export function CommerceFooter() {
  return <footer><div className="footer-top"><img src="/brand/logo.jpg" alt="Skin by Yasmine Agadir" /><p>Votre peau, mais en mieux.</p></div><div className="footer-links"><div><span>BOUTIQUE</span><a href="/produits">Produits</a>{categories.map(c => <a key={c.href} href={c.href}>{c.name}</a>)}</div><div><span>DÉCOUVRIR</span><a href="/marques">Marques</a><a href="/nails-agadir">Nails</a><a href="/conseils">Conseils</a><a href="/parapharmacie-agadir">À propos</a></div><div><span>LOCALISATION</span><p>Agadir, Maroc</p></div></div><div className="footer-bottom"><span>© 2026 SKIN BY YAS</span><span>SKINCARE · SELFCARE · BEAUTY</span></div></footer>;
}

export function CommercePage({ eyebrow, title, intro, children, categoryLinks = true }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode; categoryLinks?: boolean }) {
  return <main><CommerceHeader/><section className="inner-hero"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section>{categoryLinks && <section className="inner-categories"><p className="kicker">CATÉGORIES</p><div>{categories.map(c => <a key={c.href} href={c.href}><span>{c.name}</span><b>↗</b></a>)}</div></section>}<section className="inner-content">{children ?? <><div className="inner-heading"><p className="kicker">LA BOUTIQUE</p><h2>Produits disponibles</h2></div><div className="empty-state"><p>Aucun produit disponible dans cette catégorie pour le moment.</p><a href="/produits" className="button primary">Voir tous les produits <span>↗</span></a></div></>}</section><CommerceFooter/></main>;
}
