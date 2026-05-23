import React, { useEffect } from "react";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";

export default function GalleryPage() {
  const { ts, language } = useLanguage();

  useEffect(() => {
    trackPageView("gallery");
  }, []);

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero__content">
          <h1>{ts("gallery_label")}</h1>

          <p>
            {language === "te"
              ? "పరిచర్య క్షణాలు, ప్రార్థనలు, సమాజం, పిల్లలు మరియు సేవ."
              : "Ministry moments from prayer, community, children, villages, and worship."}
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}