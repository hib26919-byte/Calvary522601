import React from "react";
import MinistryHighlights from "../components/home/MinistryHighlights";
import TribalOutreachCard from "../components/home/TribalOutreachCard";
import ChildrensMinistryCard from "../components/home/ChildrensMinistryCard";
import InnerPageHero from "../components/common/InnerPageHero";
import { useLanguage } from "../context/LanguageContext";
import { DEFAULT_IMAGES } from "../lib/defaultContent";

export default function MinistriesPage() {
  const { ts, language } = useLanguage();
  return (
    <main>
      <InnerPageHero
        eyebrow={language === "te" ? "సేవ మార్గాలు" : "Ministry Paths"}
        title={ts("ministries_label")}
        subtitle={language === "te" ? "గిరిజన గ్రామాల నుండి పిల్లల హృదయాల వరకు, సేవ ప్రేమతో ప్రారంభమవుతుంది." : "From tribal villages to children's hearts, ministry begins with love in motion."}
        fallbackImage={DEFAULT_IMAGES.children}
        alt="Calvary Prema ministries"
      />
      <MinistryHighlights />
      <TribalOutreachCard />
      <ChildrensMinistryCard />
    </main>
  );
}
