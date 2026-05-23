import React from "react";
import "./MinistryArtSection.css";

export default function MinistryArtSection({ title, text, imageUrl, fallbackTone = "children" }) {
  return (
    <section className={`ministry-art ministry-art--${fallbackTone}`}>
      <div className="ministry-art__inner">
        <div className="ministry-art__copy">
          <span>Faith in action</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="ministry-art__visual">
          {imageUrl ? <img src={imageUrl} alt={title} /> : (
            <div className="ministry-art__placeholder">
              <div className="ministry-art__cross">✚</div>
              <div className="ministry-art__light" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
