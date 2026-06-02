import React, { useEffect, useMemo } from "react";
import PortfolioExperience from "../components/portfolio/PortfolioExperience";
import { portfolioConfigs } from "../components/portfolio/portfolioConfigs";
import { getPortfolioProfile } from "../components/about/leadershipProfiles";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import "./PortfolioKranthi.css";

export default function PortfolioKranthi() {
  const { aboutPage, contactPage } = useContent();
  const { language } = useLanguage();

  const profile = useMemo(
    () => getPortfolioProfile(aboutPage || {}, language, "kranthi"),
    [aboutPage, language]
  );

  useEffect(() => {
    trackPageView("portfolio_kranthi");
  }, []);

  return (
    <PortfolioExperience
      config={portfolioConfigs.kranthi}
      profile={profile}
      language={language}
      contactPage={contactPage}
    />
  );
}
