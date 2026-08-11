import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { BrandPage } from "../../components/StoreData";
import type {Metadata} from "next";
const API=(process.env.NEXT_PUBLIC_API_URL??"").replace(/\/$/,"");
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;try{const response=await fetch(`${API}/api/brands/${slug}`,{headers:{"ngrok-skip-browser-warning":"true"}}),payload=await response.json(),brand=payload.data;if(!response.ok||!brand)throw new Error();const title=brand.seoTitle||`${brand.name} | Skin by Yas`,description=brand.seoDescription||`Découvrez les produits ${brand.name} actuellement disponibles chez Skin by Yas.`;return{title,description,alternates:{canonical:`/marques/${brand.slug}`}}}catch{return{title:"Marque | Skin by Yas",alternates:{canonical:`/marques/${slug}`}}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <div className="public-page"><CommerceHeader/><main><BrandPage slug={slug}/></main><CommerceFooter/></div>}
