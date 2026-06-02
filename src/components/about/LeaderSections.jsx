import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { useLanguage } from "../../context/LanguageContext";
import { buildLeaderProfiles } from "./leadershipProfiles";
import "./LeaderSections.css";

export default function LeaderSections() {
  const { aboutPage } = useContent();
  const { language } = useLanguage();
  const [activeProfile, setActiveProfile] = useState(null);

  const leaders = useMemo(
    () => buildLeaderProfiles(aboutPage || {}, language),
    [aboutPage, language]
  );

  return (
    <section className="leader-sections" aria-labelledby="leadership-title">
      <div className="leader-sections__inner">
        <div className="leader-sections__header">
          <span>Leadership</span>
          <h2 id="leadership-title">A Family Carrying the Ministry Forward</h2>
          <p>Meet the ministry leaders and view each person's own portfolio.</p>
        </div>

        <div className="leader-sections__grid" aria-label="Leadership profiles">
          {leaders.map((leader) => (
            <article className="leader-card" key={leader.key}>
              <LeaderPhoto photoUrl={leader.photoUrl} name={leader.name} />
              <div className="leader-card__body">
                <span className="leader-card__role">{leader.role}</span>
                <h3>{leader.name}</h3>
                <p className="leader-card__title">{leader.title}</p>
                {leader.years && <strong>{leader.years}</strong>}
              </div>
              <button
                type="button"
                className="leader-card__button"
                onClick={() => setActiveProfile(leader)}
              >
                View Portfolio →
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeProfile && (
        <LeaderPortfolioModal
          profile={activeProfile}
          onClose={() => setActiveProfile(null)}
        />
      )}
    </section>
  );
}

function LeaderPhoto({ photoUrl, name }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [photoUrl]);

  if (!photoUrl || failed) {
    return (
      <div className="leader-photo leader-photo--placeholder" aria-label={`${name} photo placeholder`}>
        <span aria-hidden="true">✝</span>
      </div>
    );
  }

  return (
    <div className="leader-photo">
      <img src={photoUrl} alt={name} loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
}

function LeaderPortfolioModal({ profile, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("leader-modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("leader-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="leader-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="leader-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`leader-modal-title-${profile.key}`}
      >
        <button type="button" className="leader-modal__close" onClick={onClose} aria-label="Close portfolio">
          X
        </button>

        <div className="leader-modal__intro">
          <LeaderPhoto photoUrl={profile.photoUrl} name={profile.name} />
          <div>
            <span>{profile.role}</span>
            <h3 id={`leader-modal-title-${profile.key}`}>{profile.name}</h3>
            <p className="leader-modal__title">{profile.title}</p>
            <p>{profile.bio}</p>
          </div>
        </div>

        <div className="leader-modal__gallery" aria-label={`${profile.name} photo gallery`}>
          {profile.galleryImages.length > 0 ? (
            profile.galleryImages.map((image) => (
              <PortfolioImage key={image.id} image={image} name={profile.name} />
            ))
          ) : (
            <div className="leader-modal__empty">
              <span aria-hidden="true">✝</span>
              <p>Portfolio photos will appear here after upload.</p>
            </div>
          )}
        </div>

        {profile.portfolioPath && (
          <Link className="leader-modal__page-link" to={profile.portfolioPath} onClick={onClose}>
            Open full portfolio →
          </Link>
        )}
      </section>
    </div>
  );
}

function PortfolioImage({ image, name }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="leader-modal__image leader-modal__image--placeholder">
        <span aria-hidden="true">✝</span>
      </div>
    );
  }

  return (
    <figure className="leader-modal__image">
      <img src={image.url} alt={image.alt || `${name} portfolio`} loading="lazy" onError={() => setFailed(true)} />
    </figure>
  );
}
