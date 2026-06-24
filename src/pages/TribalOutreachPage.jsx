import React, { useEffect } from "react";
import GalleryGrid from "../components/gallery/GalleryGrid";
import ImpactStats from "../components/home/ImpactStats";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import { DEFAULT_IMAGES, DEFAULT_MINISTRY_CONTENT } from "../lib/defaultContent";
import MinistryArtSection from "../components/common/MinistryArtSection";
import InnerPageHero from "../components/common/InnerPageHero";

export default function TribalOutreachPage() {
  const { tribalPage } = useContent();
  const { t, language } = useLanguage();
  useEffect(() => { trackPageView("tribal"); }, []);
  return (
    <main>
      <InnerPageHero
        eyebrow={language === "te" ? "గ్రామ సేవ" : "Village Outreach"}
        title={t(tribalPage, "heroTitle") || (language === "te" ? "గిరిజన సేవ" : "Tribal Outreach")}
        subtitle={t(tribalPage, "heroSubtitle") || (language === "te" ? "మారుమూల గ్రామాలకు క్రీస్తు ప్రేమను తీసుకెళ్లడం." : "Carrying Christ's love to remote villages with prayer, guidance, and compassionate support.")}
        images={tribalPage?.heroImages}
        fallbackImage={tribalPage?.heroImageURL || DEFAULT_IMAGES.tribal}
        alt="Tribal outreach ministry"
      />
      <section className="section"><div className="container"><h2 className="section-title">{language === "te" ? "ఆశతో కూడిన సమీపం" : "Presence That Brings Hope"}</h2><div className="rich-content" dangerouslySetInnerHTML={{ __html: t(tribalPage, "description") || `<p>${language === "te" ? DEFAULT_MINISTRY_CONTENT.mission_te : DEFAULT_MINISTRY_CONTENT.mission_en}</p><p>${language === "te" ? DEFAULT_MINISTRY_CONTENT.vision_te : DEFAULT_MINISTRY_CONTENT.vision_en}</p>` }} /></div></section>
      <MinistryArtSection
        title={language === "te" ? "గిరిజన సమాజాల మధ్య క్రీస్తు ప్రేమ" : "Christ's Love Among Tribal Communities"}
        text={language === "te" ? "గిరిజన కుటుంబాలకు ప్రార్థన, సానుభూతి, మార్గదర్శకత్వం మరియు విశ్వాసంతో సహాయం అందించే దృశ్య స్థలం." : "A visual space for prayer, compassion, guidance, and faithful support among tribal families."}
        imageUrl={tribalPage?.jesusImageURL}
        fallbackTone="tribal"
      />
      <ImpactStats />
      <section className="section section--soft"><div className="container"><h2 className="section-title">{language === "te" ? "గిరిజన సేవ ఫోటోలు" : "Tribal Outreach Photos"}</h2><GalleryGrid category={tribalPage?.galleryCategoryId} /></div></section>
    </main>
  );
}
