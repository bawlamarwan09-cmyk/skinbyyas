import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { ArticleDetail } from "../../components/StoreData";
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <div className="public-page"><CommerceHeader/><main><section className="inner-content article-page"><ArticleDetail slug={slug}/></section></main><CommerceFooter/></div>}
