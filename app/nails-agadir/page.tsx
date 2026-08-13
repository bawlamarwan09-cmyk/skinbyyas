import type { Metadata } from "next";
import Image from "next/image";
import { CommerceFooter, CommerceHeader } from "../components/CommercePage";

export const metadata: Metadata = {
  title: "Onglerie & Nails à Agadir | Skin by Yas",
  description: "Découvrez l’espace Nails de Skin by Yas à Agadir, son univers et des réalisations effectuées au sein de la boutique.",
};

const gallery = [
  { src: "/nails/preparation-ongles.jpg", alt: "Application soignée d’un vernis sur les ongles chez Skin by Yas à Agadir", label: "Le geste", title: "Une application précise" },
  { src: "/nails/manucure-rouge.jpg", alt: "Manucure rouge brillante réalisée dans l’espace Nails Skin by Yas à Agadir", label: "La couleur", title: "Une finition lumineuse" },
  { src: "/nails/finition-naturelle.jpg", alt: "Manucure naturelle nacrée réalisée chez Skin by Yas à Agadir", label: "Le résultat", title: "Un rendu naturel et élégant" },
];

const whatsappReservationUrl = "https://wa.me/212646324208?text=Bonjour%20Skin%20by%20Yas%2C%20je%20souhaite%20r%C3%A9server%20un%20rendez-vous%20Nails.";

export default function Page(){
  return <div className="public-page nails-page"><CommerceHeader/><main>
    <section className="nails-hero">
      <div className="nails-hero-copy"><p className="kicker">SKIN BY YAS NAILS · AGADIR</p><h1>Votre espace<br/><em>Nails</em> à Agadir</h1><p>Un espace dédié à la beauté des ongles au sein de Skin by Yas, dans une atmosphère soignée et chaleureuse.</p><div className="nails-hero-actions"><a className="nails-reservation-button" href={whatsappReservationUrl} target="_blank" rel="noopener noreferrer" aria-label="Réserver un rendez-vous Nails sur WhatsApp">Réserver sur WhatsApp <span aria-hidden="true">↗</span></a><a className="nails-gallery-link" href="#realisations">Voir nos réalisations <span aria-hidden="true">↓</span></a></div></div>
      <div className="nails-hero-image"><Image src="/nails/finition-naturelle.jpg" alt="Manucure naturelle réalisée dans l’espace Nails Skin by Yas" fill priority unoptimized sizes="(max-width: 800px) 100vw, 52vw"/></div>
    </section>

    <section className="nails-intro" aria-labelledby="nails-intro-title"><div><p className="kicker">L’ESPACE NAILS</p><h2 id="nails-intro-title">Des ongles soignés,<br/>jusqu’au dernier détail.</h2></div><div><p>Découvrez l’univers Nails de Skin by Yas à travers des gestes précis, des couleurs élégantes et des finitions travaillées.</p><p>Pour connaître les prestations actuellement disponibles et organiser votre visite, contactez directement Skin by Yas.</p></div></section>

    <section className="nails-gallery" id="realisations" aria-labelledby="gallery-title"><div className="nails-section-heading"><p className="kicker">RÉALISATIONS</p><h2 id="gallery-title">L’inspiration du moment</h2><p>Quelques réalisations de notre espace Nails à Agadir.</p></div><div className="nails-gallery-grid">{gallery.map((item,index)=><article className={index===1?"nails-gallery-card featured":"nails-gallery-card"} key={item.src}><div><Image src={item.src} alt={item.alt} fill unoptimized sizes="(max-width: 700px) 100vw, 33vw"/></div><p>{item.label}</p><h3>{item.title}</h3></article>)}</div></section>

    <section className="nails-visit"><div className="nails-visit-image"><Image src="/nails/preparation-ongles.jpg" alt="Application de vernis dans l’espace Nails Skin by Yas à Agadir" fill unoptimized sizes="(max-width: 800px) 100vw, 48vw"/></div><div className="nails-visit-copy"><p className="kicker">VOTRE VISITE</p><h2>Retrouvez-nous<br/>à Agadir</h2><p>L’espace Nails vous accueille au sein de Skin by Yas. Consultez notre localisation et contactez la boutique pour connaître les disponibilités.</p><div className="nails-visit-actions"><a className="nails-reservation-button" href={whatsappReservationUrl} target="_blank" rel="noopener noreferrer">Réserver sur WhatsApp <span aria-hidden="true">↗</span></a><a className="nails-map-link" href="https://share.google/TN4FWEUdYyxXwBF4A" target="_blank" rel="noopener noreferrer">Voir sur Google Maps <span aria-hidden="true">→</span></a></div></div></section>
  </main><CommerceFooter/></div>;
}
