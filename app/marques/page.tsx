import type { Metadata } from "next";
import { CommercePage } from "../components/CommercePage";
import { BrandsGrid } from "../components/StoreData";
import { getBrands, optional } from "../lib/api";
import { createPageMetadata } from "../lib/seo";
export const metadata: Metadata = createPageMetadata({ title: "Nos Marques | Skin by Yas", description: "Découvrez les marques disponibles chez Skin by Yas et explorez leurs produits skincare, cheveux, corps et solaires.", path: "/marques" });
export default async function Page(){ const initialData=await optional(getBrands());return <CommercePage eyebrow="LE CATALOGUE" title="Nos marques" intro="Découvrez les marques actuellement disponibles chez Skin by Yas et accédez facilement à leurs produits." categoryLinks={false}><div className="inner-heading"><p className="kicker">MARQUES DISPONIBLES</p><h2>Le catalogue</h2></div><BrandsGrid initialData={initialData}/></CommercePage>; }
