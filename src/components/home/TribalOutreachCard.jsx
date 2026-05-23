import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import ScrollReveal from "../common/ScrollReveal";
import "./OutreachCard.css";

const TRIBAL_IMAGE_URL = "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&w=1100&q=80";
const CONTENT = {
  badge_en: "Ministry Focus",
  badge_te: "పరిచర్య దృష్టి",
  title_en: "Tribal Outreach",
  title_te: "గిరిజన సేవ",
  desc_en: "Our tribal outreach carries forward the torch lit by Ravi Children & Tribal Ministry, bringing the love of Christ to remote tribal villages across Andhra Pradesh through prayer, presence, and compassionate support.",
  desc_te: "రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీ వెలిగించిన జ్యోతిని ముందుకు తీసుకెళ్తూ, ఆంధ్రప్రదేశ్‌లోని మారుమూల గిరిజన గ్రామాలకు ప్రార్థన, సమీపం మరియు ప్రేమతో సహాయం అందిస్తున్నాం.",
  stat1_en: "30+ Villages",
  stat1_te: "30+ గ్రామాలు",
  stat2_en: "500+ Families",
  stat2_te: "500+ కుటుంబాలు",
  stat3_en: "Since 2000",
  stat3_te: "2000 నుండి",
  cta_en: "Learn About Tribal Outreach",
  cta_te: "గిరిజన సేవ గురించి తెలుసుకోండి"
};

export default function TribalOutreachCard() {
  const { language } = useLanguage();
  const read = (key) => CONTENT[`${key}_${language}`] || CONTENT[`${key}_en`];
  return (
    <section className="outreach-card outreach-card--tribal" aria-label="Tribal Outreach">
      <div className="outreach-card__container outreach-card__container--image-left">
        <ScrollReveal direction="left">
          <div className="outreach-card__image-wrap outreach-card__image-wrap--cut-right">
            <img src={TRIBAL_IMAGE_URL} alt="Tribal outreach ministry serving Indian tribal communities" className="outreach-card__image" loading="lazy" />
            <div className="outreach-card__image-glow" /><div className="outreach-card__cross-mark">✚</div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={200}>
          <div className="outreach-card__content">
            <span className="outreach-card__badge">{read("badge")}</span>
            <h2>{read("title")}</h2>
            <p>{read("desc")}</p>
            <div className="outreach-card__stats">{["stat1", "stat2", "stat3"].map((k) => <div key={k} className="outreach-card__stat"><span>{read(k)}</span></div>)}</div>
            <Link to="/tribal-outreach" className="outreach-card__cta">{read("cta")} <span>→</span></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
