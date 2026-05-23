import React, { useState } from "react";
import "./AnimatedLogo.css";

export default function AnimatedLogo({ src = "/logo.svg", size = 48, pulse = true, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const logoSrc = src === "/logo.png" ? "/logo.svg" : src;

  return (
    <div className={`anim-logo ${pulse && loaded ? "anim-logo--pulse" : ""} ${className}`} style={{ width: size, height: size }}>
      {!loaded && !error && <div className="anim-logo__shimmer" style={{ width: size, height: size }} />}
      {pulse && loaded && <div className="anim-logo__glow-ring" style={{ width: size + 16, height: size + 16 }} />}
      {!error ? (
        <img
          src={logoSrc}
          alt="Calvary Prema Ministries Logo"
          className={`anim-logo__img ${loaded ? "anim-logo__img--loaded" : ""}`}
          style={{ width: size, height: size }}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
        />
      ) : (
        <div className="anim-logo__fallback" style={{ width: size, height: size, fontSize: size * 0.55 }}>+</div>
      )}
    </div>
  );
}
