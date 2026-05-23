import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import "./AboutSections.css";

export default function LeaderProfile() {
  const { t, language } = useLanguage();
  const { aboutPage } = useContent();
  return (
    <section className="section">
      <div className="container leader-profile">
        <div className="leader-profile__photo">
          {aboutPage?.leaderPhotoURL ? <img src={public/A.Prasanth_Calvary_Prema_Ministries.webp} alt={t(aboutPage, "leaderName")} /> : <div>✚</div>}
        </div>
        <div>
          <span className="eyebrow">{language === "te" ? "ప్రస్తుత నాయకత్వం" : "Present Leadership"}</span>
          <h2 className="section-title">{t(aboutPage, "leaderName") || (language === "te" ? "స్థాపకుని కుమారుడు" : "The Founder's Son")}</h2>
          <p className="section-lead">{t(aboutPage, "leaderBio") || (language === "te" ? "తండ్రి ప్రారంభించిన సేవను కొనసాగిస్తూ, 18 సంవత్సరాల వయస్సులో బాప్తిస్మము పొంది, దేవుని వాక్యము మరియు సేవ ద్వారా ఇతరులకు ప్రేరణగా నిలవాలని కోరుకుంటున్నారు." : "He continues the work his father began, took baptism at the age of 18, and seeks to become an inspiration and servant for others through God's word and service.")}</p>
        </div>
      </div>
    </section>
  );
}

