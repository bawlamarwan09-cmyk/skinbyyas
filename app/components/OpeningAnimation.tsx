"use client";

import { useEffect, useRef, useState } from "react";

export function OpeningAnimation() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const removalTimer = useRef<number | null>(null);

  function finish() {
    if (leaving) return;
    sessionStorage.setItem("sby_intro_seen", "1");
    setLeaving(true);
    document.body.style.overflow = "";
    removalTimer.current = window.setTimeout(() => setVisible(false), 650);
  }

  useEffect(() => {
    if (sessionStorage.getItem("sby_intro_seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      sessionStorage.setItem("sby_intro_seen", "1");
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(finish, 4350);
    return () => {
      window.clearTimeout(timer);
      if (removalTimer.current) window.clearTimeout(removalTimer.current);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return <div className={`opening-animation${leaving ? " leaving" : ""}`} aria-label="Introduction Skin by Yas">
    <div className="opening-scene opening-brand-scene">
      <div className="opening-brand-mark">
        <img src="/brand/logo.jpg" alt="Skin by Yas" loading="eager" fetchPriority="low" decoding="async" width="900" height="812" />
        <p>Parapharmacie &amp; Skincare<span>Agadir</span></p>
      </div>
    </div>
    <div className="opening-scene opening-storefront-scene">
      <img src="/brand/intro-storefront-preview.webp" alt="Façade de la boutique Skin by Yas à Agadir" loading="lazy" fetchPriority="low" />
      <span aria-hidden="true" />
    </div>
    <div className="opening-scene opening-interior-scene">
      <img src="/brand/intro-interior-preview.webp" alt="Accueil et rayons skincare de la boutique Skin by Yas" loading="lazy" fetchPriority="low" />
      <span aria-hidden="true" />
    </div>
    <button type="button" onClick={finish} aria-label="Passer l’introduction">Passer</button>
  </div>;
}
