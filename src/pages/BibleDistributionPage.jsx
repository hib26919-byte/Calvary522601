import React, { useEffect, useMemo, useState } from "react";
import InnerPageHero from "../components/common/InnerPageHero";
import LightboxModal from "../components/gallery/LightboxModal";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { activeHomeSections, localizeDynamic } from "../lib/dynamicContent";
import { DEFAULT_IMAGES } from "../lib/defaultContent";
import { trackPageView } from "../lib/analytics";
import "./BibleDistributionPage.css";

const PAGE_SIZE = 9;

export default function BibleDistributionPage() {
  const { bibleDistribution, homeSections } = useContent();
  const { t, ts, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    trackPageView("bibleDistribution");
  }, []);

  const homeCard = useMemo(
    () => activeHomeSections(homeSections).find((section) => section.id === "bible-distribution"),
    [homeSections]
  );

  const activeEntries = useMemo(
    () => bibleDistribution.filter((entry) => entry.status !== "inactive"),
    [bibleDistribution]
  );

  const filteredEntries = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return activeEntries;
    return activeEntries.filter((entry) => [
      entry.title_en,
      entry.title_te,
      entry.subtitle_en,
      entry.description_en,
      entry.description_te,
      entry.location_en,
      entry.location_te,
      entry.category,
      entry.date
    ].filter(Boolean).join(" ").toLowerCase().includes(needle));
  }, [activeEntries, query]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleEntries = filteredEntries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const lightboxImages = visibleEntries.map((entry) => ({
    ...entry,
    caption_en: entry.title_en,
    caption_te: entry.title_te,
    about_en: entry.description_en,
    about_te: entry.description_te
  }));

  useEffect(() => {
    setPage(1);
    setActiveIndex(null);
  }, [query]);

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(language === "te" ? "te-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  const heroTitle = homeCard ? localizeDynamic(homeCard, "title", language, ts) : "Bible Distribution";
  const heroSubtitle = homeCard
    ? localizeDynamic(homeCard, "description", language, ts)
    : "Sharing God's Word and distributing Bibles to communities with love and compassion.";
  const heroImage = homeCard?.imageURL || activeEntries[0]?.imageURL || DEFAULT_IMAGES.prayer;

  return (
    <main>
      <InnerPageHero
        eyebrow="Word in Action"
        title={heroTitle}
        subtitle={heroSubtitle}
        fallbackImage={heroImage}
        alt="Bible distribution ministry"
      />

      <section className="bible-distribution section section--soft">
        <div className="container">
          <div className="bible-distribution__toolbar">
            <div>
              <h2 className="section-title">{heroTitle}</h2>
              <p className="section-lead">{heroSubtitle}</p>
            </div>
            <label className="bible-distribution__search">
              <span className="sr-only">Search Bible distribution entries</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, location, date..."
              />
            </label>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="bible-distribution__empty">No active Bible Distribution entries found.</div>
          ) : (
            <>
              <div className="bible-distribution__grid">
                {visibleEntries.map((entry, index) => (
                  <article className="bible-card" key={entry.id}>
                    <button className="bible-card__image" onClick={() => setActiveIndex(index)} aria-label={`Preview ${t(entry, "title") || "Bible distribution image"}`}>
                      <img src={entry.thumbURL || entry.thumbUrl || entry.imageURL} alt={t(entry, "title") || "Bible distribution"} loading="lazy" decoding="async" />
                    </button>
                    <div className="bible-card__body">
                      {entry.category && <span className="bible-card__category">{entry.category}</span>}
                      <h3>{t(entry, "title")}</h3>
                      {t(entry, "subtitle") && <strong>{t(entry, "subtitle")}</strong>}
                      <p>{t(entry, "description")}</p>
                      <div className="bible-card__meta">
                        {entry.date && <span>{formatDate(entry.date)}</span>}
                        {t(entry, "location") && <span>{t(entry, "location")}</span>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="bible-distribution__pagination" aria-label="Bible distribution pagination">
                  <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>Previous</button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>Next</button>
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
