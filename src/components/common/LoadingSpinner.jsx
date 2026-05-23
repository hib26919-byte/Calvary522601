import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner({ fullPage = false, message = "Loading..." }) {
  return (
    <div className={fullPage ? "loading loading--page" : "loading"}>
      <div className="loading__ring" />
      <div className="loading__text">{message}</div>
    </div>
  );
}
