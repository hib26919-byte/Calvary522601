import React, { useEffect } from "react";
import FestivalBanner from "../components/home/FestivalBanner";
import HeroSection from "../components/home/HeroSection";
import ScriptureVerse from "../components/home/ScriptureVerse";
import MinistryHighlights from "../components/home/MinistryHighlights";
import VisionStorySection from "../components/home/VisionStorySection";
import MinistryArtSection from "../components/common/MinistryArtSection";
import TribalOutreachCard from "../components/home/TribalOutreachCard";
import ChildrensMinistryCard from "../components/home/ChildrensMinistryCard";
import ImpactStats from "../components/home/ImpactStats";
import { useContent } from "../context/ContentContext";
import { trackPageView } from "../lib/analytics";

export default function HomePage() {
  const { homePage } = useContent();
  useEffect(() => { trackPageView("home"); }, []);
  return (
    <main>
      <FestivalBanner />
      <HeroSection data={homePage} />
      <ScriptureVerse reference={homePage?.verse1_reference || "Mark 16:16-17"} textKey="verse1_text" data={homePage} variant="primary" />
      <MinistryArtSection
        title="Jesus Welcomes Every Heart"
        text="Come to Me, all you who labor and are heavy laden, and I will give you rest. - Matthew 11:28"
        imageUrl={homePage?.jesusImageURL}
        fallbackTone="home"
      />
      <VisionStorySection />
      <MinistryHighlights />
      <TribalOutreachCard />
      <ChildrensMinistryCard />
      <ImpactStats />
      <ScriptureVerse reference={homePage?.verse2_reference || "Psalms 28:7"} textKey="verse2_text" data={homePage} variant="secondary" />
    </main>
  );
}
