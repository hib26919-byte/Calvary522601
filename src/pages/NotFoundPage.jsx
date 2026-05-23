import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFoundPage() {
  const { language } = useLanguage();
  return (
    <main>
      <section className="page-hero"><div className="page-hero__content"><h1>404</h1><p>{language === "te" ? "ఈ పేజీ కనబడలేదు." : "This page could not be found."}</p><p><Link className="hero__cta hero__cta--primary" to="/">{language === "te" ? "హోమ్‌కు వెళ్లండి" : "Go Home"}</Link></p></div></section>
    </main>
  );
}
