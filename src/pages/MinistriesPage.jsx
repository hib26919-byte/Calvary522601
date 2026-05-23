import React from "react";
import MinistryHighlights from "../components/home/MinistryHighlights";
import TribalOutreachCard from "../components/home/TribalOutreachCard";
import ChildrensMinistryCard from "../components/home/ChildrensMinistryCard";
import { useLanguage } from "../context/LanguageContext";

export default function MinistriesPage() {
  const { ts, language } = useLanguage();
  return (
    <main>
      <section className="page-hero"><div className="page-hero__content"><h1>{ts("ministries_label")}</h1><p>{language === "te" ? "గిరిజన గ్రామాల నుండి పిల్లల హృదయాల వరకు, సేవ ప్రేమతో ప్రారంభమవుతుంది." : "From tribal villages to children's hearts, ministry begins with love in motion."}</p></div></section>
      <MinistryHighlights />
      <TribalOutreachCard />
      <ChildrensMinistryCard />
    </main>
  );
}
