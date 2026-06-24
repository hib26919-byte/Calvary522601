import React, { useEffect, useMemo, useState } from "react";
import InnerPageHero from "../components/common/InnerPageHero";
import LightboxModal from "../components/gallery/LightboxModal";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { activeHomeSections, localizeDynamic } from "../lib/dynamicContent";
import { DEFAULT_IMAGES } from "../lib/defaultContent";
import { trackPageView } from "../lib/analytics";
import "./BibleDistributionPage.css";

export default function BibleDistributionPage() {
  const { bibleDistribution, homeSections } = useContent();
  const { language, ts } = useLanguage();
  
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    trackPageView("bibleDistribution");
  }, []);

  const homeCard = useMemo(
    () => activeHomeSections(homeSections).find((section) => section.id === "bible-distribution"),
    [homeSections]
  );

  // Filter out inactive items and sort newest first
  const activeEntries = useMemo(() => {
    return bibleDistribution
      .filter((entry) => entry.status !== "inactive")
      .sort((a, b) => {
        const timeA = a.createdAt?.seconds || a.order || 0;
        const timeB = b.createdAt?.seconds || b.order || 0;
        return timeB - timeA;
      });
  }, [bibleDistribution]);

  const visibleEntries = useMemo(() => activeEntries.slice(0, visibleCount), [activeEntries, visibleCount]);

  // Construct images array with captions and descriptive text for LightboxModal
  const lightboxImages = useMemo(() => {
    return visibleEntries.map((entry) => ({
      ...entry,
      caption_en: language === "te" ? "బైబిల్ పంపిణీ" : "Bible Distribution",
      caption_te: "బైబిల్ పంపిణీ",
      about_en: entry.description || entry.description_en || "",
      about_te: entry.description || entry.description_te || entry.description_en || ""
    }));
  }, [visibleEntries, language]);

  const heroTitle = homeCard ? localizeDynamic(homeCard, "title", language, ts) : "Bible Distribution";
  const heroSubtitle = homeCard
    ? localizeDynamic(homeCard, "description", language, ts)
    : "Sharing God's Word and distributing Bibles to communities with love and compassion.";
  const heroImage = homeCard?.imageURL || activeEntries[0]?.imageURL || DEFAULT_IMAGES.prayer;

  return (
    <main>
      <InnerPageHero
        eyebrow={language === "te" ? "వాక్య సేవ" : "Word in Action"}
        title={heroTitle}
        subtitle={heroSubtitle}
        fallbackImage={heroImage}
        alt="Bible distribution ministry"
      />

      <section className="bible-distribution section section--soft">
        <div className="container">
          {activeEntries.length === 0 ? (
            <div className="bible-distribution__empty">
              {language === "te"
                ? "ఈ విభాగంలో ఇంకా ఫోటోలు లేవు."
                : "No active Bible Distribution entries found."}
            </div>
          ) : (
            <>
              <div className="bible-distribution__grid">
                {visibleEntries.map((entry, index) => (
                  <button
                    key={entry.id}
                    className="bible-card-tile"
                    onClick={() => setActiveIndex(index)}
                    aria-label={entry.description || "Bible distribution photo"}
                  >
                    <span className="bible-card-tile__frame">
                      <img
                        src={entry.thumbURL || entry.thumbUrl || entry.imageURL}
                        alt={entry.description || "Bible distribution"}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      />
                    </span>
                    <span className="bible-card-tile__content">
                      <p>{entry.description || entry.description_en || ""}</p>
                    </span>
                  </button>
                ))}
              </div>

              {visibleCount < activeEntries.length && (
                <div className="bible-distribution__more">
                  <button onClick={() => setVisibleCount((count) => count + 9)}>
                    {language === "te" ? "మరిన్ని చూడండి" : "View More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {activeIndex !== null && (
        <LightboxModal
          images={lightboxImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onIndex={setActiveIndex}
        />
      )}
    </main>
  );
}
