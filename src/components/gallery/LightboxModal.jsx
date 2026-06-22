import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function LightboxModal({ images, index, onClose, onIndex }) {
  const { t } = useLanguage();
  const image = images[index];
  if (!image) return null;
  const prev = () => onIndex((index - 1 + images.length) % images.length);
  const next = () => onIndex((index + 1) % images.length);
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image">
      <button className="lightbox__backdrop" onClick={onClose} aria-label="Close" />
      <div className="lightbox__panel">
        <button className="lightbox__close" onClick={onClose}>×</button>
        {images.length > 1 && <button className="lightbox__nav lightbox__nav--prev" onClick={prev}>‹</button>}
        <img src={image.imageURL || image.thumbURL || image.thumbUrl} alt={t(image, "caption") || "Ministry gallery"} decoding="async" />
        {images.length > 1 && <button className="lightbox__nav lightbox__nav--next" onClick={next}>›</button>}
        {(t(image, "caption") || t(image, "about")) && <p><strong>{t(image, "caption")}</strong>{t(image, "about") && <span>{t(image, "about")}</span>}</p>}
      </div>
    </div>
  );
}
