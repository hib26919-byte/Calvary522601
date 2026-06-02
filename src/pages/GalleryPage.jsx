import React, { useEffect } from "react";
import GalleryGrid from "../components/gallery/GalleryGrid";
import InnerPageHero from "../components/common/InnerPageHero";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import { DEFAULT_IMAGES } from "../lib/defaultContent";

export default function GalleryPage() {
  const { ts, language } = useLanguage();

  useEffect(() => {
    trackPageView("gallery");
  }, []);

  return (
    <main>
      <InnerPageHero
        eyebrow={language === "te" ? "ఫోటోలు" : "Photo Stories"}
        title={ts("gallery_label")}
        subtitle={language === "te"
          ? "పరిచర్య క్షణాలు, ప్రార్థనలు, సమాజం, పిల్లలు మరియు సేవ."
          : "Ministry moments from prayer, community, children, villages, and worship."}
        fallbackImage={DEFAULT_IMAGES.church}
        alt="Calvary Prema gallery"
      />

      <section className="section section--soft">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
