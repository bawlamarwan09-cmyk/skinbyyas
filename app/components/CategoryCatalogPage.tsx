import { CommerceFooter, CommerceHeader } from "./CommercePage";
import { ShopCatalog } from "./StoreData";

export function CategoryCatalogPage({title,intro,category}:{title:string;intro:string;category:string}){
  return <div className="public-page shop-catalog-page"><CommerceHeader/><main><section className="catalog-hero"><p className="kicker">BOUTIQUE EN LIGNE</p><h1>{title}</h1><p>{intro}</p></section><ShopCatalog initialCategory={category}/></main><CommerceFooter/></div>;
}
