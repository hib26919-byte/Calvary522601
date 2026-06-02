import React, { useEffect, useMemo } from "react";
import PortfolioExperience from "../components/portfolio/PortfolioExperience";
import { portfolioConfigs } from "../components/portfolio/portfolioConfigs";
import { getPortfolioProfile } from "../components/about/leadershipProfiles";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import "./PortfolioPrasanth.css";

export default function PortfolioPrasanth() {
  const { aboutPage, contactPage } = useContent();
  const { language } = useLanguage();

  const profile = useMemo(
    () => getPortfolioProfile(aboutPage || {}, language, "prasanth"),
    [aboutPage, language]
  );

  useEffect(() => {
    trackPageView("portfolio_prasanth");
  }, []);

  return (
    <PortfolioExperience
      config={portfolioConfigs.prasanth}
      profile={profile}
      language={language}
      contactPage={contactPage}
    />
  );
}
