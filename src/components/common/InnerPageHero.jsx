import React from "react";
import PageImageSlideshow from "./PageImageSlideshow";
import "./InnerPageHero.css";

export default function InnerPageHero({
  eyebrow,
  title,
  subtitle,
  images,
  fallbackImage,
  alt = "",
  reverse = false
}) {
  return (
    <section className={`inner-page-hero ${reverse ? "inner-page-hero--reverse" : ""}`}>
      <div className="inner-page-hero__inner">
        <div className="inner-page-hero__media">
          <PageImageSlideshow
            images={images}
            fallbackImage={fallbackImage}
            alt={alt}
            frameStyle="modern"
            aspectRatio="16 / 9"
          />
        </div>
        <div className="inner-page-hero__copy">
          {eyebrow && <span>{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
