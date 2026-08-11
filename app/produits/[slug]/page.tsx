import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { ProductDetail } from "../../components/StoreData";
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <div className="public-page"><CommerceHeader/><main><section className="inner-content product-page"><ProductDetail slug={slug}/></section></main><CommerceFooter/></div>}
