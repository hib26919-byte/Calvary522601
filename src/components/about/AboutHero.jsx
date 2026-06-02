import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import { DEFAULT_IMAGES } from "../../lib/defaultContent";
import InnerPageHero from "../common/InnerPageHero";

export default function AboutHero() {
  const { t, language } = useLanguage();
  const { aboutPage } = useContent();
  return (
    <InnerPageHero
      eyebrow={language === "te" ? "మా ప్రయాణం" : "Our Journey"}
      title={t(aboutPage, "heroTitle") || (language === "te" ? "మా గురించి" : "About Calvary Prema")}
      subtitle={t(aboutPage, "heroSubtitle") || (language === "te" ? "ఒక కుటుంబ విశ్వాస ప్రయాణం, సేవగా మారిన కథ." : "A family journey of faith, carried forward as service.")}
      images={aboutPage?.heroImages}
      fallbackImage={aboutPage?.heroImageURL || DEFAULT_IMAGES.church}
      alt="About Calvary Prema"
    />
  );
}
