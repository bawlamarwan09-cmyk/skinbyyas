import type { Metadata } from "next";
import { CommerceFooter, CommerceHeader } from "../components/CommercePage";
import { CartPage } from "../components/StoreData";

export const metadata: Metadata = {
  title: "Votre panier | Skin by Yas",
  description: "Consultez les produits ajoutés à votre panier Skin by Yas.",
};

export default function Page() {
  return <div className="public-page cart-page"><CommerceHeader/><main><CartPage/></main><CommerceFooter/></div>;
}
