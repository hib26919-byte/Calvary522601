import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { getPortfolioProfile } from "../components/about/leadershipProfiles";
import { trackPageView } from "../lib/analytics";
import "./PortfolioPage.css";

export default function PortfolioPage({ slug }) {
  const { aboutPage } = useContent();
  const { language } = useLanguage();

  const profile = useMemo(
    () => getPortfolioProfile(aboutPage || {}, language, slug),
    [aboutPage, language, slug]
  );

  useEffect(() => {
    trackPageView(`portfolio_${slug}`);
  }, [slug]);

  if (!profile) return <Navigate to="/about" replace />;

  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero__inner">
          <div className="portfolio-hero__copy">
            <span>Leadership Portfolio</span>
            <h1>{profile.name}</h1>
            <p className="portfolio-hero__role">{profile.role}</p>
            <p>{profile.bio}</p>
            <Link className="portfolio-hero__back" to="/about">
              Back to About
            </Link>
          </div>
          <PortfolioPortrait photoUrl={profile.photoUrl} name={profile.name} />
        </div>
      </section>

      <section className="section">
        <div className="container portfolio-details">
          <article>
            <span>{profile.years}</span>
            <h2>{profile.title}</h2>
            <p>{profile.bio}</p>
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container portfolio-gallery-section">
          <h2 className="section-title">Photo Gallery</h2>
          <div className="portfolio-gallery" aria-label={`${profile.name} portfolio gallery`}>
            {profile.galleryImages.length > 0 ? (
              profile.galleryImages.map((image) => (
                <PortfolioGalleryImage key={image.id} image={image} name={profile.name} />
              ))
            ) : (
              <div className="portfolio-gallery__empty">
                <span aria-hidden="true">✝</span>
                <p>Portfolio photos will appear here after upload.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function PortfolioPortrait({ photoUrl, name }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [photoUrl]);

  if (!photoUrl || failed) {
    return (
      <div className="portfolio-portrait portfolio-portrait--placeholder" aria-label={`${name} photo placeholder`}>
        <span aria-hidden="true">✝</span>
      </div>
    );
  }

  return (
    <div className="portfolio-portrait">
      <img src={photoUrl} alt={name} onError={() => setFailed(true)} />
    </div>
  );
}

function PortfolioGalleryImage({ image, name }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="portfolio-gallery__image portfolio-gallery__image--placeholder">
        <span aria-hidden="true">✝</span>
      </div>
    );
  }

  return (
    <figure className="portfolio-gallery__image">
      <img src={image.url} alt={image.alt || `${name} portfolio`} loading="lazy" onError={() => setFailed(true)} />
    </figure>
  );
}
