import { SiteFooter, SiteHeader } from "./SiteChrome";

type CategoryLink = { name: string; href: string };

const categories: CategoryLink[] = [
  { name: "Skincare", href: "/skincare" },
  { name: "Soins cheveux", href: "/soins-cheveux" },
  { name: "Soins corps", href: "/soins-corps" },
  { name: "Produits solaires", href: "/solaires" },
];

export function CommerceHeader() {
  return <SiteHeader />;
}

export function CommerceFooter() {
  return <SiteFooter />;
}

export function CommercePage({ eyebrow, title, intro, children, categoryLinks = true }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode; categoryLinks?: boolean }) {
  return <div className="public-page"><CommerceHeader/><main><section className="inner-hero"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section>{categoryLinks && <section className="inner-categories"><p className="kicker">CATÉGORIES</p><div>{categories.map(c => <a key={c.href} href={c.href}><span>{c.name}</span><b>↗</b></a>)}</div></section>}<section className="inner-content">{children ?? <><div className="inner-heading"><p className="kicker">LA BOUTIQUE</p><h2>Produits disponibles</h2></div><div className="empty-state"><p>Aucun produit disponible dans cette catégorie pour le moment.</p><a href="/produits" className="button primary">Voir tous les produits <span>↗</span></a></div></>}</section></main><CommerceFooter/></div>;
}
