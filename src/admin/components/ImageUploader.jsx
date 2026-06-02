import React, { useState } from "react";

export default function ImageUploader({ currentUrl, onUpload, onUrlChange, label = "Upload Image" }) {
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      await onUpload(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="image-uploader">
      {currentUrl && <img src={currentUrl} alt="Current upload" style={{ maxWidth: 320, borderRadius: 8, marginBottom: 10 }} />}
      <div
        className={`admin-upload-zone ${drag ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => document.getElementById(`file-${label.replace(/\W/g, "")}`).click()}
      >
        <input id={`file-${label.replace(/\W/g, "")}`} type="file" accept="image/*" hidden onChange={(e) => handleFiles(e.target.files)} />
        <strong>{busy ? "Compressing to 70 KB..." : label}</strong>
        <span>Drag and drop or click to browse. Images compress before upload.</span>
      </div>
      <input className="admin-input" value={currentUrl || ""} onChange={(e) => onUrlChange(e.target.value)} placeholder="Or paste image URL" style={{ marginTop: 10 }} />
      {error && <p style={{ color: "#7A1D5C", marginTop: 6 }}>{error}</p>}
    </div>
  );
}
