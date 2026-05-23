import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { DEFAULT_MINISTRY_CONTENT } from "../../lib/defaultContent";
import "./ScriptureVerse.css";

export default function ScriptureVerse({ reference, textKey, data, variant = "primary" }) {
  const { t, language } = useLanguage();
  const text = t(data, textKey);
  const refPrefix = textKey.split("_")[0];
  const ref = data?.[`${refPrefix}_reference`] || reference;
  const defaults = {
    verse1_text: {
      en: DEFAULT_MINISTRY_CONTENT.mark_en,
      te: DEFAULT_MINISTRY_CONTENT.mark_te
    },
    verse2_text: {
      en: DEFAULT_MINISTRY_CONTENT.psalm_en,
      te: DEFAULT_MINISTRY_CONTENT.psalm_te
    }
  };
  const displayText = text || defaults[textKey]?.[language] || defaults[textKey]?.en;
  return (
    <section className={`verse verse--${variant}`}>
      <div className="verse__container">
        <div className="verse__cross" aria-hidden="true">✚</div>
        <blockquote>
          <p>{displayText}</p>
          <cite>- {ref}</cite>
        </blockquote>
      </div>
    </section>
  );
}
