import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import ScrollReveal from "../common/ScrollReveal";
import "./OutreachCard.css";

const CHILDREN_IMAGE_URL = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1100&q=80";
const CONTENT = {
  badge_en: "Faith Formation",
  badge_te: "విశ్వాస పెంపకం",
  title_en: "Children's Ministry",
  title_te: "పిల్లల పరిచర్య",
  desc_en: "Children are met with tenderness, Scripture, prayer, and joyful community. This ministry creates spaces where young hearts can feel seen, loved, and rooted in God's word.",
  desc_te: "పిల్లలకు ప్రేమతో, దేవుని వాక్యంతో, ప్రార్థనతో మరియు ఆనందకరమైన సమాజంతో సేవ చేస్తాం. ప్రతి చిన్న హృదయం దేవుని ప్రేమలో పెరగాలి అనేది మా కోరిక.",
  stat1_en: "1000+ Children",
  stat1_te: "1000+ పిల్లలు",
  stat2_en: "Faith Lessons",
  stat2_te: "విశ్వాస పాఠాలు",
  stat3_en: "Community Care",
  stat3_te: "సమాజ సేవ",
  cta_en: "Explore Children's Ministry",
  cta_te: "పిల్లల పరిచర్యను చూడండి"
};

export default function ChildrensMinistryCard() {
  const { language } = useLanguage();
  const read = (key) => CONTENT[`${key}_${language}`] || CONTENT[`${key}_en`];
  return (
    <section className="outreach-card outreach-card--children" aria-label="Children's Ministry">
      <div className="outreach-card__container outreach-card__container--image-right">
        <ScrollReveal direction="right">
          <div className="outreach-card__image-wrap outreach-card__image-wrap--cut-left">
            <img src={CHILDREN_IMAGE_URL} alt="Children's ministry gathering" className="outreach-card__image" loading="lazy" />
            <div className="outreach-card__image-glow" /><div className="outreach-card__cross-mark">✚</div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="left" delay={200}>
          <div className="outreach-card__content">
            <span className="outreach-card__badge">{read("badge")}</span>
            <h2>{read("title")}</h2>
            <p>{read("desc")}</p>
            <div className="outreach-card__stats">{["stat1", "stat2", "stat3"].map((k) => <div key={k} className="outreach-card__stat"><span>{read(k)}</span></div>)}</div>
            <Link to="/childrens-ministry" className="outreach-card__cta">{read("cta")} <span>→</span></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
