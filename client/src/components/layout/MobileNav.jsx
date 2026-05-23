import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./MobileNav.css";

const TABS = [
  { path: "/", labelKey: "nav_home", icon: "⌂" },
  { path: "/about", labelKey: "nav_about", icon: "✚" },
  { path: "/tribal-outreach", labelKey: "nav_tribal", icon: "◇" },
  { path: "/gallery", labelKey: "nav_gallery", icon: "▧" },
  { path: "/contact", labelKey: "nav_contact", icon: "☎" }
];

export function MobileBottomNav() {
  const { ts } = useLanguage();
  return (
    <nav className="mobile-bottom-nav" role="navigation" aria-label="Bottom Navigation">
      {TABS.map((tab) => (
        <NavLink key={tab.path} to={tab.path} className={({ isActive }) => `mobile-bottom-tab ${isActive ? "active" : ""}`} aria-label={ts(tab.labelKey)}>
          <span className="mobile-bottom-tab__icon" aria-hidden="true">{tab.icon}</span>
          <span className="mobile-bottom-tab__label">{ts(tab.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function MobileNav({ isOpen, onClose, navLinks }) {
  const { ts } = useLanguage();
  return (
    <>
      <div className={`mobile-nav-overlay ${isOpen ? "open" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`mobile-nav-drawer ${isOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">{ts("footer_ministry")}</span>
          <button className="mobile-nav-close" onClick={onClose} aria-label="Close menu">×</button>
        </div>
        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => link.dropdown ? (
            <React.Fragment key={i}>
              <li className="mobile-nav-category">{link.label}</li>
              {link.dropdown.map((sub) => <li key={sub.path}><NavLink to={sub.path} className="mobile-nav-link mobile-nav-link--sub" onClick={onClose}>{sub.label}</NavLink></li>)}
            </React.Fragment>
          ) : (
            <li key={link.path}><NavLink to={link.path} className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`} onClick={onClose}>{link.label}</NavLink></li>
          ))}
        </ul>
        <div className="mobile-nav-footer"><a href="tel:+918179305085" className="mobile-nav-phone">☎ 81793 05085</a></div>
      </aside>
    </>
  );
}
