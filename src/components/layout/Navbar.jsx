import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useContent } from "../../context/ContentContext";
import { buildNavTree, localizeDynamic } from "../../lib/dynamicContent";
import AnimatedLogo from "../common/AnimatedLogo";
import LanguageSwitch from "./LanguageSwitch";
import MobileNav from "./MobileNav";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ministriesOpen, setMinistriesOpen] = useState(false);
  const { ts, language } = useLanguage();
  const { globalSettings, navItems } = useContent();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMinistriesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setMinistriesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = buildNavTree(navItems).map((item) => ({
    ...item,
    label: localizeDynamic(item, "label", language, ts),
    dropdown: item.dropdown?.map((sub) => ({
      ...sub,
      label: localizeDynamic(sub, "label", language, ts)
    })) || []
  }));

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : "navbar--transparent"}`} role="navigation" aria-label="Main Navigation">
        <div className="navbar__progress" style={{ width: `${progress}%` }} />
        <div className="navbar__container">
          <Link to="/" className="navbar__logo" aria-label="Calvary Prema - Home">
            <AnimatedLogo src={globalSettings?.logoURL || "/logo.svg"} size={52} pulse={!scrolled} />
            <span className="navbar__logo-name">{ts("footer_ministry")}</span>
          </Link>
          <ul className="navbar__links" role="list">
            {navLinks.map((link, i) => link.dropdown?.length ? (
              <li key={i} className="navbar__item navbar__item--dropdown" ref={dropdownRef}>
                <button className={`navbar__link navbar__dropdown-trigger ${link.dropdown.some((d) => location.pathname === d.path) ? "active" : ""}`} onClick={() => setMinistriesOpen((v) => !v)} aria-haspopup="true" aria-expanded={ministriesOpen}>
                  {link.label}<span className={`navbar__caret ${ministriesOpen ? "open" : ""}`}>▾</span>
                </button>
                <ul className={`navbar__dropdown ${ministriesOpen ? "navbar__dropdown--open" : ""}`} role="menu">
                  {link.dropdown.map((sub) => (
                    <li key={sub.path} role="menuitem"><NavLink to={sub.path} className="navbar__dropdown-link">{sub.label}</NavLink></li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.path} className="navbar__item">
                <NavLink to={link.path} className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="navbar__controls">
            <a className="navbar__quick-call" href="tel:+918179305085">Call</a>
            <LanguageSwitch />
            <button className="navbar__hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>
      </nav>
      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks} />
    </>
  );
}
