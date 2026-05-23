import React, { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import ImageUploader from "../components/ImageUploader";

export default function AdminSettings() {
  const [settings, setSettings] = useState({ siteName_en: "Calvary Prema Ministries", siteName_te: "కల్వరి ప్రేమ పరిచర్యలు", logoURL: "", footerText_en: "", footerText_te: "", socialLinks: { facebook: "", youtube: "", instagram: "", whatsapp: "" }, adminEmail: "", phone: "81793 05085", email: "" });
  const [saved, setSaved] = useState(false);
  useEffect(() => { load(); }, []);

  async function load() {
    const snap = await getDoc(doc(db, "siteContent", "globalSettings"));
    if (snap.exists()) setSettings((prev) => ({ ...prev, ...snap.data(), socialLinks: { ...prev.socialLinks, ...(snap.data().socialLinks || {}) } }));
  }
  function update(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }
  function updateSocial(field, value) {
    setSettings((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [field]: value } }));
  }
  async function uploadLogo(file) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "calvary_prema_logo");
    update("logoURL", result.url);
  }
  async function save() {
    await setDoc(doc(db, "siteContent", "globalSettings"), { ...settings, updatedAt: serverTimestamp() }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  return (
    <div>
      <div className="admin-section-header"><h2>Global Settings</h2><p>Manage logo, site names, footer copy, socials, and ministry contact information.</p></div>
      <div className="admin-card"><h3 className="admin-card__title">Identity</h3><div className="admin-form-grid"><Field label="Site Name (English)" value={settings.siteName_en} onChange={(v) => update("siteName_en", v)} /><Field label="Site Name (Telugu)" value={settings.siteName_te} onChange={(v) => update("siteName_te", v)} lang="te" /><div className="admin-form-group admin-form-group--full"><label>Logo</label><ImageUploader currentUrl={settings.logoURL} onUpload={uploadLogo} onUrlChange={(url) => update("logoURL", url)} label="Upload Logo" /></div><Field label="Footer Text (English)" value={settings.footerText_en} onChange={(v) => update("footerText_en", v)} /><Field label="Footer Text (Telugu)" value={settings.footerText_te} onChange={(v) => update("footerText_te", v)} lang="te" /></div></div>
      <div className="admin-card"><h3 className="admin-card__title">Contact & Social</h3><div className="admin-form-grid"><Field label="Phone" value={settings.phone} onChange={(v) => update("phone", v)} /><Field label="Email" value={settings.email} onChange={(v) => update("email", v)} /><Field label="Facebook URL" value={settings.socialLinks.facebook} onChange={(v) => updateSocial("facebook", v)} /><Field label="YouTube URL" value={settings.socialLinks.youtube} onChange={(v) => updateSocial("youtube", v)} /><Field label="Instagram URL" value={settings.socialLinks.instagram} onChange={(v) => updateSocial("instagram", v)} /><Field label="WhatsApp Number" value={settings.socialLinks.whatsapp} onChange={(v) => updateSocial("whatsapp", v)} /></div></div>
      <button className={`admin-btn admin-btn--primary ${saved ? "admin-btn--success" : ""}`} onClick={save}>{saved ? "Saved" : "Save Settings"}</button>
    </div>
  );
}

function Field({ label, value = "", onChange, lang }) {
  return <div className="admin-form-group"><label>{label}</label><input className="admin-input" value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} /></div>;
}
