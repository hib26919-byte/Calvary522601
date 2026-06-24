import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { normalizeGalleryCategory, sortGalleryCategories } from "../lib/galleryCategories";
import { mergeHomeSections, mergeNavigationItems } from "../lib/dynamicContent";

const ContentContext = createContext(null);
const PAGE_IDS = ["homePage", "aboutPage", "tribalPage", "childrensPage", "contactPage", "globalSettings"];
const CACHE_KEY = "calvary_prema_content_cache";
const CACHE_TTL = 30 * 60 * 1000;

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      return cached && Date.now() - cached.time < CACHE_TTL ? cached.content : {};
    } catch {
      return {};
    }
  });
  const [gallery, setGallery] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [navItems, setNavItems] = useState(() => mergeNavigationItems([]));
  const [homeSections, setHomeSections] = useState(() => mergeHomeSections([]));
  const [bibleDistribution, setBibleDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribers = PAGE_IDS.map((pageId) => onSnapshot(
      doc(db, "siteContent", pageId),
      (snap) => {
        setContent((prev) => {
          const next = { ...prev, [pageId]: snap.exists() ? snap.data() : null };
          localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), content: next }));
          return next;
        });
      },
      (err) => console.warn(`Content fetch error for ${pageId}:`, err)
    ));
    const unsubscribeCategories = onSnapshot(
      collection(db, "galleryCategories"),
      (snap) => {
        const categories = snap.docs.map((categoryDoc, index) => normalizeGalleryCategory({ id: categoryDoc.id, ...categoryDoc.data() }, index));
        setGalleryCategories(sortGalleryCategories(categories));
      },
      (err) => {
        console.warn("Gallery categories fetch error:", err);
        setGalleryCategories([]);
      }
    );
    const unsubscribeNavItems = onSnapshot(
      collection(db, "navItems"),
      (snap) => {
        setNavItems(mergeNavigationItems(snap.docs.map((navDoc, index) => ({ id: navDoc.id, ...navDoc.data(), _index: index }))));
      },
      (err) => {
        console.warn("Navigation fetch error:", err);
        setNavItems(mergeNavigationItems([]));
      }
    );
    const unsubscribeHomeSections = onSnapshot(
      collection(db, "homeSections"),
      (snap) => {
        setHomeSections(mergeHomeSections(snap.docs.map((sectionDoc, index) => ({ id: sectionDoc.id, ...sectionDoc.data(), _index: index }))));
      },
      (err) => {
        console.warn("Home sections fetch error:", err);
        setHomeSections(mergeHomeSections([]));
      }
    );
    const unsubscribeBibleDistribution = onSnapshot(
      collection(db, "bibleDistribution"),
      (snap) => {
        const entries = snap.docs.map((entryDoc) => ({ id: entryDoc.id, ...entryDoc.data() }));
        setBibleDistribution(entries.sort((a, b) => {
          const order = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
          if (order !== 0) return order;
          const dateA = a.date || "";
          const dateB = b.date || "";
          return dateB.localeCompare(dateA);
        }));
      },
      (err) => {
        console.warn("Bible distribution fetch error:", err);
        setBibleDistribution([]);
      }
    );
    fetchGallery().finally(() => setLoading(false));
    return () => {
      unsubscribers.forEach((u) => u());
      unsubscribeCategories();
      unsubscribeNavItems();
      unsubscribeHomeSections();
      unsubscribeBibleDistribution();
    };
  }, []);

  async function fetchGallery() {
    try {
      const q = query(collection(db, "gallery"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setGallery(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.warn("Gallery fetch error:", err);
    }
  }

  return (
    <ContentContext.Provider value={{
      homePage: content.homePage,
      aboutPage: content.aboutPage,
      tribalPage: content.tribalPage,
      childrensPage: content.childrensPage,
      contactPage: content.contactPage,
      globalSettings: content.globalSettings,
      gallery,
      galleryCategories,
      navItems,
      homeSections,
      bibleDistribution,
      loading,
      refreshGallery: fetchGallery
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
