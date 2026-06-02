import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { DEFAULT_IMAGES, DEFAULT_MINISTRY_CONTENT } from "../../lib/defaultContent";
import PageImageSlideshow from "../common/PageImageSlideshow";
import "./HeroSection.css";

export default function HeroSection({ data }) {
  const { t, ts, language } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(id);
  }, []);

  const fallbackSubtitle = language === "te"
    ? "చర్చి పరిచర్య, గిరిజన సేవ మరియు పిల్లల పరిచర్య ద్వారా క్రీస్తు ప్రేమను పంచుతున్నాం"
    : "Sharing the love of Christ through church ministry, tribal outreach, and children's ministry.";
  const heroTitle = t(data, "heroTitle") || (language === "te" ? "దేవుని ప్రేమతో సమాజాలను బలపరచడం" : "Faith, Service, and Hope for Every Community");
  const heroSubtitle = t(data, "heroSubtitle") || fallbackSubtitle;
  const heroCTA = t(data, "heroCTAText") || ts("hero_cta");
  const heroLink = data?.heroCTALink || "/about";
  const bgImage = data?.heroImageURL || DEFAULT_IMAGES.hero;
  const mission = language === "te" ? DEFAULT_MINISTRY_CONTENT.mission_te : DEFAULT_MINISTRY_CONTENT.mission_en;

  return (
    <section className={`hero ${loaded ? "hero--loaded" : ""}`} aria-label="Hero Section">
      <div className="hero__bg">
        <div className="hero__bg-gradient" aria-hidden="true" />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__cross-bg" aria-hidden="true"><svg viewBox="0 0 100 140"><rect x="40" y="0" width="20" height="140" fill="white" opacity="0.045" rx="4"/><rect x="0" y="45" width="100" height="20" fill="white" opacity="0.045" rx="4"/></svg></div>
      </div>

      <div className="hero__layout hero__layout--single">
        <div className="hero__content hero__content--center">
          <div className="hero__badge"><span className="hero__badge-dot" /> Calvary Prema Ministries - Since 2000</div>
          <p className="hero__kicker">{language === "te" ? "విశ్వాసం • సేవ • మార్గదర్శకత్వం" : "Faith • Service • Guidance"}</p>
          <h1 className="hero__title">{heroTitle}</h1>
          <p className="hero__subtitle">{heroSubtitle}</p>
          <div className="hero__actions">
            <Link to={heroLink} className="hero__cta hero__cta--primary">{heroCTA}</Link>
            <Link to="/contact" className="hero__cta hero__cta--secondary">{ts("contact_us")}</Link>
          </div>
        </div>

        <div className="hero__single-image">
          <PageImageSlideshow
            images={data?.heroImages}
            fallbackImage={bgImage}
            alt="Calvary Prema Ministries"
            frameStyle="modern"
            aspectRatio="var(--hero-slideshow-aspect, 16 / 8)"
          />
          <div className="hero__scripture-note">
            <strong>{DEFAULT_MINISTRY_CONTENT.psalm_ref}</strong>
            <span>{language === "te" ? DEFAULT_MINISTRY_CONTENT.psalm_te : "The Lord is my strength and my shield."}</span>
          </div>
        </div>

        <p className="hero__mission">{mission}</p>
      </div>

      <div className="hero__wave" aria-hidden="true"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-off-white)" /></svg></div>
    </section>
  );
}
