import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGES, MINISTRY_STORY_EN, MINISTRY_STORY_TE } from "../../lib/defaultContent";
import { useLanguage } from "../../context/LanguageContext";
import ScrollReveal from "../common/ScrollReveal";
import "./VisionStorySection.css";

export default function VisionStorySection() {
  const { language } = useLanguage();
  const story = language === "te" ? MINISTRY_STORY_TE : MINISTRY_STORY_EN;

  return (
    <section className="vision-story">
      <div className="vision-story__wrap">
        <ScrollReveal direction="left">
          <div className="vision-story__frames">
            <div className="vision-story__frame vision-story__frame--one"><img src={DEFAULT_IMAGES.church} alt="" /></div>
            <div className="vision-story__frame vision-story__frame--two"><img src={DEFAULT_IMAGES.prayer} alt="" /></div>
            <div className="vision-story__year">2018</div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={140}>
          <div className="vision-story__content">
            <span className="vision-story__eyebrow">{language === "te" ? "పరిచర్య ప్రయాణం" : "Ministry Journey"}</span>
            <h2>{language === "te" ? "విశ్వాసంతో కొనసాగుతున్న పిలుపు" : "A Calling Continued With Faith"}</h2>
            <div className="rich-content" dangerouslySetInnerHTML={{ __html: story }} />
            <Link to="/about" className="vision-story__link">{language === "te" ? "మా కథ చదవండి" : "Read the full story"} →</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
