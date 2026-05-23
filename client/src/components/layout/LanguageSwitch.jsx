import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSwitch.css";

export default function LanguageSwitch() {
  const { toggleLanguage, isTelugu } = useLanguage();
  return (
    <button className="lang-switch" onClick={toggleLanguage} role="switch" aria-checked={isTelugu} aria-label="Toggle language between Telugu and English">
      <span className={`lang-label ${!isTelugu ? "active" : ""}`}>EN</span>
      <span className={`lang-track ${isTelugu ? "te" : "en"}`}><span className="lang-thumb" /></span>
      <span className={`lang-label ${isTelugu ? "active" : ""}`}>తె</span>
    </button>
  );
}
