import React, { useState } from "react";
import { reoptimizeImageUrl } from "../../lib/imgbb";

export default function ImageUploader({ currentUrl, onUpload, onUrlChange, label = "Upload Image" }) {
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(null);

  async function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    setProgress({ percent: 0, message: "Preparing image..." });
    try {
      await onUpload(file, { onProgress: setProgress });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  async function reoptimizeCurrentImage() {
    if (!currentUrl) return;
    setBusy(true);
    setError("");
    setProgress({ percent: 0, message: "Preparing existing image..." });
    try {
      const result = await reoptimizeImageUrl(currentUrl, label.replace(/\W+/g, "_").toLowerCase(), { onProgress: setProgress });
      onUrlChange(result.url);
    } catch (err) {
      setError(`${err.message} If this image host blocks downloads, upload the original file again.`);
    } finally {
      setBusy(false);
      setProgress(null);
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
        <input id={`file-${label.replace(/\W/g, "")}`} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => handleFiles(e.target.files)} />
        <strong>{busy ? progress?.message || "Optimizing image..." : label}</strong>
        <span>Drag and drop or click to browse. Images optimize automatically before upload.</span>
        {progress && <progress value={progress.percent || 0} max="100" style={{ width: "min(280px, 100%)" }} />}
      </div>
      {currentUrl && (
        <button
          type="button"
          className="admin-btn admin-btn--ghost admin-btn--sm"
          onClick={reoptimizeCurrentImage}
          disabled={busy}
          style={{ marginTop: 10 }}
        >
          Re-optimize Current Image
        </button>
      )}
      <input className="admin-input" value={currentUrl || ""} onChange={(e) => onUrlChange(e.target.value)} placeholder="Or paste image URL" style={{ marginTop: 10 }} />
      {error && <p style={{ color: "#7A1D5C", marginTop: 6 }}>{error}</p>}
    </div>
  );
}
