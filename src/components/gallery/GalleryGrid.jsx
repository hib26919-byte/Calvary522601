import React, { useEffect, useMemo, useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useLanguage } from "../../context/LanguageContext";
import { activeGalleryCategories, findGalleryCategory, imageMatchesCategory } from "../../lib/galleryCategories";
import LightboxModal from "./LightboxModal";
import "./Gallery.css";

export default function GalleryGrid({ category }) {
  const { gallery, galleryCategories } = useContent();
  const { t, language } = useLanguage();
  const categories = useMemo(() => activeGalleryCategories(galleryCategories), [galleryCategories]);

  const [filter, setFilter] = useState(category || "all");
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setFilter(category || "all");
    setVisibleCount(9);
    setActiveIndex(null);
  }, [category]);

  const images = useMemo(() => {
    if (filter === "all") return gallery;

    const selectedCategory = findGalleryCategory(categories, filter);
    if (!selectedCategory) {
      return gallery.filter((img) => img.categoryId === filter || img.category === filter);
    }

    return gallery.filter((img) => imageMatchesCategory(img, selectedCategory));
  }, [categories, filter, gallery]);

  const visibleImages = images.slice(0, visibleCount);

  function changeFilter(value) {
    setFilter(value);
    setVisibleCount(9);
    setActiveIndex(null);
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
            loading="lazy"
            decoding="async"
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
      </div>

      {!category && (
        <div className="gallery-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => changeFilter("all")}
          >
            {language === "te" ? "అన్నీ" : "All"}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              className={filter === cat.id ? "active" : ""}
              onClick={() => changeFilter(cat.id)}
              style={cat.color ? { "--gallery-category-color": cat.color } : undefined}
            >
              {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
              {cat.categoryName}
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
                    src={img.imageURL || img.url || img.thumbURL || img.thumbUrl}
                    alt={t(img, "caption") || "Ministry gallery"}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
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
