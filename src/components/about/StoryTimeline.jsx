import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./AboutSections.css";

export default function StoryTimeline() {
  const { language } = useLanguage();
  const items = [
    { year: "Founder", en: "My father founded Ravi Children & Tribal Ministry in 2000 and faithfully served children and tribal communities with dedication and compassion.", te: "నా తండ్రి 2000లో రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీను ప్రారంభించి పిల్లలు మరియు గిరిజన సమాజాలకు అంకితభావంతో సేవ చేశారు." },
    { year: "2020", en: "The founder's father passed away during COVID, leaving a legacy of prayer and compassion.", te: "కోవిడ్ సమయంలో స్థాపకుని తండ్రి మరణించారు, ప్రార్థన మరియు ప్రేమతో కూడిన వారసత్వాన్ని విడిచారు." },
    { year: "Son", en: "His son continued the ministry with renewed purpose, took baptism at age 18, and is growing as a servant leader through God's word and service.", te: "ఆయన కుమారుడు కొత్త లక్ష్యంతో పరిచర్యను కొనసాగిస్తూ, 18 సంవత్సరాల వయస్సులో బాప్తిస్మము పొంది, దేవుని వాక్యము మరియు సేవ ద్వారా సేవక నాయకుడిగా ఎదుగుతున్నారు." },
    { year: "Present", en: "Calvary Prema Ministries serves through church life, tribal outreach, and children's ministry.", te: "కల్వరి ప్రేమ పరిచర్యలు చర్చి జీవితం, గిరిజన సేవ మరియు పిల్లల పరిచర్య ద్వారా సేవ చేస్తున్నాయి." }
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
