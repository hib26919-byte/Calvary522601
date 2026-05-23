import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export async function trackPageView(page) {
  const key = getTodayKey();
  const ref = doc(db, "analytics", key);
  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        date: serverTimestamp(),
        pageViews: { [page]: 1 },
        uniqueVisitors: 1,
        chatbotQueries: 0
      });
    } else {
      await updateDoc(ref, { [`pageViews.${page}`]: increment(1) });
    }
  } catch (err) {
    console.warn("Analytics tracking error:", err);
  }
}

export async function trackChatbotQuery() {
  const key = getTodayKey();
  const ref = doc(db, "analytics", key);
  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { date: serverTimestamp(), pageViews: {}, uniqueVisitors: 1, chatbotQueries: 1 });
    } else {
      await updateDoc(ref, { chatbotQueries: increment(1) });
    }
  } catch {
    // Analytics must never interrupt chat.
  }
}
