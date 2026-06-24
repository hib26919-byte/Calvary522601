import React, { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import { FALLBACK_HOME_SECTIONS } from "../../lib/dynamicContent";
import ImageUploader from "../components/ImageUploader";

const FALLBACK_BIBLE_CARD = FALLBACK_HOME_SECTIONS.find((section) => section.id === "bible-distribution") || {};

const EMPTY_HOME_CARD = {
  title_en: FALLBACK_BIBLE_CARD.title_en || "Bible Distribution",
  title_te: "",
  subtitle_en: FALLBACK_BIBLE_CARD.subtitle_en || "Sharing God's Word",
  subtitle_te: "",
  description_en: FALLBACK_BIBLE_CARD.description_en || "",
  description_te: "",
  buttonText_en: FALLBACK_BIBLE_CARD.buttonText_en || "Read More",
  buttonText_te: "",
  link: "/bible-distribution",
  imageURL: "",
  status: "active",
  sortOrder: FALLBACK_BIBLE_CARD.sortOrder || 30,
  icon: FALLBACK_BIBLE_CARD.icon || "B",
  color: FALLBACK_BIBLE_CARD.color || "#4B168C"
};

export default function AdminBibleDistribution() {
  const [entries, setEntries] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  
  const [replacingId, setReplacingId] = useState(null);
  const [replacingProgress, setReplacingProgress] = useState(null);

  const [homeCard, setHomeCard] = useState(EMPTY_HOME_CARD);
  const [homeSaved, setHomeSaved] = useState(false);

  const activeCount = useMemo(() => entries.filter((entry) => entry.status !== "inactive").length, [entries]);

  useEffect(() => {
    fetchEntries();
    fetchHomeCard();
  }, []);

  async function fetchEntries() {
    const snap = await getDocs(collection(db, "bibleDistribution"));
    const nextEntries = snap.docs.map((entryDoc) => ({ id: entryDoc.id, ...entryDoc.data() }));
    // Sort by order/sortOrder descending by default so new ones show at top in admin too
    nextEntries.sort((a, b) => {
      const orderA = a.sortOrder !== undefined ? a.sortOrder : (a.order !== undefined ? a.order : 0);
      const orderB = b.sortOrder !== undefined ? b.sortOrder : (b.order !== undefined ? b.order : 0);
      return Number(orderB) - Number(orderA);
    });
    setEntries(nextEntries);
  }

  async function fetchHomeCard() {
    const snap = await getDoc(doc(db, "homeSections", "bible-distribution"));
    setHomeCard({ ...EMPTY_HOME_CARD, ...(snap.exists() ? snap.data() : {}) });
  }

  function updateHomeCard(field, value) {
    setHomeCard((prev) => ({ ...prev, [field]: value }));
  }

  async function uploadHomeImage(file, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "bible_distribution_home_card", options);
    updateHomeCard("imageURL", result.url);
  }

  async function saveHomeCard() {
    await setDoc(doc(db, "homeSections", "bible-distribution"), {
      id: "bible-distribution",
      ...homeCard,
      link: homeCard.link || "/bible-distribution",
      sortOrder: Number(homeCard.sortOrder) || 30,
      updatedAt: serverTimestamp()
    }, { merge: true });
    setHomeSaved(true);
    setTimeout(() => setHomeSaved(false), 2400);
  }

  // Handle file selections for multi-upload
  function handleFileSelect(files) {
    const nextPending = [...pendingFiles];
    for (const file of Array.from(files || [])) {
      try {
        validateImageFile(file);
        nextPending.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          description: "",
          previewUrl: URL.createObjectURL(file)
        });
      } catch (err) {
        alert(`${file.name}: ${err.message}`);
      }
    }
    setPendingFiles(nextPending);
  }

  function handlePendingDescriptionChange(id, value) {
    setPendingFiles((prev) => prev.map((item) => item.id === id ? { ...item, description: value } : item));
  }

  function removePendingFile(id) {
    setPendingFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  }

  function clearPendingQueue() {
    pendingFiles.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    });
    setPendingFiles([]);
  }

  // Upload and Save all pending files
  async function handleUploadAll() {
    if (!pendingFiles.length) return;
    setUploading(true);
    
    for (let i = 0; i < pendingFiles.length; i++) {
      const item = pendingFiles[i];
      try {
        setUploadProgress({
          percent: 0,
          message: `Optimizing and uploading image ${i + 1} of ${pendingFiles.length}...`
        });
        
        const result = await uploadToImgBB(item.file, `bible_distribution_entry_${Date.now()}`, {
          onProgress: (p) => setUploadProgress({
            percent: p.percent,
            message: `Uploading image ${i + 1} of ${pendingFiles.length}: ${p.message || ""}`
          })
        });

        const desc = item.description.trim();
        const payload = {
          imageURL: result.url,
          thumbURL: result.thumbUrl,
          description: desc,
          description_en: desc, // backup for standard localized rendering
          status: "active",
          sortOrder: Date.now() + i, // ascending sequence representation
          order: Date.now() + i,
          originalSize: result.originalSize || null,
          optimizedSize: result.optimizedSize || result.compressedSize || null,
          optimizedType: result.optimizedType || result.compressedType || "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        await addDoc(collection(db, "bibleDistribution"), payload);

        await addDoc(collection(db, "notifications"), {
          type: "bibleDistribution",
          title: "Bible distribution entry added",
          message: `A new photo was added to the Bible Distribution gallery: "${desc || "No description"}".`,
          read: false,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        alert(`Upload failed for ${item.file.name}: ${err.message}`);
      }
    }
    
    clearPendingQueue();
    setUploading(false);
    setUploadProgress(null);
    await fetchEntries();
  }

  // Inline edit functions
  function startEdit(entry) {
    setEditingId(entry.id);
    setEditDescription(entry.description || entry.description_en || "");
  }

  async function saveDescriptionEdit(id) {
    try {
      const desc = editDescription.trim();
      await updateDoc(doc(db, "bibleDistribution", id), {
        description: desc,
        description_en: desc,
        updatedAt: serverTimestamp()
      });
      setEntries((prev) => prev.map((item) => item.id === id ? { ...item, description: desc, description_en: desc } : item));
      setEditingId(null);
    } catch (err) {
      alert(`Failed to save description: ${err.message}`);
    }
  }

  // Replace image
  async function handleReplaceImage(id, file) {
    if (!file) return;
    try {
      validateImageFile(file);
      setReplacingId(id);
      setReplacingProgress({ percent: 0, message: "Preparing image..." });
      
      const result = await uploadToImgBB(file, `bible_distribution_replace_${Date.now()}`, {
        onProgress: (p) => setReplacingProgress(p)
      });
      
      await updateDoc(doc(db, "bibleDistribution", id), {
        imageURL: result.url,
        thumbURL: result.thumbUrl,
        originalSize: result.originalSize || null,
        optimizedSize: result.optimizedSize || result.compressedSize || null,
        optimizedType: result.optimizedType || result.compressedType || null,
        updatedAt: serverTimestamp()
      });
      
      await fetchEntries();
    } catch (err) {
      alert(`Replace failed: ${err.message}`);
    } finally {
      setReplacingId(null);
      setReplacingProgress(null);
    }
  }

  // Toggle active/inactive
  async function toggleStatus(entry) {
    const nextStatus = entry.status === "inactive" ? "active" : "inactive";
    try {
      await updateDoc(doc(db, "bibleDistribution", entry.id), {
        status: nextStatus,
        updatedAt: serverTimestamp()
      });
      setEntries((prev) => prev.map((item) => item.id === entry.id ? { ...item, status: nextStatus } : item));
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  }

  // Delete entry
  async function deleteEntry(entry) {
    if (!window.confirm("Delete this gallery entry? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "bibleDistribution", entry.id));
      setEntries((prev) => prev.filter((item) => item.id !== entry.id));
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2>Bible Distribution Gallery</h2>
        <p>Upload photos of Bible distributions, add descriptions, manage entries, and control what appears in the public gallery.</p>
      </div>

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card" style={{ "--kpi-color": "#4B168C" }}>
          <div className="admin-kpi-card__value">{entries.length}</div>
          <div className="admin-kpi-card__label">Total Images</div>
        </div>
        <div className="admin-kpi-card" style={{ "--kpi-color": "#2FB7B2" }}>
          <div className="admin-kpi-card__value">{activeCount}</div>
          <div className="admin-kpi-card__label">Active Images</div>
        </div>
      </div>

      {/* Upload Zone & Pending Queue Card */}
      <div className="admin-card">
        <h3 className="admin-card__title">Add Bible Distribution Images</h3>
        
        <div
          className="admin-upload-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files); }}
          onClick={() => !uploading && document.getElementById("multi-file-input").click()}
          style={{
            cursor: uploading ? "not-allowed" : "pointer",
            border: "2px dashed var(--color-primary)",
            borderRadius: 12,
            padding: 32,
            textAlign: "center",
            background: "#f8f6fc",
            transition: "0.2s"
          }}
        >
          <input
            id="multi-file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
            disabled={uploading}
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <strong>Select Multiple Images</strong>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>
            Drag & drop images here, or click to browse. Supports JPG, PNG, JPEG, and WebP.
          </p>
        </div>

        {pendingFiles.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h4 style={{ fontWeight: "bold", color: "var(--color-primary-dark)" }}>Pending Images ({pendingFiles.length})</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 12 }}>
              {pendingFiles.map((item) => (
                <div key={item.id} style={{ display: "flex", flexDirection: "column", border: "1px solid #e5e1eb", borderRadius: 8, background: "white", padding: 12, gap: 10 }}>
                  <img
                    src={item.previewUrl}
                    alt="Pending preview"
                    style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: "bold" }}>Description</label>
                    <textarea
                      className="admin-textarea"
                      rows={2}
                      placeholder="e.g. Bible distribution in tribal villages"
                      value={item.description}
                      onChange={(e) => handlePendingDescriptionChange(item.id, e.target.value)}
                      style={{ fontSize: 13 }}
                    />
                  </div>
                  <button
                    className="admin-btn admin-btn--sm admin-btn--danger"
                    onClick={() => removePendingFile(item.id)}
                    disabled={uploading}
                    style={{ minHeight: "auto", padding: "6px 12px", width: "fit-content", alignSelf: "flex-end" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                className="admin-btn admin-btn--primary"
                onClick={handleUploadAll}
                disabled={uploading}
              >
                {uploading ? uploadProgress?.message || "Uploading..." : "Save and Upload All"}
              </button>
              <button
                className="admin-btn admin-btn--ghost"
                onClick={clearPendingQueue}
                disabled={uploading}
              >
                Clear Queue
              </button>
            </div>
            {uploading && uploadProgress && (
              <div style={{ marginTop: 12 }}>
                <progress value={uploadProgress.percent || 0} max="100" style={{ width: "100%" }} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Entries Table Card */}
      <div className="admin-card" style={{ marginTop: 24 }}>
        <h3 className="admin-card__title">Uploaded Gallery Entries</h3>
        
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
            <thead>
              <tr style={{ background: "var(--color-primary-dark)", color: "white", textAlign: "left" }}>
                <th style={{ padding: "12px 16px", border: "1px solid #e5e1eb", width: 120 }}>Image</th>
                <th style={{ padding: "12px 16px", border: "1px solid #e5e1eb" }}>Description</th>
                <th style={{ padding: "12px 16px", border: "1px solid #e5e1eb", width: 120, textAlign: "center" }}>Status</th>
                <th style={{ padding: "12px 16px", border: "1px solid #e5e1eb", width: 200 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: 24, textAlign: "center", color: "var(--color-text-muted)" }}>
                    No entries found. Select some images above to upload.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => {
                  const isEditing = editingId === entry.id;
                  const isReplacing = replacingId === entry.id;
                  return (
                    <tr key={entry.id} style={{ borderBottom: "1px solid #e5e1eb", background: "rgba(255,255,255,0.72)" }}>
                      <td style={{ padding: 12, border: "1px solid #e5e1eb", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                          <img
                            src={entry.thumbURL || entry.thumbUrl || entry.imageURL}
                            alt="Bible distribution preview"
                            style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e1eb" }}
                          />
                          <button
                            className="admin-btn admin-btn--sm admin-btn--ghost"
                            onClick={() => document.getElementById(`replace-file-${entry.id}`).click()}
                            disabled={isReplacing || uploading}
                            style={{ fontSize: 11, padding: "4px 8px", minHeight: "auto" }}
                          >
                            {isReplacing ? "Replacing..." : "Replace"}
                          </button>
                          <input
                            id={`replace-file-${entry.id}`}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            hidden
                            onChange={(e) => handleReplaceImage(entry.id, e.target.files?.[0])}
                          />
                          {isReplacing && (
                            <span style={{ fontSize: 10, color: "var(--color-primary)" }}>
                              {replacingProgress?.percent || 0}%
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: 12, border: "1px solid #e5e1eb", verticalAlign: "middle" }}>
                        {isEditing ? (
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            style={{ width: "100%", boxSizing: "border-box" }}
                          />
                        ) : (
                          <p style={{ margin: 0, fontSize: 14, whiteSpace: "pre-wrap" }}>
                            {entry.description || entry.description_en || "(No description)"}
                          </p>
                        )}
                      </td>
                      <td style={{ padding: 12, border: "1px solid #e5e1eb", verticalAlign: "middle", textAlign: "center" }}>
                        <button
                          className={`admin-btn admin-btn--sm`}
                          onClick={() => toggleStatus(entry)}
                          style={{
                            minHeight: "auto",
                            padding: "6px 12px",
                            fontSize: 12,
                            background: entry.status !== "inactive" ? "#2FB7B2" : "#a19fa6",
                            color: "white",
                            border: "none",
                            borderRadius: 16,
                            cursor: "pointer"
                          }}
                        >
                          {entry.status !== "inactive" ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td style={{ padding: 12, border: "1px solid #e5e1eb", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          {isEditing ? (
                            <>
                              <button className="admin-btn admin-btn--sm admin-btn--primary" onClick={() => saveDescriptionEdit(entry.id)}>Save</button>
                              <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => startEdit(entry)}>Edit</button>
                              <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteEntry(entry)}>Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legacy Home Card Settings Card */}
      <div className="admin-card" style={{ marginTop: 24 }}>
        <h3 className="admin-card__title">Home Page Bible Distribution Card</h3>
        <div className="admin-form-grid">
          <Input label="Title (English)" value={homeCard.title_en} onChange={(v) => updateHomeCard("title_en", v)} />
          <Input label="Title (Telugu)" value={homeCard.title_te} onChange={(v) => updateHomeCard("title_te", v)} lang="te" />
          <Input label="Subtitle (English)" value={homeCard.subtitle_en} onChange={(v) => updateHomeCard("subtitle_en", v)} />
          <Input label="Subtitle (Telugu)" value={homeCard.subtitle_te} onChange={(v) => updateHomeCard("subtitle_te", v)} lang="te" />
          <Area label="Description (English)" value={homeCard.description_en} onChange={(v) => updateHomeCard("description_en", v)} />
          <Area label="Description (Telugu)" value={homeCard.description_te} onChange={(v) => updateHomeCard("description_te", v)} lang="te" />
          <Input label="Button Text (English)" value={homeCard.buttonText_en} onChange={(v) => updateHomeCard("buttonText_en", v)} />
          <Input label="Button Text (Telugu)" value={homeCard.buttonText_te} onChange={(v) => updateHomeCard("buttonText_te", v)} lang="te" />
          <Input label="Link" value={homeCard.link} onChange={(v) => updateHomeCard("link", v)} />
          <Input label="Display Order" type="number" value={homeCard.sortOrder} onChange={(v) => updateHomeCard("sortOrder", v)} />
          <Input label="Icon / Short Label" value={homeCard.icon} onChange={(v) => updateHomeCard("icon", v)} />
          <div className="admin-form-group">
            <label>Status</label>
            <select className="admin-select" value={homeCard.status} onChange={(e) => updateHomeCard("status", e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Color</label>
            <input className="admin-input" type="color" value={homeCard.color || "#4B168C"} onChange={(e) => updateHomeCard("color", e.target.value)} />
          </div>
          <div className="admin-form-group admin-form-group--full">
            <label>Card Image</label>
            <ImageUploader
              currentUrl={homeCard.imageURL}
              onUpload={uploadHomeImage}
              onUrlChange={(url) => updateHomeCard("imageURL", url)}
              label="Upload Bible Distribution Card Image"
            />
          </div>
        </div>
        <button className={`admin-btn admin-btn--primary ${homeSaved ? "admin-btn--success" : ""}`} onClick={saveHomeCard}>{homeSaved ? "Saved" : "Save Home Card"}</button>
      </div>
    </div>
  );
}

function Input({ label, value = "", onChange, lang, type = "text" }) {
  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <input className="admin-input" type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} />
    </div>
  );
}

function Area({ label, value = "", onChange, lang }) {
  return (
    <div className="admin-form-group admin-form-group--full">
      <label>{label}</label>
      <textarea rows={3} className="admin-textarea" value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} />
    </div>
  );
}
