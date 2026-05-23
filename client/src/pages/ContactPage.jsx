import React, { useEffect } from "react";
import ContactForm from "../components/contact/ContactForm";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import { DEFAULT_IMAGES, DEFAULT_MINISTRY_CONTENT } from "../lib/defaultContent";
import "./ContactPage.css";
import MinistryArtSection from "../components/common/MinistryArtSection";

export default function ContactPage() {
  const { contactPage, globalSettings } = useContent();
  const { t, ts, language } = useLanguage();
  useEffect(() => { trackPageView("contact"); }, []);

  const address = t(contactPage, "address") || (language === "te" ? DEFAULT_MINISTRY_CONTENT.address_te : DEFAULT_MINISTRY_CONTENT.address_en);
  const phone = globalSettings?.phone || contactPage?.phone || "81793 05085";
  const email = contactPage?.email || globalSettings?.email || "";
  const mapUrl = contactPage?.mapEmbedURL || "https://www.google.com/maps?q=Gogulapadu%20Rompicherla%20Palnadu%20Andhra%20Pradesh%20522617&output=embed";

  return (
    <main>
      <section className="page-hero">
        <img src={contactPage?.heroImageURL || DEFAULT_IMAGES.prayer} alt="" className="page-hero__image" />
        <div className="page-hero__content">
          <h1>{t(contactPage, "heroTitle") || ts("contact_label")}</h1>
          <p>{t(contactPage, "heroSubtitle") || (language === "te" ? "ప్రార్థన, సందర్శన, లేదా పరిచర్య గురించి మాట్లాడడానికి మమ్మల్ని సంప్రదించండి." : "Reach out for prayer, a visit, or a conversation about the ministry.")}</p>
        </div>
      </section>

      <section className="contact-hub">
        <div className="contact-hub__grid">
          <div className="contact-hub__info">
            <span>{language === "te" ? "సంప్రదింపు కేంద్రం" : "Contact Center"}</span>
            <h2>{language === "te" ? "ప్రార్థనకు, సందర్శనకు, సేవకు మేము సిద్ధంగా ఉన్నాం" : "We are available for prayer, visits, and ministry conversations"}</h2>
            <div className="contact-info-card">
              <strong>{ts("address_label")}</strong>
              <p>{address}</p>
            </div>
            <div className="contact-info-row">
              <a href={`tel:+91${phone.replace(/[^\d]/g, "").replace(/^91/, "")}`}>Call {phone}</a>
              {email && <a href={`mailto:${email}`}>{email}</a>}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <MinistryArtSection
        title={language === "te" ? "ఆహ్వానించే క్రీస్తు" : "Christ With Open Hands"}
        text={language === "te" ? "ప్రార్థన కోసం, మార్గదర్శకత్వం కోసం, సేవ కోసం మమ్మల్ని సంప్రదించండి." : "Reach out for prayer, guidance, and ministry care."}
        imageUrl={contactPage?.jesusImageURL}
        fallbackTone="contact"
      />

      <section className="contact-map-section">
        <div className="contact-map-section__inner">
          <div>
            <span>{language === "te" ? "చర్చి స్థానం" : "Church Location"}</span>
            <h2>{language === "te" ? "గొగులపాడు గ్రామం" : "Gogulapadu Village"}</h2>
            <p>{address}</p>
          </div>
          <iframe title="Calvary Prema Ministries map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </main>
  );
}
