import React, { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import { FALLBACK_HOME_SECTIONS } from "../../lib/dynamicContent";
import ImageUploader from "../components/ImageUploader";

const EMPTY_ENTRY = {
  title_en: "",
  title_te: "",
  subtitle_en: "",
  subtitle_te: "",
  description_en: "",
  description_te: "",
  date: "",
  location_en: "",
  location_te: "",
  category: "",
  status: "active",
  sortOrder: 50,
  imageURL: "",
  thumbURL: "",
  originalSize: null,
  optimizedSize: null,
  optimizedType: ""
};

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
  const [entryForm, setEntryForm] = useState(EMPTY_ENTRY);
  const [editingId, setEditingId] = useState(null);
  const [savingEntry, setSavingEntry] = useState(false);
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
    nextEntries.sort((a, b) => {
      const order = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
      if (order !== 0) return order;
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    setEntries(nextEntries);
  }

  async function fetchHomeCard() {
    const snap = await getDoc(doc(db, "homeSections", "bible-distribution"));
    setHomeCard({ ...EMPTY_HOME_CARD, ...(snap.exists() ? snap.data() : {}) });
  }

  function updateEntry(field, value) {
    setEntryForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateHomeCard(field, value) {
    setHomeCard((prev) => ({ ...prev, [field]: value }));
  }

  async function uploadEntryImage(file, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "bible_distribution_entry", options);
    setEntryForm((prev) => ({
      ...prev,
      imageURL: result.url,
      thumbURL: result.thumbUrl,
      originalSize: result.originalSize || null,
      optimizedSize: result.optimizedSize || result.compressedSize || null,
      optimizedType: result.optimizedType || result.compressedType || ""
    }));
  }

  async function uploadHomeImage(file, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "bible_distribution_home_card", options);
    updateHomeCard("imageURL", result.url);
  }

  function resetEntryForm() {
    setEditingId(null);
    setEntryForm(EMPTY_ENTRY);
  }

  function editEntry(entry) {
    setEditingId(entry.id);
    setEntryForm({
      ...EMPTY_ENTRY,
      ...entry,
      sortOrder: Number(entry.sortOrder || 0)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveEntry() {
    const title = entryForm.title_en.trim();
    if (!title) return alert("Please enter a title.");
    if (!entryForm.description_en.trim()) return alert("Please enter a description.");
    if (!entryForm.imageURL) return alert("Please upload or paste an image URL.");

    const payload = {
      ...entryForm,
      title_en: title,
      description_en: entryForm.description_en.trim(),
      sortOrder: Number(entryForm.sortOrder) || 0,
      updatedAt: serverTimestamp()
    };

    setSavingEntry(true);
    try {
      if (editingId) {
        await setDoc(doc(db, "bibleDistribution", editingId), payload, { merge: true });
      } else {
        await addDoc(collection(db, "bibleDistribution"), {
          ...payload,
          createdAt: serverTimestamp()
        });
        await addDoc(collection(db, "notifications"), {
          type: "bibleDistribution",
          title: "Bible distribution entry added",
          message: `"${title}" was added to the Bible Distribution page.`,
          read: false,
          createdAt: serverTimestamp()
        });
      }
      resetEntryForm();
      await fetchEntries();
    } finally {
      setSavingEntry(false);
    }
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

  async function deleteEntry(entry) {
    if (!window.confirm(`Delete "${entry.title_en || "this entry"}"?`)) return;
    await deleteDoc(doc(db, "bibleDistribution", entry.id));
    setEntries((prev) => prev.filter((item) => item.id !== entry.id));
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2>Bible Distribution</h2>
        <p>Manage Bible distribution images, details, ordering, visibility, and the home page card.</p>
      </div>

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card" style={{ "--kpi-color": "#4B168C" }}><div className="admin-kpi-card__value">{entries.length}</div><div className="admin-kpi-card__label">Total Entries</div></div>
        <div className="admin-kpi-card" style={{ "--kpi-color": "#2FB7B2" }}><div className="admin-kpi-card__value">{activeCount}</div><div className="admin-kpi-card__label">Active Entries</div></div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">{editingId ? "Edit Bible Distribution Entry" : "Add Bible Distribution Entry"}</h3>
        <div className="admin-form-grid">
          <Input label="Title (English)" value={entryForm.title_en} onChange={(v) => updateEntry("title_en", v)} />
          <Input label="Title (Telugu)" value={entryForm.title_te} onChange={(v) => updateEntry("title_te", v)} lang="te" />
          <Input label="Subtitle (English)" value={entryForm.subtitle_en} onChange={(v) => updateEntry("subtitle_en", v)} />
          <Input label="Subtitle (Telugu)" value={entryForm.subtitle_te} onChange={(v) => updateEntry("subtitle_te", v)} lang="te" />
          <Area label="Description (English)" value={entryForm.description_en} onChange={(v) => updateEntry("description_en", v)} />
          <Area label="Description (Telugu)" value={entryForm.description_te} onChange={(v) => updateEntry("description_te", v)} lang="te" />
          <Input label="Date" type="date" value={entryForm.date} onChange={(v) => updateEntry("date", v)} />
          <Input label="Location (English)" value={entryForm.location_en} onChange={(v) => updateEntry("location_en", v)} />
          <Input label="Location (Telugu)" value={entryForm.location_te} onChange={(v) => updateEntry("location_te", v)} lang="te" />
          <Input label="Category (optional)" value={entryForm.category} onChange={(v) => updateEntry("category", v)} />
          <Input label="Display Order" type="number" value={entryForm.sortOrder} onChange={(v) => updateEntry("sortOrder", v)} />
          <div className="admin-form-group">
            <label>Status</label>
            <select className="admin-select" value={entryForm.status} onChange={(e) => updateEntry("status", e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="admin-form-group admin-form-group--full">
            <label>Image</label>
            <ImageUploader
              currentUrl={entryForm.imageURL}
              onUpload={uploadEntryImage}
              onUrlChange={(url) => updateEntry("imageURL", url)}
              label="Upload Bible Distribution Image"
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button className="admin-btn admin-btn--primary" onClick={saveEntry} disabled={savingEntry}>{savingEntry ? "Saving..." : editingId ? "Save Entry" : "Add Entry"}</button>
          {editingId && <button className="admin-btn admin-btn--ghost" onClick={resetEntryForm}>Cancel Edit</button>}
        </div>
      </div>

      <div className="admin-card">
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

      <div className="admin-gallery-grid">
        {entries.map((entry) => (
          <article key={entry.id} className="admin-gallery-item">
            <img src={entry.thumbURL || entry.thumbUrl || entry.imageURL} alt={entry.title_en || "Bible distribution"} loading="lazy" />
            <div className="admin-gallery-item__body">
              <strong>{entry.title_en}</strong>
              <p>{entry.description_en}</p>
              <small>{entry.date || "No date"} {entry.location_en ? `| ${entry.location_en}` : ""}</small>
              <small>{entry.status === "inactive" ? "Inactive" : "Active"} | Order {entry.sortOrder || 0}</small>
              {(entry.optimizedSize || entry.compressedSize) && <small>{Math.round((entry.optimizedSize || entry.compressedSize) / 1024)} KB optimized</small>}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => editEntry(entry)}>Edit</button>
                <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteEntry(entry)}>Delete</button>
                <a className="admin-btn admin-btn--sm admin-btn--ghost" href={entry.imageURL} target="_blank" rel="noopener noreferrer">View</a>
              </div>
            </div>
          </article>
        ))}
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
