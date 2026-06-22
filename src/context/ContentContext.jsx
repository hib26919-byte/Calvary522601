import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { DEFAULT_GALLERY_CATEGORIES, normalizeGalleryCategory, sortGalleryCategories } from "../lib/galleryCategories";

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
  const [galleryCategories, setGalleryCategories] = useState(DEFAULT_GALLERY_CATEGORIES);
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
      query(collection(db, "galleryCategories"), orderBy("sortOrder", "asc")),
      (snap) => {
        const categories = snap.docs.map((categoryDoc, index) => normalizeGalleryCategory({ id: categoryDoc.id, ...categoryDoc.data() }, index));
        setGalleryCategories(categories.length ? sortGalleryCategories(categories) : DEFAULT_GALLERY_CATEGORIES);
      },
      (err) => {
        console.warn("Gallery categories fetch error:", err);
        setGalleryCategories(DEFAULT_GALLERY_CATEGORIES);
      }
    );
    fetchGallery().finally(() => setLoading(false));
    return () => {
      unsubscribers.forEach((u) => u());
      unsubscribeCategories();
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
      loading,
      refreshGallery: fetchGallery
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
