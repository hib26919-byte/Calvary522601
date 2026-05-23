import React, { useMemo, useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useLanguage } from "../../context/LanguageContext";
import LightboxModal from "./LightboxModal";
import "./Gallery.css";

const CATEGORIES = [
  { value: "all", en: "All", te: "అన్నీ" },
  { value: "tribal", en: "Tribal Outreach", te: "గిరిజన సేవ" },
  { value: "children", en: "Children's Ministry", te: "పిల్లల పరిచర్య" },
  { value: "church", en: "Church", te: "చర్చి" },
  { value: "events", en: "Events", te: "కార్యక్రమాలు" }
];

export default function GalleryGrid({ category }) {
  const { gallery } = useContent();
  const { t, language } = useLanguage();

  const [filter, setFilter] = useState(category || "all");
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const images = useMemo(() => {
    return filter === "all"
      ? gallery
      : gallery.filter((img) => img.category === filter);
  }, [gallery, filter]);

  const visibleImages = images.slice(0, visibleCount);

  function changeFilter(value) {
    setFilter(value);
    setVisibleCount(9);
  }

  return (
    <div className="gallery-module">

      <div className="gallery-hero">
        <div className="gallery-hero__content">

          <span className="gallery-hero__tag">
            FAITH IN ACTION
          </span>

          <h1>
            CHRIST BLESSING
            <br />
            THE GATHERING
          </h1>

          <p>
            Where two or three gather in His name,
            He is there among them.
          </p>

        </div>

        <div className="gallery-hero__image">
          <img
            src="/Calvary_Prema_Ministries_Narasaropet.webp"
            alt="Calvary Prema Ministries"
          />
        </div>
      </div>

      {!category && (
        <div className="gallery-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={filter === cat.value ? "active" : ""}
              onClick={() => changeFilter(cat.value)}
            >
              {cat[language] || cat.en}
            </button>
          ))}
        </div>
      )}

      {images.length === 0 ? (
        <div className="gallery-empty">
          {language === "te"
            ? "ఈ విభాగంలో ఇంకా ఫోటోలు లేవు."
            : "No photos in this category yet."}
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {visibleImages.map((img, i) => (
              <button
                key={img.id}
                className={`gallery-tile gallery-tile--${i % 4}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="gallery-tile__frame">
                  <img
                    src={img.imageURL || img.thumbURL}
                    alt={t(img, "caption") || "Ministry gallery"}
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <span className="gallery-tile__content">
                  <strong>
                    {t(img, "caption") ||
                      (language === "te"
                        ? "పరిచర్య క్షణం"
                        : "Ministry Moment")}
                  </strong>

                  {(t(img, "about") || img.about_en) && (
                    <em>{t(img, "about")}</em>
                  )}
                </span>
              </button>
            ))}
          </div>

          {visibleCount < images.length && (
            <div className="gallery-more">
              <button
                onClick={() =>
                  setVisibleCount((count) => count + 9)
                }
              >
                {language === "te"
                  ? "మరిన్ని చూడండి"
                  : "View More"}
              </button>
            </div>
          )}
        </>
      )}

      {activeIndex !== null && (
        <LightboxModal
          images={visibleImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onIndex={setActiveIndex}
        />
      )}
    </div>
  );
}
