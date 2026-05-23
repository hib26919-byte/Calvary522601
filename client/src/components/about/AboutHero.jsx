import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import { DEFAULT_IMAGES } from "../../lib/defaultContent";

export default function AboutHero() {
  const { t, language } = useLanguage();
  const { aboutPage } = useContent();
  return (
    <section className="page-hero">
      <img src={aboutPage?.heroImageURL || DEFAULT_IMAGES.church} alt="" className="page-hero__image" />
      <div className="page-hero__content">
        <h1>{t(aboutPage, "heroTitle") || (language === "te" ? "మా గురించి" : "About Calvary Prema")}</h1>
        <p>{t(aboutPage, "heroSubtitle") || (language === "te" ? "ఒక కుటుంబ విశ్వాస ప్రయాణం, సేవగా మారిన కథ." : "A family journey of faith, carried forward as service.")}</p>
      </div>
    </section>
  );
}
