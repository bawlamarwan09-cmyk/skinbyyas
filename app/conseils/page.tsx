import type { Metadata } from "next";
import { CommercePage } from "../components/CommercePage";
import { ArticlesGrid } from "../components/StoreData";
export const metadata: Metadata = { title: "Conseils Skincare, Beauté & Nails | Skin by Yas", description: "Découvrez les conseils Skin by Yas autour du skincare, des soins, de la protection solaire, des cheveux et des nails." };
const clusters = [{name:"Skincare",href:"/skincare"},{name:"Solaires",href:"/solaires"},{name:"Cheveux",href:"/soins-cheveux"},{name:"Nails",href:"/nails-agadir"}];
export default function Page(){ return <CommercePage eyebrow="GUIDES & ROUTINES" title="Conseils Skin by Yas" intro="Retrouvez nos conseils autour du skincare, des soins, des produits solaires, des cheveux et des nails." categoryLinks={false}><div className="inner-heading"><p className="kicker">THÉMATIQUES</p><h2>Explorer nos univers</h2></div><div className="advice-grid">{clusters.map(c=><a href={c.href} key={c.href}><span>{c.name}</span><b>↗</b></a>)}</div><div className="inner-heading articles-heading"><p className="kicker">ARTICLES PUBLIÉS</p><h2>Nos conseils</h2></div><ArticlesGrid/></CommercePage>; }
