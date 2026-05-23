import React, { createContext, useCallback, useContext, useState } from "react";

const LanguageContext = createContext(null);

export const LANGUAGES = { ENGLISH: "en", TELUGU: "te" };
const STORAGE_KEY = "calvary_prema_lang";

export const STATIC_STRINGS = {
  nav_home: { en: "Home", te: "హోమ్" },
  nav_about: { en: "About Us", te: "మా గురించి" },
  nav_ministries: { en: "Ministries", te: "పరిచర్యలు" },
  nav_tribal: { en: "Tribal Outreach", te: "గిరిజన సేవ" },
  nav_children: { en: "Children's Ministry", te: "పిల్లల పరిచర్య" },
  nav_gallery: { en: "Gallery", te: "గ్యాలరీ" },
  nav_contact: { en: "Contact", te: "సంప్రదించండి" },
  hero_cta: { en: "Learn More", te: "మరింత తెలుసుకోండి" },
  read_more: { en: "Read More", te: "మరింత చదవండి" },
  view_gallery: { en: "View Gallery", te: "గ్యాలరీ చూడండి" },
  contact_us: { en: "Contact Us", te: "మమ్మల్ని సంప్రదించండి" },
  mission_label: { en: "Our Mission", te: "మా లక్ష్యం" },
  vision_label: { en: "Our Vision", te: "మా దృష్టి" },
  about_label: { en: "About Us", te: "మా గురించి" },
  ministries_label: { en: "Our Ministries", te: "మా పరిచర్యలు" },
  tribal_label: { en: "Tribal Outreach", te: "గిరిజన సేవ" },
  children_label: { en: "Children's Ministry", te: "పిల్లల పరిచర్య" },
  gallery_label: { en: "Gallery", te: "గ్యాలరీ" },
  contact_label: { en: "Get In Touch", te: "సంప్రదించండి" },
  footer_rights: { en: "All rights reserved.", te: "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి." },
  footer_ministry: { en: "Calvary Prema Ministries", te: "కల్వరి ప్రేమ పరిచర్యలు" },
  address_label: { en: "Address", te: "చిరునామా" },
  phone_label: { en: "Phone", te: "ఫోన్" },
  send_message: { en: "Send Message", te: "సందేశం పంపండి" },
  name_placeholder: { en: "Your Name", te: "మీ పేరు" },
  email_placeholder: { en: "Your Email", te: "మీ ఇమెయిల్" },
  message_placeholder: { en: "Your Message", te: "మీ సందేశం" },
  chatbot_greeting: { en: "Hi! How can I help you today?", te: "నమస్కారం! నేను మీకు ఏమి సహాయం చేయగలను?" },
  chatbot_placeholder: { en: "Ask me anything...", te: "ఏదైనా అడగండి..." },
  chatbot_send: { en: "Send", te: "పంపు" },
  loading: { en: "Loading...", te: "లోడ్ అవుతోంది..." },
  close: { en: "Close", te: "మూసివేయి" },
  banner_close: { en: "Continue to Website", te: "వెబ్‌సైట్‌కు కొనసాగండి" },
  tribal_impact_1: { en: "Villages Reached", te: "చేరిన గ్రామాలు" },
  tribal_impact_2: { en: "Families Blessed", te: "ఆశీర్వదించిన కుటుంబాలు" },
  tribal_impact_3: { en: "Years of Service", te: "సేవా సంవత్సరాలు" },
  children_impact_1: { en: "Children Served", te: "సేవించిన పిల్లలు" },
  children_impact_2: { en: "Schools Visited", te: "సందర్శించిన పాఠశాలలు" },
  children_impact_3: { en: "Communities Reached", te: "చేరిన సమాజాలు" },
  verse_mark: { en: "Mark 16:16-17", te: "మార్కు 16:16-17" },
  verse_psalm: { en: "Psalms 28:7", te: "కీర్తన 28:7" }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem(STORAGE_KEY) || LANGUAGES.ENGLISH);

  const setLanguage = useCallback((lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === LANGUAGES.ENGLISH ? LANGUAGES.TELUGU : LANGUAGES.ENGLISH);
  }, [language, setLanguage]);

  const t = useCallback((obj, field) => {
    if (!obj) return "";
    return obj[`${field}_${language}`] || obj[`${field}_en`] || obj[field] || "";
  }, [language]);

  const ts = useCallback((key) => STATIC_STRINGS[key]?.[language] || STATIC_STRINGS[key]?.en || key, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t,
      ts,
      isTelugu: language === LANGUAGES.TELUGU,
      isEnglish: language === LANGUAGES.ENGLISH
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
