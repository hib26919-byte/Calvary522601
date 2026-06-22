import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import "./Footer.css";

export default function Footer() {
  const { ts } = useLanguage();
  const { globalSettings } = useContent();
  const year = new Date().getFullYear();
  const socials = globalSettings?.socialLinks || {};

  return (
    <footer className="footer">
      <div className="footer__wave"><svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="var(--color-off-white)" /></svg></div>
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__brand">
            <img src={globalSettings?.logoURL || "/logo.svg"} alt="Calvary Prema" width="64" height="64" />
            <h3>{ts("footer_ministry")}</h3>
            <p>{globalSettings?.footerText_en || `${ts("mission_label")}: Loving God • Loving People`}</p>
            <p className="footer__verse">"The Lord is my strength and my shield." - Psalms 28:7</p>
          </div>
          <div className="footer__nav">
            <h4>Ministry</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/tribal-outreach">Tribal Outreach</Link></li>
              <li><Link to="/childrens-ministry">Children's Ministry</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__contact">
            <h4>{ts("contact_label")}</h4>
            <address>
              <p>Calvary Prema Ministries<br />Narasaropet,<br />Palnadu Dist., A.P. 522601</p>
              <p><a href="tel:+918179305085" className="footer__phone">☎+91 8019006339</a></p>
            </address>
            <div className="footer__social">
              {socials.whatsapp && <a href={`https://wa.me/${socials.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>}
              {socials.facebook && <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>}
              {socials.youtube && <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>}
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom"><span>© {year} {ts("footer_ministry")}. {ts("footer_rights")}</span><span>✚</span></div>
    </footer>
  );
}
