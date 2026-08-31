import Image from "next/image";
import Link from "next/link";
import { CommerceFooter, CommerceHeader } from "../components/CommercePage";
import { JsonLd } from "../components/JsonLd";
import { createPageMetadata } from "../lib/seo";
import { BUSINESS, canonicalUrl } from "../lib/site";

export const metadata = createPageMetadata({
  title: "Parapharmacie à Agadir | Produits Skincare | Skin by Yas",
  description: "Découvrez Skin by Yas, parapharmacie à Agadir : skincare, soins cheveux, soins corps, produits solaires et sélection de marques en ligne.",
  path: "/parapharmacie-agadir",
  image: BUSINESS.storefrontPath,
});

const universes = [
  { name: "Skincare", href: "/skincare", image: "/peau-grasse.webp" },
  { name: "Soins cheveux", href: "/soins-cheveux", image: "/cerave-vs-bioderma.webp" },
  { name: "Soins corps", href: "/soins-corps", image: "/choisir-creme-type-peau.webp" },
  { name: "Produits solaires", href: "/solaires", image: "/creme-solaire-maroc.webp" },
  { name: "Nails", href: "/nails-agadir", image: "/brand/intro-interior.jpg" },
];

const localFaq = [
  { question: "Où se trouve Skin by Yas ?", answer: "Skin by Yas est une boutique locale à Agadir, au Maroc. Le lien Google Maps de la boutique permet de consulter sa localisation exacte." },
  { question: "Que peut-on découvrir chez Skin by Yas ?", answer: "Le site présente les produits skincare, soins cheveux, soins corps, protections solaires et contenus conseil actuellement publiés par la boutique." },
  { question: "Comment contacter Skin by Yas ?", answer: "Vous pouvez contacter Skin by Yas sur WhatsApp au +212 646-324208 ou retrouver la boutique sur Instagram." },
];

export default function Page(){
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${canonicalUrl("/")}#store`,
    name: BUSINESS.name,
    url: canonicalUrl("/"),
    image: canonicalUrl(BUSINESS.storefrontPath),
    logo: canonicalUrl(BUSINESS.logoPath),
    telephone: BUSINESS.telephone,
    address: { "@type": "PostalAddress", addressLocality: BUSINESS.city, addressCountry: "MA" },
    hasMap: BUSINESS.mapsUrl,
    sameAs: [BUSINESS.instagramUrl],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };

  return <div className="public-page about-page"><CommerceHeader/><main>
  <section className="about-hero"><div className="about-hero-copy"><p className="kicker">PARAPHARMACIE &amp; SKINCARE</p><h1>Parapharmacie à Agadir — Skin by Yas</h1><p>Découvrez un univers dédié à la parapharmacie, au skincare et à la beauté, avec une sélection de produits disponibles en ligne.</p><Link className="about-primary" href="/produits">Découvrir la boutique <span>↗</span></Link></div><div className="about-hero-image"><Image src="/brand/intro-interior.jpg" alt="Intérieur et sélection skincare de Skin by Yas à Agadir" fill priority unoptimized sizes="(max-width: 800px) 100vw, 52vw"/></div></section>
  <section className="about-story"><div className="about-story-image"><Image src="/brand/about-story.png" alt="Accueil et comptoir de la boutique Skin by Yas à Agadir" fill unoptimized sizes="(max-width: 800px) 100vw, 48vw"/></div><div><p className="kicker">SKIN BY YAS — AGADIR</p><h2>Notre histoire</h2><p>Skin by Yas est née avec une idée simple : rendre le skincare et les produits de parapharmacie plus faciles à découvrir à Agadir.</p><p>Nous sélectionnons des soins pour le visage, les cheveux, le corps et la protection solaire afin de vous aider à construire une routine adaptée à vos besoins.</p><p>Notre objectif est de proposer un univers simple, élégant et accessible, où vous pouvez découvrir les produits disponibles, mieux comprendre votre peau et choisir vos soins plus facilement.</p><p>Skin by Yas, c’est une boutique locale à Agadir pensée autour du soin, de la beauté et du conseil.</p></div></section>
  <section className="about-reasons"><div className="about-section-title"><p className="kicker">NOTRE APPROCHE</p><h2>Pourquoi Skin by Yas</h2></div><div className="about-reason-grid"><article><span>01</span><h3>Produits sélectionnés</h3><p>Une sélection de références skincare, beauté et parapharmacie présentées clairement.</p></article><article><span>02</span><h3>Conseils skincare</h3><p>Des guides et routines pour mieux comprendre les besoins de votre peau.</p></article><article><span>03</span><h3>Disponible à Agadir</h3><p>Retrouvez l’univers Skin by Yas et les produits publiés par la boutique à Agadir.</p></article></div></section>
  <section className="about-universes"><div className="about-section-title"><p className="kicker">LA SÉLECTION</p><h2>Nos univers</h2></div><div className="about-universe-grid">{universes.map(item=><Link href={item.href} className="about-universe" key={item.href}><div><Image src={item.image} alt={`${item.name} chez Skin by Yas à Agadir`} fill unoptimized sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw"/></div><h3>{item.name}<span aria-hidden="true">↗</span></h3></Link>)}</div></section>
  <section className="about-location"><div className="about-location-copy"><p className="kicker">AGADIR, MAROC</p><h2>Retrouvez Skin by Yas à Agadir</h2><p>Parapharmacie, skincare et Nails réunis dans l’univers Skin by Yas.</p><div className="about-location-actions"><a className="about-secondary" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">Ouvrir dans Google Maps <span>↗</span></a><a className="about-text-link" href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer">Contacter sur WhatsApp <span>→</span></a></div></div><div className="about-map"><iframe src="https://www.google.com/maps?q=Skin%20by%20Yas%20Agadir&output=embed" title="Localisation de Skin by Yas à Agadir sur Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div></section>
  <section className="about-local-faq" aria-labelledby="about-faq-title"><div><p className="kicker">QUESTIONS PRATIQUES</p><h2 id="about-faq-title">Skin by Yas à Agadir</h2><p>Retrouvez les informations essentielles avant de découvrir la boutique et son catalogue.</p></div><div>{localFaq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
  <section className="about-final"><p className="kicker">SKINCARE — SELFCARE — BEAUTY</p><h2>Prenez soin de votre peau avec Skin by Yas</h2><div><Link className="about-primary" href="/produits">Voir tous les produits <span>↗</span></Link><Link className="about-text-link" href="/conseils">Lire nos conseils <span>→</span></Link></div></section>
  <JsonLd data={[storeSchema, faqSchema]}/>
  </main><CommerceFooter/></div>}
