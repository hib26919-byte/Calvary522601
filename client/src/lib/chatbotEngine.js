import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const DEFAULT_KNOWLEDGE = [
  {
    id: "about_ministry",
    keywords: ["about", "who", "ministry", "calvary", "prema", "what is"],
    question_en: "What is Calvary Prema Ministries?",
    question_te: "కల్వరి ప్రేమ పరిచర్యలు అంటే ఏమిటి?",
    answer_en: "Calvary Prema Ministries is a Christian ministry based in Andhra Pradesh, India. The ministry journey began in 2000 through Ravi Children & Tribal Ministry and continues today through tribal outreach, children's ministry, prayer, worship, and compassionate community service.",
    answer_te: "కల్వరి ప్రేమ పరిచర్యలు ఆంధ్రప్రదేశ్‌లో ఉన్న క్రైస్తవ పరిచర్య. 2000లో రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీ ద్వారా ప్రారంభమైన ఈ సేవ నేడు గిరిజన సేవ, పిల్లల పరిచర్య, ప్రార్థన, ఆరాధన మరియు సమాజ సేవగా కొనసాగుతోంది.",
    category: "about"
  },
  {
    id: "founder",
    keywords: ["founder", "pastor", "leader", "who started", "history", "father", "ravi"],
    question_en: "Who started this ministry?",
    question_te: "ఈ పరిచర్యను ఎవరు ప్రారంభించారు?",
    answer_en: "The ministry began through the founder's father in 2000 as Ravi Children & Tribal Ministry. After he passed away during COVID in 2020, the current leader continued the work with renewed purpose and faith.",
    answer_te: "ఈ పరిచర్య 2000లో స్థాపకుని తండ్రి ద్వారా రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీగా ప్రారంభమైంది. 2020లో కోవిడ్ సమయంలో ఆయన మరణించిన తరువాత ప్రస్తుత నాయకుడు విశ్వాసంతో ఈ సేవను కొనసాగిస్తున్నారు.",
    category: "about"
  },
  {
    id: "location",
    keywords: ["address", "location", "where", "village", "district", "andhra", "palnadu", "gogulapadu"],
    question_en: "Where is Calvary Prema Ministries located?",
    question_te: "కల్వరి ప్రేమ పరిచర్యలు ఎక్కడ ఉంది?",
    answer_en: "We are located at Telugu Baptist Church, Gogulapadu Village, Rompicherla Mandal, Palnadu District, Andhra Pradesh - PIN 522617.",
    answer_te: "మేము తెలుగు బాప్టిస్ట్ చర్చి, గొగులపాడు గ్రామం, రొంపిచెర్ల మండలం, పల్నాడు జిల్లా, ఆంధ్రప్రదేశ్ - పిన్ 522617 వద్ద ఉన్నాం.",
    category: "contact"
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "call", "reach", "number", "mobile", "tel"],
    question_en: "How can I contact Calvary Prema Ministries?",
    question_te: "కల్వరి ప్రేమ పరిచర్యలను ఎలా సంప్రదించాలి?",
    answer_en: "You can contact us by phone at 81793 05085 or use the Contact form on this website.",
    answer_te: "మీరు 81793 05085 నంబర్‌కు ఫోన్ చేయవచ్చు లేదా ఈ వెబ్‌సైట్‌లోని సంప్రదింపు ఫారమ్‌ను ఉపయోగించవచ్చు.",
    category: "contact"
  },
  {
    id: "tribal_outreach",
    keywords: ["tribal", "outreach", "village", "community", "adivasi", "girijanam"],
    question_en: "What is the Tribal Outreach Ministry?",
    question_te: "గిరిజన సేవ పరిచర్య అంటే ఏమిటి?",
    answer_en: "Our Tribal Outreach Ministry serves remote tribal villages in Andhra Pradesh with spiritual encouragement, prayer, practical support, and the message of hope in Christ.",
    answer_te: "మా గిరిజన సేవ పరిచర్య ఆంధ్రప్రదేశ్‌లోని మారుమూల గిరిజన గ్రామాలకు ఆధ్యాత్మిక ప్రోత్సాహం, ప్రార్థన, ఆచరణాత్మక సహాయం మరియు క్రీస్తులో ఆశను అందిస్తుంది.",
    category: "ministries"
  },
  {
    id: "children_ministry",
    keywords: ["children", "kids", "child", "youth", "sunday school", "pilla"],
    question_en: "What does the Children's Ministry do?",
    question_te: "పిల్లల పరిచర్య ఏమి చేస్తుంది?",
    answer_en: "Our Children's Ministry nurtures young hearts with God's word, prayer, encouragement, and positive community care for children and youth.",
    answer_te: "మా పిల్లల పరిచర్య దేవుని వాక్యము, ప్రార్థన, ప్రోత్సాహం మరియు ప్రేమతో పిల్లలు మరియు యువతను పెంపొందిస్తుంది.",
    category: "ministries"
  },
  {
    id: "mission",
    keywords: ["mission", "vision", "goal", "purpose", "aim", "lakshyam"],
    question_en: "What is the mission of Calvary Prema?",
    question_te: "కల్వరి ప్రేమ లక్ష్యం ఏమిటి?",
    answer_en: "Our mission is to share the love of Christ through church ministry, tribal outreach, children's ministry, prayer, and compassionate service.",
    answer_te: "మా లక్ష్యం చర్చి పరిచర్య, గిరిజన సేవ, పిల్లల పరిచర్య, ప్రార్థన మరియు ప్రేమతో కూడిన సేవ ద్వారా క్రీస్తు ప్రేమను పంచడం.",
    category: "about"
  },
  {
    id: "gallery",
    keywords: ["gallery", "photos", "pictures", "images", "fotulu"],
    question_en: "Where can I see photos of your ministry?",
    question_te: "మీ పరిచర్య ఫోటోలు ఎక్కడ చూడవచ్చు?",
    answer_en: "You can view ministry photos in the Gallery section, including tribal outreach, children's ministry, church services, and events.",
    answer_te: "మీరు గ్యాలరీ విభాగంలో గిరిజన సేవ, పిల్లల పరిచర్య, చర్చి సేవలు మరియు కార్యక్రమాల ఫోటోలు చూడవచ్చు.",
    category: "gallery"
  },
  {
    id: "verse_mark",
    keywords: ["mark", "verse", "scripture", "bible", "baptized", "saved", "signs"],
    question_en: "What is Mark 16:16-17?",
    question_te: "మార్కు 16:16-17 ఏమిటి?",
    answer_en: "Mark 16:16-17 says that whoever believes and is baptized will be saved, and signs will accompany those who believe.",
    answer_te: "మార్కు 16:16-17 విశ్వసించి బాప్తిస్మము పొందినవాడు రక్షింపబడును అని చెబుతుంది.",
    category: "scripture"
  },
  {
    id: "verse_psalm",
    keywords: ["psalm", "psalms", "strength", "shield", "trusted"],
    question_en: "What is Psalms 28:7?",
    question_te: "కీర్తన 28:7 ఏమిటి?",
    answer_en: "Psalms 28:7 says: The Lord is my strength and my shield; my heart trusted in Him, and I am helped.",
    answer_te: "కీర్తన 28:7: యెహోవా నా బలమును నా డాలుమై యున్నాడు; నా హృదయము ఆయనయందు నమ్మిక యుంచగా నేను సహాయము పొందితిని.",
    category: "scripture"
  },
  {
    id: "help",
    keywords: ["help", "hello", "hi", "hey", "namaste", "namaskar", "good morning", "good evening"],
    question_en: "Hello! How can I help?",
    question_te: "నమస్కారం!",
    answer_en: "Welcome to Calvary Prema Ministries. I can help with information about our ministry, tribal outreach, children's ministry, location, contact details, and mission.",
    answer_te: "కల్వరి ప్రేమ పరిచర్యలకు స్వాగతం. మా పరిచర్య, గిరిజన సేవ, పిల్లల పరిచర్య, స్థానం, సంప్రదింపు వివరాలు మరియు లక్ష్యం గురించి నేను సహాయం చేయగలను.",
    category: "general"
  }
];

export class ChatbotEngine {
  constructor() {
    this.knowledge = [...DEFAULT_KNOWLEDGE];
    this.language = "en";
    this.unsubscribe = null;
  }

  async init() {
    try {
      const docRef = doc(db, "chatbotKnowledge", "knowledgeBase");
      this.unsubscribe = onSnapshot(docRef, (snap) => {
        if (!snap.exists()) return;
        const entries = snap.data().entries;
        if (!Array.isArray(entries) || entries.length === 0) return;
        const map = Object.fromEntries(DEFAULT_KNOWLEDGE.map((entry) => [entry.id, entry]));
        entries.forEach((entry) => { if (entry.id) map[entry.id] = entry; });
        this.knowledge = Object.values(map);
      });
    } catch (err) {
      console.warn("Chatbot: Could not load Firestore knowledge.", err);
    }
  }

  setLanguage(lang) {
    this.language = lang;
  }

  findBestMatch(input) {
    const query = input.toLowerCase().trim();
    if (!query) return null;
    const queryWords = this.tokenize(query);
    let bestScore = 0;
    let bestEntry = null;
    for (const entry of this.knowledge) {
      const score = this.scoreEntry(queryWords, query, entry);
      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }
    return bestScore >= 0.2 ? { entry: bestEntry, confidence: bestScore } : null;
  }

  scoreEntry(queryWords, rawQuery, entry) {
    let score = 0;
    for (const keyword of entry.keywords || []) {
      const k = keyword.toLowerCase();
      if (rawQuery.includes(k)) score += 0.4;
      if (queryWords.some((w) => fuzzyMatch(w, k))) score += 0.2;
    }
    const question = (entry[`question_${this.language}`] || entry.question_en || "").toLowerCase();
    const questionWords = this.tokenize(question);
    const overlap = queryWords.filter((w) => questionWords.includes(w)).length;
    if (questionWords.length) score += (overlap / questionWords.length) * 0.3;
    const categoryHints = {
      contact: ["contact", "call", "phone", "reach"],
      about: ["about", "who", "what is", "ministry"],
      ministries: ["tribal", "children", "ministry", "serve"],
      gallery: ["photo", "picture", "gallery", "image"],
      scripture: ["verse", "bible", "scripture", "psalm", "mark"]
    };
    for (const [cat, hints] of Object.entries(categoryHints)) {
      if (entry.category === cat && hints.some((h) => rawQuery.includes(h))) score += 0.1;
    }
    return Math.min(score, 1);
  }

  tokenize(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.includes(w));
  }

  respond(input) {
    const lang = this.language;
    if (!input?.trim()) {
      return { text: lang === "te" ? "దయచేసి మీ ప్రశ్న టైప్ చేయండి." : "Please type your question.", confidence: 0 };
    }
    const match = this.findBestMatch(input);
    if (!match) {
      return {
        text: lang === "te"
          ? "క్షమించండి, నాకు ఆ సమాచారం లేదు. దయచేసి 81793 05085 కు సంప్రదించండి."
          : "I'm sorry, I don't have information about that. Please contact us at 81793 05085 or use the Contact page.",
        confidence: 0,
        fallback: true
      };
    }
    return {
      text: match.entry[`answer_${lang}`] || match.entry.answer_en,
      confidence: match.confidence,
      category: match.entry.category
    };
  }

  destroy() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

const STOP_WORDS = ["the", "is", "in", "a", "an", "and", "or", "for", "to", "of", "at", "on", "it", "do", "can", "me", "you", "my", "your"];

function fuzzyMatch(word, keyword) {
  if (word === keyword) return true;
  if (keyword.startsWith(word.slice(0, 4))) return true;
  return word.length >= 5 && levenshtein(word, keyword) <= 2;
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}
