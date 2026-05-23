import React, { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import ImageUploader from "../components/ImageUploader";
import RichTextEditor from "../components/RichTextEditor";

const PAGE_TABS = [
  { id: "homePage", label: "Home" },
  { id: "aboutPage", label: "About" },
  { id: "tribalPage", label: "Tribal Outreach" },
  { id: "childrensPage", label: "Children's Ministry" },
  { id: "contactPage", label: "Contact" }
];

export default function AdminPages() {
  const [activeTab, setActiveTab] = useState("homePage");
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchPage(activeTab); }, [activeTab]);

  async function fetchPage(pageId) {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "siteContent", pageId));
      setPageData(snap.exists() ? snap.data() : {});
    } finally {
      setLoading(false);
    }
  }

  const update = (field, value) => setPageData((prev) => ({ ...prev, [field]: value }));

  async function savePage() {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteContent", activeTab), { ...pageData, updatedAt: serverTimestamp() }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deletePageContent() {
    if (!window.confirm("Clear this page content from Firestore? Public fallback content will still show.")) return;
    await deleteDoc(doc(db, "siteContent", activeTab));
    setPageData({});
  }

  async function handleHeroImageUpload(file) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, `${activeTab}_hero`);
    update("heroImageURL", result.url);
  }

  async function uploadPageGalleryImage(file) {
    validateImageFile(file);
    const category = activeTab === "tribalPage" ? "tribal" : "children";
    const result = await uploadToImgBB(file, `${category}_gallery`);
    await addDoc(collection(db, "gallery"), {
      imageURL: result.url,
      thumbURL: result.thumbUrl,
      caption_en: activeTab === "tribalPage" ? "Tribal Outreach" : "Children's Ministry",
      caption_te: activeTab === "tribalPage" ? "గిరిజన సేవ" : "పిల్లల పరిచర్య",
      about_en: "",
      about_te: "",
      category,
      uploadedAt: serverTimestamp(),
      order: Date.now()
    });
    await addDoc(collection(db, "notifications"), {
      type: "gallery",
      title: "New image uploaded",
      message: `A new image was uploaded from ${activeTab === "tribalPage" ? "Tribal Outreach" : "Children's Ministry"} admin section.`,
      read: false,
      createdAt: serverTimestamp()
    });
    alert("Gallery image uploaded to the correct section.");
  }

  return (
    <div>
      <div className="admin-section-header"><h2>Page Content Manager</h2><p>Edit hero content, body copy, contact details, and scripture in English and Telugu.</p></div>
      <div className="admin-tabs">{PAGE_TABS.map((tab) => <button key={tab.id} className={`admin-tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</div>
      {loading ? <div className="admin-loading">Loading content...</div> : (
        <>
          <div className="admin-card">
            <h3 className="admin-card__title">Hero Section</h3>
            <div className="admin-form-grid">
              <Input label="Hero Title (English)" value={pageData.heroTitle_en} onChange={(v) => update("heroTitle_en", v)} />
              <Input label="Hero Title (Telugu)" value={pageData.heroTitle_te} onChange={(v) => update("heroTitle_te", v)} lang="te" />
              <Area label="Hero Subtitle (English)" value={pageData.heroSubtitle_en} onChange={(v) => update("heroSubtitle_en", v)} />
              <Area label="Hero Subtitle (Telugu)" value={pageData.heroSubtitle_te} onChange={(v) => update("heroSubtitle_te", v)} lang="te" />
              <Input label="CTA Text (English)" value={pageData.heroCTAText_en} onChange={(v) => update("heroCTAText_en", v)} />
              <Input label="CTA Text (Telugu)" value={pageData.heroCTAText_te} onChange={(v) => update("heroCTAText_te", v)} lang="te" />
              <Input label="CTA Link" value={pageData.heroCTALink} onChange={(v) => update("heroCTALink", v)} />
              <div className="admin-form-group admin-form-group--full"><label>Hero Background Image</label><ImageUploader currentUrl={pageData.heroImageURL} onUpload={handleHeroImageUpload} onUrlChange={(url) => update("heroImageURL", url)} label="Upload Hero Image" /></div>
              <div className="admin-form-group admin-form-group--full"><label>Jesus Artwork Image URL (optional)</label><ImageUploader currentUrl={pageData.jesusImageURL} onUpload={async (file) => { validateImageFile(file); const result = await uploadToImgBB(file, `${activeTab}_jesus_art`); update("jesusImageURL", result.url); }} onUrlChange={(url) => update("jesusImageURL", url)} label="Upload Jesus Ministry Artwork" /></div>
            </div>
          </div>
          {(activeTab === "aboutPage" || activeTab === "tribalPage" || activeTab === "childrensPage") && <div className="admin-card"><h3 className="admin-card__title">Page Body Content</h3><div className="admin-form-group admin-form-group--full"><label>Body Content (English)</label><RichTextEditor value={pageData.storyBody_en || pageData.description_en || ""} onChange={(v) => update(activeTab === "aboutPage" ? "storyBody_en" : "description_en", v)} /></div><div className="admin-form-group admin-form-group--full"><label>Body Content (Telugu)</label><RichTextEditor value={pageData.storyBody_te || pageData.description_te || ""} onChange={(v) => update(activeTab === "aboutPage" ? "storyBody_te" : "description_te", v)} /></div></div>}
          {(activeTab === "tribalPage" || activeTab === "childrensPage") && <div className="admin-card"><h3 className="admin-card__title">Upload Gallery Image to This Ministry Section</h3><p style={{ color: "var(--color-text-muted)", marginBottom: 12 }}>This upload is automatically assigned to {activeTab === "tribalPage" ? "Tribal Outreach" : "Children's Ministry"} gallery category.</p><input className="admin-input" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadPageGalleryImage(e.target.files[0])} /></div>}
          {activeTab === "aboutPage" && <div className="admin-card"><h3 className="admin-card__title">Leader Profile Photos</h3><div className="admin-form-grid"><div className="admin-form-group admin-form-group--full"><label>Founder Photo - A. Ravi</label><ImageUploader currentUrl={pageData.founderPhotoURL} onUpload={async (file) => { validateImageFile(file); const result = await uploadToImgBB(file, "founder_ravi"); update("founderPhotoURL", result.url); }} onUrlChange={(url) => update("founderPhotoURL", url)} label="Upload Founder Photo" /></div><div className="admin-form-group admin-form-group--full"><label>Present Leader Photo - A.Prasanth</label><ImageUploader currentUrl={pageData.leaderPhotoURL} onUpload={async (file) => { validateImageFile(file); const result = await uploadToImgBB(file, "leader_prasanth"); update("leaderPhotoURL", result.url); }} onUrlChange={(url) => update("leaderPhotoURL", url)} label="Upload Present Leader Photo" /></div></div></div>}
          {activeTab === "homePage" && <div className="admin-card"><h3 className="admin-card__title">Scripture Verses</h3><div className="admin-form-grid"><Input label="Verse 1 Reference" value={pageData.verse1_reference} onChange={(v) => update("verse1_reference", v)} /><Area label="Verse 1 Text (English)" value={pageData.verse1_text_en} onChange={(v) => update("verse1_text_en", v)} /><Area label="Verse 1 Text (Telugu)" value={pageData.verse1_text_te} onChange={(v) => update("verse1_text_te", v)} lang="te" /><Input label="Verse 2 Reference" value={pageData.verse2_reference} onChange={(v) => update("verse2_reference", v)} /><Area label="Verse 2 Text (English)" value={pageData.verse2_text_en} onChange={(v) => update("verse2_text_en", v)} /><Area label="Verse 2 Text (Telugu)" value={pageData.verse2_text_te} onChange={(v) => update("verse2_text_te", v)} lang="te" /></div></div>}
          {activeTab === "contactPage" && <div className="admin-card"><h3 className="admin-card__title">Contact Details</h3><div className="admin-form-grid"><Area label="Address (English)" value={pageData.address_en} onChange={(v) => update("address_en", v)} /><Area label="Address (Telugu)" value={pageData.address_te} onChange={(v) => update("address_te", v)} lang="te" /><Input label="Phone" value={pageData.phone} onChange={(v) => update("phone", v)} /><Input label="Email" value={pageData.email} onChange={(v) => update("email", v)} /><Input label="Map Embed URL" value={pageData.mapEmbedURL} onChange={(v) => update("mapEmbedURL", v)} /></div></div>}
          <div className="admin-save-bar" style={{ display: "flex", gap: 10, alignItems: "center" }}><button className={`admin-btn admin-btn--primary ${saved ? "admin-btn--success" : ""}`} onClick={savePage} disabled={saving}>{saving ? "Saving..." : saved ? "Saved" : "Save Changes"}</button><button className="admin-btn admin-btn--danger" onClick={deletePageContent}>Clear Page Content</button></div>
        </>
      )}
    </div>
  );
}

function Input({ label, value = "", onChange, lang }) {
  return <div className="admin-form-group"><label>{label}</label><input className="admin-input" value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} /></div>;
}
function Area({ label, value = "", onChange, lang }) {
  return <div className="admin-form-group admin-form-group--full"><label>{label}</label><textarea rows={3} className="admin-textarea" value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} /></div>;
}
