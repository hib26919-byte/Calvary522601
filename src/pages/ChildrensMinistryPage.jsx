import React, { useEffect } from "react";
import GalleryGrid from "../components/gallery/GalleryGrid";
import ImpactStats from "../components/home/ImpactStats";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import { DEFAULT_IMAGES, DEFAULT_MINISTRY_CONTENT } from "../lib/defaultContent";
import MinistryArtSection from "../components/common/MinistryArtSection";

export default function ChildrensMinistryPage() {
  const { childrensPage } = useContent();
  const { t, language } = useLanguage();
  useEffect(() => { trackPageView("children"); }, []);
  return (
    <main>
      <section className="page-hero"><img src={childrensPage?.heroImageURL || DEFAULT_IMAGES.children} alt="" className="page-hero__image" /><div className="page-hero__content"><h1>{t(childrensPage, "heroTitle") || (language === "te" ? "పిల్లల పరిచర్య" : "Children's Ministry")}</h1><p>{t(childrensPage, "heroSubtitle") || (language === "te" ? "దేవుని ప్రేమలో పిల్లల హృదయాలను పెంపొందించడం." : "Nurturing young hearts in the love and word of God.")}</p></div></section>
      <section className="section"><div className="container"><h2 className="section-title">{language === "te" ? "ప్రతి పిల్లవాడు విలువైనవాడు" : "Every Child Is Treasured"}</h2><div className="rich-content" dangerouslySetInnerHTML={{ __html: t(childrensPage, "description") || `<p>${language === "te" ? DEFAULT_MINISTRY_CONTENT.vision_te : DEFAULT_MINISTRY_CONTENT.vision_en}</p><p>${language === "te" ? "పిల్లలకు దేవుని వాక్యం, ప్రార్థన, ప్రోత్సాహం, విద్యా మార్గదర్శకత్వం మరియు ప్రేమతో కూడిన సమాజం అందించడం మా ఆనందం." : "We serve children with Scripture, prayer, encouragement, education guidance, and a caring community where they can grow with dignity and joy."}</p>` }} /></div></section>
      <MinistryArtSection
        title={language === "te" ? "పిల్లలతో యేసు ప్రేమ" : "Jesus' Love With Children"}
        text={language === "te" ? "పిల్లలు ప్రేమతో, ప్రార్థనతో, దేవుని వాక్యంతో పెరుగుతున్న దృశ్య స్థలం." : "A visual space for children growing through love, prayer, and the word of God."}
        imageUrl={childrensPage?.jesusImageURL}
        fallbackTone="children"
      />
      <ImpactStats />
      <section className="section section--soft"><div className="container"><h2 className="section-title">{language === "te" ? "పిల్లల పరిచర్య ఫోటోలు" : "Children's Ministry Photos"}</h2><GalleryGrid category="children" /></div></section>
    </main>
  );
}
