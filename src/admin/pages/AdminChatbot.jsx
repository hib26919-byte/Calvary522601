import React, { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { DEFAULT_KNOWLEDGE } from "../../lib/chatbotEngine";

const CATEGORIES = ["about", "contact", "ministries", "gallery", "scripture", "general"];

export default function AdminChatbot() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ id: "", question_en: "", question_te: "", answer_en: "", answer_te: "", keywords: "", category: "general" });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { fetchKnowledge(); }, []);

  async function fetchKnowledge() {
    const snap = await getDoc(doc(db, "chatbotKnowledge", "knowledgeBase"));
    setEntries(snap.exists() && snap.data().entries?.length ? snap.data().entries : [...DEFAULT_KNOWLEDGE]);
  }
  async function saveKnowledge(updatedEntries) {
    setSaving(true);
    try {
      await setDoc(doc(db, "chatbotKnowledge", "knowledgeBase"), { entries: updatedEntries, autoTrainEnabled: true, lastUpdated: serverTimestamp() });
    } finally {
      setSaving(false);
    }
  }
  function addEntry() {
    if (!newEntry.id || !newEntry.question_en || !newEntry.answer_en) return alert("ID, English question, and English answer are required.");
    const entry = { ...newEntry, id: newEntry.id.replace(/\s+/g, "_").toLowerCase(), keywords: newEntry.keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean) };
    const updated = [...entries, entry];
    setEntries(updated);
    saveKnowledge(updated);
    setNewEntry({ id: "", question_en: "", question_te: "", answer_en: "", answer_te: "", keywords: "", category: "general" });
  }
  function updateEntry(id, field, value) {
    setEntries((prev) => prev.map((entry) => entry.id === id ? { ...entry, [field]: value } : entry));
  }
  function deleteEntry(id) {
    if (!window.confirm("Delete this knowledge entry?")) return;
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    saveKnowledge(updated);
  }
  async function saveEditedEntry(id) {
    const updated = entries.map((entry) => entry.id !== id ? entry : { ...entry, keywords: typeof entry.keywords === "string" ? entry.keywords.split(",").map((k) => k.trim()).filter(Boolean) : entry.keywords });
    setEntries(updated);
    await saveKnowledge(updated);
    setEditId(null);
  }
  return (
    <div>
      <div className="admin-section-header"><h2>Chatbot Knowledge Base</h2><p>Add, edit, and delete bilingual answers. The public chatbot updates in real time.</p></div>
      <div className="admin-card"><h3 className="admin-card__title">Add New Entry</h3><div className="admin-form-grid"><input className="admin-input" placeholder="entry_id" value={newEntry.id} onChange={(e) => setNewEntry((p) => ({ ...p, id: e.target.value }))} /><select className="admin-select" value={newEntry.category} onChange={(e) => setNewEntry((p) => ({ ...p, category: e.target.value }))}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select><input className="admin-input admin-form-group--full" placeholder="keywords, comma, separated" value={newEntry.keywords} onChange={(e) => setNewEntry((p) => ({ ...p, keywords: e.target.value }))} /><input className="admin-input admin-form-group--full" placeholder="Question English" value={newEntry.question_en} onChange={(e) => setNewEntry((p) => ({ ...p, question_en: e.target.value }))} /><input className="admin-input admin-form-group--full" placeholder="Question Telugu" lang="te" value={newEntry.question_te} onChange={(e) => setNewEntry((p) => ({ ...p, question_te: e.target.value }))} /><textarea className="admin-textarea admin-form-group--full" rows={4} placeholder="Answer English" value={newEntry.answer_en} onChange={(e) => setNewEntry((p) => ({ ...p, answer_en: e.target.value }))} /><textarea className="admin-textarea admin-form-group--full" rows={4} placeholder="Answer Telugu" lang="te" value={newEntry.answer_te} onChange={(e) => setNewEntry((p) => ({ ...p, answer_te: e.target.value }))} /></div><button className="admin-btn admin-btn--primary" onClick={addEntry} disabled={saving}>{saving ? "Saving..." : "Add Entry"}</button></div>
      <div className="admin-card"><h3 className="admin-card__title">Knowledge Entries ({entries.length})</h3><div className="admin-knowledge-list">{entries.map((entry) => <div className="admin-knowledge-item" key={entry.id}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><strong>{entry.id} <small>{entry.category}</small></strong><span><button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => setEditId(editId === entry.id ? null : entry.id)}>Edit</button> <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteEntry(entry.id)}>Delete</button></span></div>{editId === entry.id ? <div style={{ display: "grid", gap: 8, marginTop: 10 }}><input className="admin-input" value={Array.isArray(entry.keywords) ? entry.keywords.join(", ") : entry.keywords} onChange={(e) => updateEntry(entry.id, "keywords", e.target.value)} /><textarea className="admin-textarea" rows={4} value={entry.answer_en || ""} onChange={(e) => updateEntry(entry.id, "answer_en", e.target.value)} /><textarea className="admin-textarea" rows={4} lang="te" value={entry.answer_te || ""} onChange={(e) => updateEntry(entry.id, "answer_te", e.target.value)} /><button className="admin-btn admin-btn--primary admin-btn--sm" onClick={() => saveEditedEntry(entry.id)}>Save</button></div> : <p>{entry.question_en}<br /><small>{(entry.answer_en || "").slice(0, 150)}</small></p>}</div>)}</div></div>
    </div>
  );
}
