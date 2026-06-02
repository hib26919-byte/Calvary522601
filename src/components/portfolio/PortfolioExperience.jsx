import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageImageSlideshow from "../common/PageImageSlideshow";
import useCounter from "../../hooks/useCounter";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./PortfolioExperience.css";

function copy(value, language = "en") {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] || value.en || "";
}

function phoneHref(phone) {
  const digits = String(phone || "").replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "/contact";
}

function contactValue(contactPage, language, field, fallback) {
  return contactPage?.[`${field}_${language}`] || contactPage?.[`${field}_en`] || contactPage?.[field] || fallback;
}

export default function PortfolioExperience({ config, profile, language, contactPage }) {
  const [activeShort, setActiveShort] = useState(0);
  const name = profile?.name || "";
  const role = profile?.role || copy(config.heroEyebrow, language);
  const bio = profile?.bio || copy(config.heroTagline, language);

  const heroImages = useMemo(() => {
    if (profile?.galleryImages?.length) return profile.galleryImages;
    if (profile?.photoUrl) return [{ id: "profile-photo", url: profile.photoUrl, alt: name }];
    return [];
  }, [name, profile?.galleryImages, profile?.photoUrl]);

  const shortImages = useMemo(() => {
    const sourceImages = heroImages.length ? heroImages : [{ id: "fallback", url: config.fallbackImage, alt: name }];
    return config.shorts.map((short, index) => ({
      ...short,
      image: sourceImages[index % sourceImages.length]?.url || config.fallbackImage
    }));
  }, [config.fallbackImage, config.shorts, heroImages, name]);

  const phone = contactValue(contactPage, language, "phone", "+91 8179305085");
  const email = contactValue(contactPage, language, "email", "calvaryprema@gmail.com");
  const address = contactValue(
    contactPage,
    language,
    "address",
    "Gogulapadu Village, Rompicherla, Andhra Pradesh"
  );

  return (
    <main className={`portfolio-xp ${config.theme}-page portfolio-xp--${config.variant}`} lang={language}>
      <PortfolioNav config={config} />

      <section className="port-hero" id="top">
        <div className="port-hero__grid">
          <div className="port-hero__media-shell">
            <div className="port-hero__mark" aria-hidden="true">+</div>
            <PageImageSlideshow
              images={heroImages}
              fallbackImage={config.fallbackImage}
              alt={`${name} portfolio`}
              interval={3200}
              showControls={false}
              frameStyle="minimal"
              aspectRatio={config.variant === "circle" ? "1 / 1" : "4 / 5"}
              className="port-hero__slideshow"
            />
            <div className="port-hero__float-stack" aria-label="Highlights">
              {config.heroBadges.map((badge, index) => (
                <div className="port-hero__badge" key={`${badge.value}-${index}`} style={{ "--delay": `${index * 120}ms` }}>
                  <strong>{badge.value}</strong>
                  <span>{copy(badge.label, language)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="port-hero__copy">
            <span className="port-eyebrow">{copy(config.heroEyebrow, language)}</span>
            <h1>{name}</h1>
            <p className="port-hero__role">{role}</p>
            <p className="port-hero__tagline">{bio || copy(config.heroTagline, language)}</p>
            <blockquote className="port-hero__verse">
              <span>{config.heroVerse.reference}</span>
              {copy(config.heroVerse, language)}
            </blockquote>
            <div className="port-hero__actions">
              <a className="port-btn port-btn--primary" href="#gallery">View Gallery</a>
              <Link className="port-btn port-btn--outline" to="/contact">Contact Ministry</Link>
            </div>
          </div>
        </div>
        <a className="port-scroll" href="#story" aria-label="Scroll to story">
          <span>Scroll</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <Marquee items={config.marqueeTop} />
      <StorySection config={config} language={language} />
      <VerseBlock verse={config.verses[0]} language={language} tone="primary" />
      <StatsSection config={config} language={language} />
      <ShortsSection
        config={config}
        language={language}
        activeShort={activeShort}
        setActiveShort={setActiveShort}
        shorts={shortImages}
      />
      <SkillsSection config={config} language={language} />
      <TimelineSection config={config} language={language} />
      <VerseBlock verse={config.verses[1]} language={language} tone="secondary" />
      <GallerySection config={config} language={language} profile={profile} heroImages={heroImages} name={name} />
      <JourneySection config={config} language={language} />
      <TestimonialsSection config={config} language={language} />
      <Marquee items={config.marqueeBottom} reverse />
      <ConnectSection config={config} language={language} phone={phone} email={email} address={address} />
      <PortfolioFooter config={config} language={language} />
    </main>
  );
}

function PortfolioNav({ config }) {
  return (
    <nav className="port-nav" aria-label="Portfolio navigation">
      <Link className="port-nav__brand" to="/about">
        <img src="/logo.png" alt="Calvary Prema Ministries" />
        <span>Calvary Prema</span>
      </Link>
      <div className="port-nav__links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <span>{config.navVerse}</span>
      </div>
    </nav>
  );
}

function Marquee({ items, reverse = false }) {
  const repeated = [...items, ...items, ...items];
  return (
    <section className={`port-marquee ${reverse ? "port-marquee--reverse" : ""}`} aria-label="Ministry highlights">
      <div className="port-marquee__track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function RevealSection({ children, className = "", id, threshold = 0.15 }) {
  const [ref, visible] = useScrollReveal(threshold);
  return (
    <section id={id} ref={ref} className={`${className} port-reveal ${visible ? "is-visible" : ""}`}>
      {children}
    </section>
  );
}

function SectionHeader({ kicker, title, lead }) {
  return (
    <div className="port-section-head">
      <span>{kicker}</span>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}

function StorySection({ config, language }) {
  return (
    <RevealSection id="story" className="port-story">
      <div className="port-container port-story__grid">
        <div>
          <SectionHeader
            kicker={copy(config.story.eyebrow, language)}
            title={copy(config.story.title, language)}
          />
          <blockquote className="port-story__quote">{copy(config.story.quote, language)}</blockquote>
        </div>
        <div className="port-story__body">
          {config.story.paragraphs.map((paragraph, index) => (
            <p key={index}>{copy(paragraph, language)}</p>
          ))}
          <article className="port-story__legacy">
            <span aria-hidden="true">+</span>
            <div>
              <h3>{copy(config.story.cardTitle, language)}</h3>
              <p>{copy(config.story.cardText, language)}</p>
            </div>
          </article>
        </div>
      </div>
    </RevealSection>
  );
}

function VerseBlock({ verse, language, tone }) {
  return (
    <RevealSection className={`port-verse port-verse--${tone}`} threshold={0.2}>
      <div className="port-container port-verse__inner">
        <span>{verse.reference}</span>
        <p>{copy(verse, language)}</p>
      </div>
    </RevealSection>
  );
}

function StatsSection({ config, language }) {
  const [ref, visible] = useScrollReveal(0.25);

  return (
    <section ref={ref} className={`port-stats port-reveal ${visible ? "is-visible" : ""}`}>
      <div className="port-container port-stats__grid">
        {config.stats.map((stat, index) => (
          <StatCard key={stat.label.en} stat={stat} language={language} active={visible} index={index} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, language, active, index }) {
  const count = useCounter(stat.value, 1800 + index * 120, active);

  return (
    <article className="port-stat" style={{ "--delay": `${index * 90}ms` }}>
      <strong>{count}{stat.suffix}</strong>
      <span>{copy(stat.label, language)}</span>
    </article>
  );
}

function ShortsSection({ config, language, shorts, activeShort, setActiveShort }) {
  return (
    <RevealSection className="port-shorts" threshold={0.2}>
      <div className="port-container">
        <SectionHeader
          kicker="Ministry In Motion"
          title={config.theme === "pk" ? "Village moments, carried with fire." : "Children's moments, held with grace."}
          lead={config.theme === "pk" ? "Short-form ministry cards ready for future video uploads." : "A visual reel for classes, visits, prayer, and family care."}
        />
        <div className="port-shorts__grid">
          {shorts.map((short, index) => (
            <button
              className={`port-short ${activeShort === index ? "is-active" : ""}`}
              key={copy(short.title, language)}
              type="button"
              onClick={() => setActiveShort(index)}
              style={{ "--delay": `${index * 80}ms` }}
            >
              <span className="port-short__media">
                <img src={short.image} alt={copy(short.title, language)} loading="lazy" />
                <i aria-hidden="true">{activeShort === index ? "||" : ">"}</i>
              </span>
              <span className="port-short__copy">
                <strong>{copy(short.title, language)}</strong>
                <small>{short.meta}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function SkillsSection({ config, language }) {
  const [ref, visible] = useScrollReveal(0.2);

  return (
    <section ref={ref} className={`port-skills port-reveal ${visible ? "is-visible" : ""}`}>
      <div className="port-container">
        <SectionHeader
          kicker="Formation"
          title={config.theme === "pk" ? "Qualities shaped by mission." : "Qualities shaped by patient care."}
        />
        <div className="port-skills__grid">
          {config.skills.map((skill, index) => (
            <article
              className="port-skill"
              key={skill.verse}
              style={{
                "--level": visible ? `${skill.level}%` : "0%",
                "--delay": `${index * 80}ms`
              }}
            >
              <div className="port-skill__top">
                <h3>{copy(skill.name, language)}</h3>
                <span>{skill.level}%</span>
              </div>
              <div className="port-skill__bar" aria-hidden="true">
                <i />
              </div>
              <small>{skill.verse}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ config, language }) {
  return (
    <RevealSection className="port-timeline-section" threshold={0.12}>
      <div className="port-container">
        <SectionHeader
          kicker="Journey"
          title={config.theme === "pk" ? "A timeline of calling and courage." : "A timeline of care and preparation."}
        />
        <div className="port-timeline">
          {config.timeline.map((event, index) => (
            <article className="port-timeline__item" key={`${event.year}-${event.verse}`} style={{ "--delay": `${index * 90}ms` }}>
              <div className="port-timeline__year">{event.year}</div>
              <div className="port-timeline__card">
                <h3>{copy(event.title, language)}</h3>
                <p>{copy(event.text, language)}</p>
                <span>{event.verse}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function GallerySection({ config, language, profile, heroImages, name }) {
  return (
    <RevealSection id="gallery" className="port-gallery-section" threshold={0.18}>
      <div className="port-container">
        <SectionHeader
          kicker="Gallery"
          title={language === "te" ? "సేవా చిత్రాలు" : "Ministry photo gallery."}
          lead={language === "te" ? "అడ్మిన్ అప్లోడ్ చేసిన చిత్రాలు ఇక్కడ కనిపిస్తాయి." : "Admin-uploaded portfolio photos appear here automatically."}
        />
        <div className="port-gallery">
          <PageImageSlideshow
            images={profile?.galleryImages?.length ? profile.galleryImages : heroImages}
            fallbackImage={config.fallbackImage}
            alt={`${name} portfolio gallery`}
            interval={2800}
            showControls
            frameStyle="minimal"
            aspectRatio="16 / 9"
            className="port-gallery__slideshow"
          />
        </div>
      </div>
    </RevealSection>
  );
}

function JourneySection({ config, language }) {
  return (
    <RevealSection className="port-journey-section" threshold={0.2}>
      <div className="port-container">
        <article className="port-journey">
          <div className="port-journey__mark">{config.journey.mark}</div>
          <div>
            <span>{copy(config.journey.label, language)}</span>
            <h2>{copy(config.journey.title, language)}</h2>
            <p>{copy(config.journey.text, language)}</p>
            <small>{config.journey.verse}</small>
          </div>
          <i aria-hidden="true">-&gt;</i>
        </article>
      </div>
    </RevealSection>
  );
}

function TestimonialsSection({ config, language }) {
  return (
    <RevealSection className="port-testimonials" threshold={0.16}>
      <div className="port-container">
        <SectionHeader
          kicker="Testimony"
          title={config.theme === "pk" ? "Community voices from the field." : "Family voices from the ministry."}
        />
        <div className="port-testimonials__grid">
          {config.testimonials.map((item, index) => (
            <article className="port-testimony" key={item.author} style={{ "--delay": `${index * 90}ms` }}>
              <span className="port-testimony__label">Faith testimony</span>
              <p>"{copy(item.quote, language)}"</p>
              <strong>{item.author}</strong>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function ConnectSection({ config, language, phone, email, address }) {
  return (
    <section className="port-connect">
      <div className="port-container port-connect__inner">
        <span aria-hidden="true" className="port-connect__cross">+</span>
        <h2>{copy(config.connect.title, language)}</h2>
        <p>{copy(config.connect.text, language)}</p>
        <div className="port-connect__actions">
          <a className="port-btn port-btn--primary" href={phoneHref(phone)}>{phone}</a>
          <Link className="port-btn port-btn--outline" to="/contact">Send Message</Link>
          <Link className="port-btn port-btn--ghost" to="/about">Back To About</Link>
        </div>
        <div className="port-connect__meta">
          <span>{email}</span>
          <span>{address}</span>
        </div>
      </div>
    </section>
  );
}

function PortfolioFooter({ config, language }) {
  return (
    <footer className="port-footer">
      <span aria-hidden="true">+</span>
      <p>{copy(config.footerVerse, language)}</p>
      <small>Calvary Prema Ministries</small>
    </footer>
  );
}
