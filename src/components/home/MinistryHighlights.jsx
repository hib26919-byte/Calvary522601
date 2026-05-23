import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import ScrollReveal from "../common/ScrollReveal";
import "./MinistryHighlights.css";

export default function MinistryHighlights() {
  const { ts, language } = useLanguage();
  const cards = [
    {
      to: "/tribal-outreach",
      title: ts("tribal_label"),
      body: language === "te" ? "మారుమూల గిరిజన గ్రామాలకు ప్రార్థన, ఆశ, ఆచరణాత్మక సహాయం." : "Prayer, hope, and practical care for remote tribal villages.",
      icon: "◇"
    },
    {
      to: "/childrens-ministry",
      title: ts("children_label"),
      body: language === "te" ? "దేవుని వాక్యంతో పిల్లల హృదయాలను ప్రేమగా పెంపొందించడం." : "Nurturing children's hearts with God's word and faithful care.",
      icon: "✚"
    }
  ];
  return (
    <section className="ministry-highlights">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{ts("ministries_label")}</h2>
          <p className="section-lead">{language === "te" ? "ప్రతి సేవలో కథ ఉంది. ప్రతి కథలో ఆశ ఉంది." : "Every ministry carries a story. Every story points toward hope."}</p>
        </ScrollReveal>
        <div className="ministry-highlights__grid">
          {cards.map((card, i) => (
            <ScrollReveal key={card.to} delay={i * 120}>
              <Link to={card.to} className="ministry-highlight-card">
                <span className="ministry-highlight-card__icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="ministry-highlight-card__link">{ts("read_more")} →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
