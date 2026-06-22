import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./AboutSections.css";

export default function StoryTimeline() {
  const { language } = useLanguage();
const items = [
  {
    year: "Founder",
    en: "My father founded Calvary Prema Ministries in 2018 and faithfully served children and tribal communities with dedication and compassion.",
    te: "నా తండ్రి 2018లో కాల్వరీ ప్రేమ మినిస్ట్రీస్‌ను స్థాపించి, పిల్లలు మరియు గిరిజన సమాజాలకు అంకితభావంతో, ప్రేమతో విశ్వాసపూర్వకంగా సేవ చేశారు."
  },
  {
    year: "2021",
    en: "My father passed away during the COVID-19 pandemic on May 3, 2021, leaving behind a legacy of prayer, faith, and compassion.",
    te: "2021 మే 3న కోవిడ్-19 మహమ్మారి సమయంలో నా తండ్రి పరలోకానికి వెళ్లారు. ఆయన ప్రార్థన, విశ్వాసం మరియు ప్రేమతో కూడిన గొప్ప వారసత్వాన్ని విడిచిపెట్టారు."
  },
  {
    year: "Chairman",
    en: "His son continued the ministry with renewed purpose, received baptism at the age of 18, and is growing as a servant leader through God's Word and faithful service.",
    te: "ఆయన కుమారుడు నూతన లక్ష్యంతో పరిచర్యను కొనసాగిస్తూ, 18 ఏళ్ల వయసులో బాప్తిస్మము పొందాడు. దేవుని వాక్యము మరియు సేవ ద్వారా సేవక నాయకునిగా ఎదుగుతున్నాడు."
  },
  {
    year: "Vice Chairman",
    en: "Today, Calvary Prema Ministries serves through church ministry, tribal outreach, and children's ministry, sharing God's love with all.",
    te: "ప్రస్తుతం కాల్వరీ ప్రేమ మినిస్ట్రీస్ సంఘ పరిచర్య, గిరిజన సువార్త సేవ మరియు పిల్లల పరిచర్య ద్వారా దేవుని ప్రేమను అందరికీ తెలియజేస్తూ సేవ చేస్తోంది."
  }
];
  return (
    <section className="section section--soft">
      <div className="container">
        <h2 className="section-title">{language === "te" ? "మా ప్రయాణం" : "Our Story"}</h2>
        <div className="story-timeline">
          {items.map((item) => <div className="story-timeline__item" key={item.year}><span>{item.year}</span><p>{item[language] || item.en}</p></div>)}
        </div>
      </div>
    </section>
  );
}
