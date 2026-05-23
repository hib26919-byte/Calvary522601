import React, { useEffect } from "react";
import AboutHero from "../components/about/AboutHero";
import StoryTimeline from "../components/about/StoryTimeline";
import LeaderSections from "../components/about/LeaderSections";
import MinistryArtSection from "../components/common/MinistryArtSection";
import ScriptureVerse from "../components/home/ScriptureVerse";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import { trackPageView } from "../lib/analytics";
import { DEFAULT_MINISTRY_CONTENT, MINISTRY_STORY_EN, MINISTRY_STORY_TE } from "../lib/defaultContent";

export default function AboutPage() {
  const { aboutPage } = useContent();
  const { t, language } = useLanguage();
  useEffect(() => { trackPageView("about"); }, []);
  return (
    <main>
      <AboutHero />
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t(aboutPage, "storyTitle") || (language === "te" ? "విశ్వాసంతో మొదలైన సేవ" : "A Ministry Begun in Faith")}</h2>
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: t(aboutPage, "storyBody") || (language === "te" ? MINISTRY_STORY_TE : MINISTRY_STORY_EN) }} />
        </div>
      </section>
      <section className="section section--soft">
        <div className="container leader-duo">
          <article>
            <span className="eyebrow">{language === "te" ? "మొదట" : "First"}</span>
            <h2>{language === "te" ? "స్థాపకుడు - తండ్రి" : "Founder - Father"}</h2>
            <p>{language === "te" ? "రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీ ద్వారా 2000లో పిల్లలు మరియు గిరిజన సమాజాలకు కరుణతో సేవ ప్రారంభించారు." : "Through Ravi Children & Tribal Ministry, he began serving children and tribal communities in 2000 with compassion and dedication."}</p>
          </article>
          <article>
            <span className="eyebrow">{language === "te" ? "తర్వాత" : "Now"}</span>
            <h2>{language === "te" ? "ప్రస్తుత నాయకుడు - కుమారుడు" : "Present Leader - His Son"}</h2>
            <p>{language === "te" ? "2020 తరువాత తండ్రి పరిచర్యను కొనసాగిస్తూ, బైబిల్ శిక్షణ, నాయకత్వం మరియు సేవ ద్వారా సమాజాలను బలపరచాలనే దృష్టితో ముందుకు సాగుతున్నారు." : "After 2020, his son continued the ministry with a vision to strengthen communities through Bible training, leadership, and faithful service."}</p>
          </article>
        </div>
      </section>
      <LeaderSections />
      <StoryTimeline />
      <MinistryArtSection
        title={language === "te" ? "దేవుని మార్గదర్శకత్వంలో కొనసాగుతున్న సేవ" : "Guided by Christ Into Continued Service"}
        text={language === "te" ? "తండ్రి వారసత్వాన్ని కుమారుడు విశ్వాసంతో కొనసాగిస్తున్న ప్రయాణాన్ని సూచించే ఆధ్యాత్మిక దృశ్యం." : "A spiritual visual moment representing the son continuing his father's ministry legacy with guidance and faith."}
        imageUrl={aboutPage?.jesusImageURL}
        fallbackTone="about"
      />
      <section className="section section--soft"><div className="container"><h2 className="section-title">{language === "te" ? "మా లక్ష్యం" : "Our Mission"}</h2><p className="section-lead">{t(aboutPage, "missionStatement") || (language === "te" ? DEFAULT_MINISTRY_CONTENT.mission_te : DEFAULT_MINISTRY_CONTENT.mission_en)}</p><p className="section-lead" style={{ marginTop: 18 }}>{language === "te" ? DEFAULT_MINISTRY_CONTENT.vision_te : DEFAULT_MINISTRY_CONTENT.vision_en}</p></div></section>
      <ScriptureVerse reference="Psalms 28:7" textKey="verse2_text" data={null} variant="secondary" />
    </main>
  );
}
