import React, { useCallback, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";

const CATEGORIES = [
  { value: "tribal", label: "Tribal Outreach" },
  { value: "children", label: "Children's Ministry" },
  { value: "church", label: "Church" },
  { value: "events", label: "Events" },
  { value: "other", label: "Other" }
];

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [uploadMeta, setUploadMeta] = useState({ category: "church", caption_en: "", caption_te: "", about_en: "", about_te: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => { fetchImages(); }, []);

  async function fetchImages() {
    const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
    const snap = await getDocs(q);
    setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  const handleFileDrop = useCallback(async (files) => {
    const validFiles = Array.from(files || []).filter((f) => {
      try { validateImageFile(f); return true; } catch { return false; }
    });
    if (!validFiles.length) return;
    setUploading(true);
    for (const file of validFiles) {
      try {
        const result = await uploadToImgBB(file);
        await addDoc(collection(db, "gallery"), { imageURL: result.url, thumbURL: result.thumbUrl, ...uploadMeta, uploadedAt: serverTimestamp(), order: Date.now() });
        await addDoc(collection(db, "notifications"), {
          type: "gallery",
          title: "New gallery item added",
          message: `A new image was uploaded to ${CATEGORIES.find((c) => c.value === uploadMeta.category)?.label || uploadMeta.category}.`,
          read: false,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        alert(`Upload failed for ${file.name}: ${err.message}`);
      }
    }
    setUploading(false);
    fetchImages();
  }, []);

  async function deleteImage(id) {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    await deleteDoc(doc(db, "gallery", id));
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function saveEdit(id) {
    await updateDoc(doc(db, "gallery", id), editData);
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, ...editData } : img));
    setEditingId(null);
    setEditData({});
  }

  const filteredImages = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <div>
      <div className="admin-section-header"><h2>Gallery Manager</h2><p>Upload, categorize, caption, and delete ministry photos hosted on ImgBB.</p></div>
      <div className="admin-card">
        <h3 className="admin-card__title">Upload to Gallery Section</h3>
        <div className="admin-form-grid">
          <div className="admin-form-group"><label>Upload Section</label><select className="admin-select" value={uploadMeta.category} onChange={(e) => setUploadMeta((p) => ({ ...p, category: e.target.value }))}>{CATEGORIES.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}</select></div>
          <div className="admin-form-group"><label>Caption English</label><input className="admin-input" value={uploadMeta.caption_en} onChange={(e) => setUploadMeta((p) => ({ ...p, caption_en: e.target.value }))} /></div>
          <div className="admin-form-group"><label>Caption Telugu</label><input className="admin-input" lang="te" value={uploadMeta.caption_te} onChange={(e) => setUploadMeta((p) => ({ ...p, caption_te: e.target.value }))} /></div>
          <div className="admin-form-group admin-form-group--full"><label>About Image English</label><textarea className="admin-textarea" rows={3} value={uploadMeta.about_en} onChange={(e) => setUploadMeta((p) => ({ ...p, about_en: e.target.value }))} /></div>
          <div className="admin-form-group admin-form-group--full"><label>About Image Telugu</label><textarea className="admin-textarea" rows={3} lang="te" value={uploadMeta.about_te} onChange={(e) => setUploadMeta((p) => ({ ...p, about_te: e.target.value }))} /></div>
        </div>
        <p style={{ color: "var(--color-text-muted)", margin: "12px 0" }}>Images are uploaded in HD quality up to about 2.5 MB while preserving clarity.</p>
      </div>
      <div className="admin-upload-zone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFileDrop(e.dataTransfer.files); }} onClick={() => document.getElementById("gallery-file-input").click()}>
        <input id="gallery-file-input" type="file" accept="image/*" multiple hidden onChange={(e) => handleFileDrop(e.target.files)} />
        <strong>{uploading ? "Compressing and uploading..." : `Upload to ${CATEGORIES.find((c) => c.value === uploadMeta.category)?.label}`}</strong><span>Drag and drop or click to browse</span>
      </div>
      <div className="admin-tabs" style={{ marginTop: 18 }}>
        <button className={`admin-filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All ({images.length})</button>
        {CATEGORIES.map((cat) => <button key={cat.value} className={`admin-filter-btn ${filter === cat.value ? "active" : ""}`} onClick={() => setFilter(cat.value)}>{cat.label}</button>)}
      </div>
      <div className="admin-gallery-grid">
        {filteredImages.map((img) => (
          <div key={img.id} className="admin-gallery-item">
            <img src={img.imageURL || img.thumbURL} alt={img.caption_en || "Gallery"} />
            <div className="admin-gallery-item__body">
              <strong>{CATEGORIES.find((c) => c.value === img.category)?.label || img.category}</strong>
              <p>{img.caption_en || "No caption"}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => { setEditingId(img.id); setEditData({ caption_en: img.caption_en || "", caption_te: img.caption_te || "", about_en: img.about_en || "", about_te: img.about_te || "", category: img.category || "church" }); }}>Edit</button>
                <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteImage(img.id)}>Delete</button>
                <a className="admin-btn admin-btn--sm admin-btn--ghost" href={img.imageURL} target="_blank" rel="noopener noreferrer">View</a>
              </div>
              {editingId === img.id && <div style={{ display: "grid", gap: 8, marginTop: 12 }}><input className="admin-input" value={editData.caption_en || ""} onChange={(e) => setEditData((p) => ({ ...p, caption_en: e.target.value }))} placeholder="Caption English" /><input className="admin-input" value={editData.caption_te || ""} onChange={(e) => setEditData((p) => ({ ...p, caption_te: e.target.value }))} placeholder="Caption Telugu" lang="te" /><textarea className="admin-textarea" rows={3} value={editData.about_en || ""} onChange={(e) => setEditData((p) => ({ ...p, about_en: e.target.value }))} placeholder="About this image (English)" /><textarea className="admin-textarea" rows={3} value={editData.about_te || ""} onChange={(e) => setEditData((p) => ({ ...p, about_te: e.target.value }))} placeholder="About this image (Telugu)" lang="te" /><select className="admin-select" value={editData.category || "church"} onChange={(e) => setEditData((p) => ({ ...p, category: e.target.value }))}>{CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select><button className="admin-btn admin-btn--primary admin-btn--sm" onClick={() => saveEdit(img.id)}>Save</button></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
