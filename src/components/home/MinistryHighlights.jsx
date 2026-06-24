import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { useLanguage } from "../../context/LanguageContext";
import { activeHomeSections, localizeDynamic } from "../../lib/dynamicContent";
import ScrollReveal from "../common/ScrollReveal";
import "./MinistryHighlights.css";

export default function MinistryHighlights() {
  const { ts, language } = useLanguage();
  const { homeSections } = useContent();
  const cards = activeHomeSections(homeSections);

  return (
    <section className="ministry-highlights">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{ts("ministries_label")}</h2>
          <p className="section-lead">Every ministry carries a story. Every story points toward hope.</p>
        </ScrollReveal>

        <div className="ministry-highlights__grid">
          {cards.map((card, i) => {
            const title = localizeDynamic(card, "title", language, ts);
            const subtitle = localizeDynamic(card, "subtitle", language, ts);
            const description = localizeDynamic(card, "description", language, ts);
            const buttonText = localizeDynamic(card, "buttonText", language, ts) || ts("read_more");

            return (
              <ScrollReveal key={card.id} delay={i * 120}>
                <Link
                  to={card.link || "#"}
                  className="ministry-highlight-card"
                  style={card.color ? { "--home-section-color": card.color } : undefined}
                >
                  {card.imageURL && (
                    <span className="ministry-highlight-card__image">
                      <img src={card.imageURL} alt={title} loading="lazy" decoding="async" />
                    </span>
                  )}
                  <span className="ministry-highlight-card__icon">{card.icon}</span>
                  <h3>{title}</h3>
                  {subtitle && <strong>{subtitle}</strong>}
                  <p>{description}</p>
                  <span className="ministry-highlight-card__link">{buttonText} <span aria-hidden="true">-&gt;</span></span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
