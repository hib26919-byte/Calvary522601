import React from "react";
import { useContent } from "../../context/ContentContext";
import { useLanguage } from "../../context/LanguageContext";
import "./LeaderSections.css";

export default function LeaderSections() {
  const { aboutPage } = useContent();
  const { language } = useLanguage();
  const leaders = [
    {
      role: language === "te" ? "స్థాపక దర్శకుడు" : "Founder Director",
      name: "A. Ravi (Father)",
      title: "Ravi Children & Tribal Ministry",
      years: "2000-2020",
      photo: aboutPage?.founderPhotoURL,
      description: language === "te"
        ? "ఆంధ్రప్రదేశ్‌లో పిల్లలు మరియు గిరిజన సమాజాలకు అంకితభావం మరియు కరుణతో సేవ చేశారు. 2020లో కోవిడ్ సమయంలో మరణించి, విశ్వాసం మరియు సేవ యొక్క శాశ్వత వారసత్వాన్ని విడిచారు."
        : "Faithfully served children and tribal communities across Andhra Pradesh with dedication and compassion. Passed away in 2020 during COVID, leaving a lasting legacy of faith and service."
    },
    {
      role: language === "te" ? "ప్రస్తుత దర్శకుడు" : "Present Director",
      name: "A.Prasanth (Son)",
      title: "Calvary Prema Ministries",
      years: "Graduate B.A",
      photo: aboutPage?.leaderPhotoURL,
      description: language === "te"
        ? "తండ్రి దృష్టిని కొత్త లక్ష్యంతో కొనసాగిస్తున్నారు. 18 సంవత్సరాల వయస్సులో బాప్తిస్మము పొందారు. చర్చి పరిచర్య, గిరిజన సేవ మరియు పిల్లల పరిచర్య ద్వారా సమాజాలకు సేవ చేస్తున్నారు. నాయకత్వం మరియు తత్వశాస్త్ర జ్ఞానాన్ని బలపరచడానికి బైబిల్ శిక్షణను కోరుకుంటున్నారు."
        : "Continuing his father's vision with renewed purpose. Took baptism at age 18, growing spiritually and serving communities through church ministry, tribal outreach, and children's ministry. Pursuing Bible training to strengthen leadership and theological knowledge."
    }
  ];

  return (
    <section className="leader-sections">
      <div className="leader-sections__inner">
        {leaders.map((leader, index) => (
          <article className="leader-section-card" key={leader.name} style={{ "--delay": `${index * 120}ms` }}>
            <div className="leader-section-card__photo">
              {leader.photo ? <img src={leader.photo} alt={leader.name} /> : <span>✚</span>}
            </div>
            <div>
              <span className="leader-section-card__role">{leader.role}</span>
              <h2>{leader.name}</h2>
              <h3>{leader.title}</h3>
              <strong>{leader.years}</strong>
              <p>{leader.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
