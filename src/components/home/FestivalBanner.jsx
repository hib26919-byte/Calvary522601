import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useLanguage } from "../../context/LanguageContext";
import "./FestivalBanner.css";

export default function FestivalBanner() {
  const [banner, setBanner] = useState(null);
  const [visible, setVisible] = useState(false);
  const { t, ts } = useLanguage();

  useEffect(() => {
    async function fetchActiveBanner() {
      try {
        const now = new Date();
        const q = query(collection(db, "festivalBanners"), where("isActive", "==", true));
        const snap = await getDocs(q);
        for (const docSnap of snap.docs) {
          const data = { id: docSnap.id, ...docSnap.data() };
          const start = data.startDate?.toDate?.() || new Date(data.startDate);
          const end = data.endDate?.toDate?.() || new Date(data.endDate);
          if (now >= start && now <= end && !sessionStorage.getItem(`bannerSeen_${data.id}`)) {
            setBanner(data);
            setTimeout(() => setVisible(true), 800);
            break;
          }
        }
      } catch (err) {
        console.error("FestivalBanner fetch error:", err);
      }
    }
    fetchActiveBanner();
  }, []);

  function handleClose() {
    setVisible(false);
    if (banner) sessionStorage.setItem(`bannerSeen_${banner.id}`, "true");
    setTimeout(() => setBanner(null), 500);
  }

  if (!banner) return null;
  return (
    <div className={`festival-banner ${visible ? "festival-banner--visible" : ""}`} role="dialog" aria-modal="true" aria-label="Festival Banner">
      <div className="festival-banner__backdrop" onClick={handleClose} />
      <div className="festival-banner__modal">
        <button className="festival-banner__close" onClick={handleClose} aria-label="Close banner">×</button>
        {banner.imageURL && <div className="festival-banner__img-wrap"><img src={banner.imageURL} alt={t(banner, "title")} className="festival-banner__img" /><div className="festival-banner__img-overlay" /></div>}
        <div className="festival-banner__content">
          {t(banner, "title") && <h2>{t(banner, "title")}</h2>}
          {t(banner, "subtitle") && <p>{t(banner, "subtitle")}</p>}
          <button className="festival-banner__cta" onClick={handleClose}>{ts("banner_close")} →</button>
        </div>
      </div>
    </div>
  );
}
