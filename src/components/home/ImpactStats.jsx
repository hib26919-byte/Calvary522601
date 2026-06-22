import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./ImpactStats.css";

const STATS = [
  { label_en: "Years of Ministry", label_te: "సేవా సంవత్సరాలు", value: 8, suffix: "+" },
  { label_en: "Villages Reached", label_te: "చేరిన గ్రామాలు", value: 50, suffix: "+" },
  { label_en: "Families Blessed", label_te: "ఆశీర్వదించిన కుటుంబాలు", value: 500, suffix: "+" },
  { label_en: "Children Served", label_te: "సేవించిన పిల్లలు", value: 1000, suffix: "+" }
];

export default function ImpactStats() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 2000;
    let frame;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(STATS.map((stat) => Math.round(stat.value * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  return (
    <section className="impact-stats" ref={ref}>
      <div className="impact-stats__grid">
        {STATS.map((stat, i) => (
          <div className="impact-stat" key={stat.label_en}>
            <div className="impact-stat__value">{counts[i]}{stat.suffix}</div>
            <div className="impact-stat__label">{t(stat, "label")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
