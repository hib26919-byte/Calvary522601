import React, { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";

export default function AdminFestivalBanner() {
  const [banners, setBanners] = useState([]);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title_en: "", title_te: "", subtitle_en: "", subtitle_te: "", imageURL: "", startDate: "", endDate: "", isActive: true });
  useEffect(() => { fetchBanners(); }, []);

  async function fetchBanners() {
    const snap = await getDocs(collection(db, "festivalBanners"));
    setBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  async function handleImageUpload(file) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "banner");
    setForm((p) => ({ ...p, imageURL: result.url }));
  }

  async function saveBanner() {
    if (!form.title_en || !form.startDate || !form.endDate) return alert("Please fill in title, start date, and end date.");
    setSaving(true);
    try {
      await addDoc(collection(db, "festivalBanners"), { ...form, startDate: Timestamp.fromDate(new Date(form.startDate)), endDate: Timestamp.fromDate(new Date(form.endDate)), createdAt: serverTimestamp() });
      setCreating(false);
      setForm({ title_en: "", title_te: "", subtitle_en: "", subtitle_te: "", imageURL: "", startDate: "", endDate: "", isActive: true });
      fetchBanners();
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id, current) {
    await updateDoc(doc(db, "festivalBanners", id), { isActive: !current });
    fetchBanners();
  }
  async function deleteBanner(id) {
    if (!window.confirm("Delete this banner?")) return;
    await deleteDoc(doc(db, "festivalBanners", id));
    fetchBanners();
  }

  const now = new Date();
  return (
    <div>
      <div className="admin-section-header"><h2>Festival Banners</h2><p>Create special occasion popups shown once per visitor session inside the active date range.</p><button className="admin-btn admin-btn--primary" onClick={() => setCreating(true)}>Create Banner</button></div>
      {creating && <div className="admin-card"><h3 className="admin-card__title">New Festival Banner</h3><div className="admin-form-grid">{["title_en", "title_te", "subtitle_en", "subtitle_te"].map((field) => <div key={field} className="admin-form-group admin-form-group--full"><label>{field}</label><input className="admin-input" value={form[field]} onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))} lang={field.endsWith("_te") ? "te" : undefined} /></div>)}<div className="admin-form-group"><label>Start Date</label><input className="admin-input" type="datetime-local" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} /></div><div className="admin-form-group"><label>End Date</label><input className="admin-input" type="datetime-local" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} /></div><div className="admin-form-group"><label>Active</label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} /></div><div className="admin-form-group admin-form-group--full"><label>Image</label><input className="admin-input" type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />{form.imageURL && <img src={form.imageURL} alt="Preview" style={{ maxWidth: 300, borderRadius: 8, marginTop: 8 }} />}</div></div><div style={{ display: "flex", gap: 10 }}><button className="admin-btn admin-btn--primary" onClick={saveBanner} disabled={saving}>{saving ? "Saving..." : "Save Banner"}</button><button className="admin-btn admin-btn--ghost" onClick={() => setCreating(false)}>Cancel</button></div></div>}
      <div className="admin-card">
        {banners.length === 0 ? <div className="admin-empty">No banners yet.</div> : banners.map((banner) => {
          const start = banner.startDate?.toDate?.() || new Date(banner.startDate);
          const end = banner.endDate?.toDate?.() || new Date(banner.endDate);
          const status = banner.isActive && now >= start && now <= end ? "Live Now" : banner.isActive && now < start ? "Scheduled" : now > end ? "Expired" : "Inactive";
          return <div className="admin-banner-row" key={banner.id}>{banner.imageURL && <img src={banner.imageURL} alt="" />}<div><strong>{banner.title_en}</strong><p>{start.toLocaleDateString()} → {end.toLocaleDateString()}</p><span>{status}</span></div><div><button className="admin-btn admin-btn--sm admin-btn--warning" onClick={() => toggleActive(banner.id, banner.isActive)}>{banner.isActive ? "Deactivate" : "Activate"}</button><button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteBanner(banner.id)}>Delete</button></div></div>;
        })}
      </div>
    </div>
  );
}
