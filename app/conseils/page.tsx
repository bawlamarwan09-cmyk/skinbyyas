import type { Metadata } from "next";
import { CommerceFooter, CommerceHeader } from "../components/CommercePage";
import { EditorialArticles } from "../components/StoreData";
import { getArticles, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";
export const metadata: Metadata = createPageMetadata({ title: "Conseils Skincare, Beauté & Nails | Skin by Yas", description: "Découvrez les conseils Skin by Yas autour du skincare, des soins, de la protection solaire, des cheveux et des nails.", path: "/conseils" });
export default async function Page(){const initialData=await optional(getArticles());return <div className="public-page editorial-page"><CommerceHeader/><main><section className="editorial-hero"><p className="kicker">GUIDES &amp; ROUTINES</p><h1>Conseils Skin by Yas</h1><p>Retrouvez nos conseils autour du skincare, des soins, des produits solaires, des cheveux et des nails.</p></section><EditorialArticles initialData={initialData}/></main><CommerceFooter/></div>}
