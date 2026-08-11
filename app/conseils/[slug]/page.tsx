import { CommerceFooter, CommerceHeader } from "../../components/CommercePage";
import { ArticleDetail } from "../../components/StoreData";
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <main><CommerceHeader/><section className="inner-content article-page"><ArticleDetail slug={slug}/></section><CommerceFooter/></main>}
