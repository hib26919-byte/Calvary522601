import React, { useMemo, useState } from "react";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import "./SlideshowManager.css";

function normalizeItem(item, index) {
  if (typeof item === "string") {
    return { url: item, thumbUrl: item, alt_en: "", alt_te: "", order: index };
  }
  return {
    url: item?.url || item?.imageURL || item?.imageUrl || "",
    thumbUrl: item?.thumbUrl || item?.thumbURL || item?.url || item?.imageURL || "",
    alt_en: item?.alt_en || item?.alt || item?.caption_en || "",
    alt_te: item?.alt_te || item?.caption_te || "",
    order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index
  };
}

function cleanItems(items) {
  return items
    .map((item, index) => ({ ...item, order: index }))
    .filter((item) => item.url);
}

export default function SlideshowManager({
  label,
  images = [],
  onChange,
  uploadName,
  maxImages = 10
}) {
  const [draftUrl, setDraftUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(null);
  const items = useMemo(() => {
    const list = Array.isArray(images) ? images : [];
    return list.map(normalizeItem).filter((item) => item.url).sort((a, b) => a.order - b.order);
  }, [images]);

  const commit = (nextItems) => onChange(cleanItems(nextItems));

  function addImage(image) {
    if (items.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed.`);
      return;
    }
    commit([...items, normalizeItem(image, items.length)]);
    setError("");
  }

  async function handleFile(file) {
    if (!file) return;
    setBusy(true);
    setError("");
    setProgress({ percent: 0, message: "Preparing image..." });
    try {
      validateImageFile(file);
      const result = await uploadToImgBB(file, uploadName || "page_slideshow", { onProgress: setProgress });
      addImage({
        url: result.url,
        thumbUrl: result.thumbUrl,
        alt_en: "",
        alt_te: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  function updateItem(index, field, value) {
    commit(items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  }

  function moveItem(index, offset) {
    const target = index + offset;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    commit(next);
  }

  function removeItem(index) {
    commit(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="slideshow-manager">
      <div className="slideshow-manager__head">
        <div>
          <label>{label}</label>
          <p>{items.length}/{maxImages} images. Uploads are automatically optimized near 300 KB and appear as a clean slideshow.</p>
        </div>
      </div>

      <div className="slideshow-manager__add">
        <label className={`admin-upload-zone ${busy ? "is-busy" : ""}`}>
          <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
          <strong>{busy ? progress?.message || "Optimizing image..." : "Upload slideshow image"}</strong>
          <span>Recommended: wide, sharp ministry photos</span>
          {progress && <progress value={progress.percent || 0} max="100" style={{ width: "min(280px, 100%)" }} />}
        </label>
        <div className="slideshow-manager__url-row">
          <input
            className="admin-input"
            value={draftUrl}
            onChange={(e) => setDraftUrl(e.target.value)}
            placeholder="Paste image URL"
          />
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() => {
              if (!draftUrl.trim()) return;
              addImage({ url: draftUrl.trim(), thumbUrl: draftUrl.trim() });
              setDraftUrl("");
            }}
          >
            Add URL
          </button>
        </div>
      </div>

      <div className="slideshow-manager__list">
        {items.length === 0 ? (
          <div className="slideshow-manager__empty">No slideshow images yet.</div>
        ) : items.map((item, index) => (
          <article className="slideshow-manager__item" key={`${item.url}-${index}`}>
            <img src={item.thumbUrl || item.url} alt="" />
            <div className="slideshow-manager__fields">
              <input className="admin-input" value={item.url} onChange={(e) => updateItem(index, "url", e.target.value)} placeholder="Image URL" />
              <input className="admin-input" value={item.alt_en} onChange={(e) => updateItem(index, "alt_en", e.target.value)} placeholder="Alt text English" />
              <input className="admin-input" value={item.alt_te} onChange={(e) => updateItem(index, "alt_te", e.target.value)} placeholder="Alt text Telugu" lang="te" />
            </div>
            <div className="slideshow-manager__actions">
              <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => moveItem(index, -1)} disabled={index === 0}>Up</button>
              <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>Down</button>
              <button type="button" className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeItem(index)}>Delete</button>
            </div>
          </article>
        ))}
      </div>

      {error && <p className="slideshow-manager__error">{error}</p>}
    </div>
  );
}
