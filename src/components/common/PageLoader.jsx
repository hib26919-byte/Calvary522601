import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageLoader.css";

export default function PageLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`page-loader ${visible ? "page-loader--visible" : ""}`} aria-hidden={!visible}>
      <div className="page-loader__cross" aria-label="Loading">
        <span />
        <span />
      </div>
    </div>
  );
}
