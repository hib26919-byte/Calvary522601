import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import "./AboutSections.css";

export default function LeaderProfile() {
  const { t } = useLanguage();
  const { aboutPage } = useContent();
  const name = t(aboutPage, "son2Name") || "A. Prasanth";
  const bio =
    t(aboutPage, "son2Bio") ||
    "Continuing the ministry with faith, prayer, and a heart for church, tribal, and children's ministry.";

  return (
    <section className="section">
      <div className="container leader-profile">
        <div className="leader-profile__photo">
          {aboutPage?.son2PhotoURL ? (
            <img src={aboutPage.son2PhotoURL} alt={name} />
          ) : (
            <div aria-label={`${name} photo placeholder`}>
              <span aria-hidden="true">✝</span>
            </div>
          )}
        </div>
        <div>
          <span className="eyebrow">Present Leadership</span>
          <h2 className="section-title">{name}</h2>
          <p className="section-lead">{bio}</p>
        </div>
      </div>
    </section>
  );
}
