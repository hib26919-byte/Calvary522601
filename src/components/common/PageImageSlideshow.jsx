import React, { useEffect, useMemo, useState } from "react";
import "./PageImageSlideshow.css";

function getImageUrl(image) {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.url || image.imageURL || image.imageUrl || image.src || image.displayUrl || image.thumbUrl || image.thumbURL || "";
}

function getImageAlt(image, fallbackAlt) {
  if (!image || typeof image === "string") return fallbackAlt;
  return image.alt || image.alt_en || image.caption_en || fallbackAlt;
}

function normalizeImages(images, fallbackImage, fallbackAlt) {
  const source = Array.isArray(images) ? images : [];
  const cleaned = source
    .map((image, index) => ({
      id: typeof image === "object" && image?.id ? image.id : `${getImageUrl(image)}-${index}`,
      url: getImageUrl(image),
      alt: getImageAlt(image, fallbackAlt),
      order: typeof image === "object" && Number.isFinite(Number(image.order)) ? Number(image.order) : index
    }))
    .filter((image) => image.url)
    .sort((a, b) => a.order - b.order);

  if (cleaned.length > 0) return cleaned;
  return fallbackImage ? [{ id: "fallback", url: fallbackImage, alt: fallbackAlt, order: 0 }] : [];
}

export default function PageImageSlideshow({
  images,
  fallbackImage,
  alt = "",
  interval = 2600,
  showControls = true,
  frameStyle = "modern",
  aspectRatio = "16 / 9",
  className = ""
}) {
  const slides = useMemo(() => normalizeImages(images, fallbackImage, alt), [images, fallbackImage, alt]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const hasMultiple = slides.length > 1;

  useEffect(() => {
    setActive(0);
    setFailedImages({});
  }, [slides.length]);

  useEffect(() => {
    if (!hasMultiple || paused) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [hasMultiple, interval, paused, slides.length]);

  const goTo = (index) => setActive((index + slides.length) % slides.length);
  const activeFailed = failedImages[active];

  return (
    <div
      className={`page-slideshow page-slideshow--${frameStyle} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ "--slideshow-aspect": aspectRatio }}
    >
      <div className="page-slideshow__viewport">
        {slides.length === 0 || activeFailed ? (
          <div className="page-slideshow__fallback" aria-hidden="true">
            <span>+</span>
          </div>
        ) : (
          slides.map((slide, index) => (
            <img
              key={slide.id}
              className={`page-slideshow__image ${index === active ? "is-active" : ""}`}
              src={slide.url}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              onError={() => setFailedImages((prev) => ({ ...prev, [index]: true }))}
            />
          ))
        )}
      </div>

      {showControls && hasMultiple && (
        <div className="page-slideshow__controls" aria-label="Slideshow controls">
          <button type="button" onClick={() => goTo(active - 1)} title="Previous image" aria-label="Previous image">
            &lt;
          </button>
          <div className="page-slideshow__dots">
            {slides.map((slide, index) => (
              <button
                key={`${slide.id}-dot`}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => goTo(index)}
                title={`Show image ${index + 1}`}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(active + 1)} title="Next image" aria-label="Next image">
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
