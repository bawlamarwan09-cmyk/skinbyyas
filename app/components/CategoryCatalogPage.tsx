import Link from "next/link";
import { CommerceFooter, CommerceHeader } from "./CommercePage";
import { JsonLd } from "./JsonLd";
import { ShopCatalog } from "./StoreData";
import type { Collection, Product } from "../lib/api";

interface CategoryCatalogPageProps {
  title: string;
  intro: string;
  category: string;
  initialData?: Collection<Product>;
  guideTitle: string;
  guide: string[];
  relatedLinks: { href: string; label: string }[];
  faq: { question: string; answer: string }[];
}

export function CategoryCatalogPage({title,intro,category,initialData,guideTitle,guide,relatedLinks,faq}:CategoryCatalogPageProps){
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <div className="public-page shop-catalog-page"><CommerceHeader/><main><section className="catalog-hero"><p className="kicker">BOUTIQUE EN LIGNE</p><h1>{title}</h1><p>{intro}</p></section><ShopCatalog initialCategory={category} initialData={initialData}/><section className="category-seo" aria-labelledby={`${category}-guide`}><div><p className="kicker">GUIDE SKIN BY YAS</p><h2 id={`${category}-guide`}>{guideTitle}</h2>{guide.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<nav aria-label="Conseils associés">{relatedLinks.map(link=><Link href={link.href} key={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}</nav></div><div className="category-faq"><p className="kicker">QUESTIONS FRÉQUENTES</p><h2>Bien choisir</h2>{faq.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section><JsonLd data={faqSchema}/></main><CommerceFooter/></div>;
}
