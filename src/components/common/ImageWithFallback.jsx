import React, { useState } from "react";

export default function ImageWithFallback({ src, fallback = "/logo.svg", alt = "", ...props }) {
  const [current, setCurrent] = useState(src || fallback);
  return <img src={current} alt={alt} onError={() => setCurrent(fallback)} {...props} />;
}
