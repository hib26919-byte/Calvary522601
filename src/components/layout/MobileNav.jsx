import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import { activeNavItems, localizeDynamic } from "../../lib/dynamicContent";
import "./MobileNav.css";

export function MobileBottomNav() {
  const { ts, language } = useLanguage();
  const { navItems } = useContent();
  const tabs = activeNavItems(navItems)
    .filter((item) => item.path && !item.parentId && item.bottomVisible !== false)
    .slice(0, 5)
    .map((item) => ({
      path: item.path,
      label: localizeDynamic(item, "label", language, ts),
      icon: item.icon || localizeDynamic(item, "label", language, ts).charAt(0)
    }));

  return (
    <nav className="mobile-bottom-nav" role="navigation" aria-label="Bottom Navigation">
      {tabs.map((tab) => (
        <NavLink key={tab.path} to={tab.path} className={({ isActive }) => `mobile-bottom-tab ${isActive ? "active" : ""}`} aria-label={tab.label}>
          <span className="mobile-bottom-tab__icon" aria-hidden="true">{tab.icon}</span>
          <span className="mobile-bottom-tab__label">{tab.label}</span>
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
          {navLinks.map((link, i) => link.dropdown?.length ? (
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
