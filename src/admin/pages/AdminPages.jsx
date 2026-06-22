import React, { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import { DEFAULT_GALLERY_CATEGORIES, findGalleryCategory } from "../../lib/galleryCategories";
import ImageUploader from "../components/ImageUploader";
import RichTextEditor from "../components/RichTextEditor";
import SlideshowManager from "../components/SlideshowManager";

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
  const updateFields = (fields) => setPageData((prev) => ({ ...prev, ...fields }));

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

  async function uploadImageField(file, field, name, extraFields = {}, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, name, options);
    updateFields({ [field]: result.url, ...extraFields });
  }

  async function uploadPageGalleryImage(file) {
    validateImageFile(file);
    const category = activeTab === "tribalPage" ? "tribal" : "children";
    const galleryCategory = findGalleryCategory(DEFAULT_GALLERY_CATEGORIES, category);
    const result = await uploadToImgBB(file, `${category}_gallery`);
    await addDoc(collection(db, "gallery"), {
      imageURL: result.url,
      thumbURL: result.thumbUrl,
      caption_en: activeTab === "tribalPage" ? "Tribal Outreach" : "Children's Ministry",
      caption_te: activeTab === "tribalPage" ? "గిరిజన సేవ" : "పిల్లల పరిచర్య",
      about_en: "",
      about_te: "",
      categoryId: galleryCategory?.id || category,
      category,
      categoryName: galleryCategory?.categoryName || category,
      originalSize: result.originalSize || null,
      optimizedSize: result.optimizedSize || result.compressedSize || null,
      optimizedType: result.optimizedType || result.compressedType || null,
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
      <div className="admin-section-header">
        <h2>Page Content Manager</h2>
        <p>Edit hero content, slideshow images, body copy, contact details, and scripture in English and Telugu.</p>
      </div>

      <div className="admin-tabs">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

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

              <div className="admin-form-group admin-form-group--full">
                <label>Fallback Hero Image</label>
                <ImageUploader
                  currentUrl={pageData.heroImageURL}
                  onUpload={(file, options) => uploadImageField(file, "heroImageURL", `${activeTab}_hero`, {}, options)}
                  onUrlChange={(url) => update("heroImageURL", url)}
                  label="Upload Hero Image"
                />
              </div>

              <div className="admin-form-group admin-form-group--full">
                <SlideshowManager
                  label="Hero Slideshow Images"
                  images={pageData.heroImages}
                  onChange={(images) => update("heroImages", images)}
                  uploadName={`${activeTab}_hero_slide`}
                  maxImages={10}
                />
              </div>

              <div className="admin-form-group admin-form-group--full">
                <label>Jesus Artwork Image URL (optional)</label>
                <ImageUploader
                  currentUrl={pageData.jesusImageURL}
                  onUpload={(file, options) => uploadImageField(file, "jesusImageURL", `${activeTab}_jesus_art`, {}, options)}
                  onUrlChange={(url) => update("jesusImageURL", url)}
                  label="Upload Jesus Ministry Artwork"
                />
              </div>
            </div>
          </div>

          {(activeTab === "aboutPage" || activeTab === "tribalPage" || activeTab === "childrensPage") && (
            <div className="admin-card">
              <h3 className="admin-card__title">Page Body Content</h3>
              <div className="admin-form-group admin-form-group--full">
                <label>Body Content (English)</label>
                <RichTextEditor
                  value={pageData.storyBody_en || pageData.description_en || ""}
                  onChange={(v) => update(activeTab === "aboutPage" ? "storyBody_en" : "description_en", v)}
                />
              </div>
              <div className="admin-form-group admin-form-group--full">
                <label>Body Content (Telugu)</label>
                <RichTextEditor
                  value={pageData.storyBody_te || pageData.description_te || ""}
                  onChange={(v) => update(activeTab === "aboutPage" ? "storyBody_te" : "description_te", v)}
                />
              </div>
            </div>
          )}

          {(activeTab === "tribalPage" || activeTab === "childrensPage") && (
            <div className="admin-card">
              <h3 className="admin-card__title">Upload Gallery Image to This Ministry Section</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: 12 }}>
                This upload is automatically assigned to {activeTab === "tribalPage" ? "Tribal Outreach" : "Children's Ministry"} gallery category.
              </p>
              <input className="admin-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => e.target.files?.[0] && uploadPageGalleryImage(e.target.files[0])} />
            </div>
          )}

          {activeTab === "aboutPage" && (
            <div className="admin-card">
              <h3 className="admin-card__title">Leadership Profiles and Portfolios</h3>
              <div className="admin-form-grid">
                <LeaderEditor
                  title="Founder - A. Ravi"
                  prefix="founder"
                  photoField="leaderPhotoURL"
                  legacyPhotoField="founderPhotoURL"
                  slideshowField="founderImages"
                  pageData={pageData}
                  update={update}
                  updateFields={updateFields}
                />
                <LeaderEditor
                  title="Son 1 - Anuparti Kranthi"
                  prefix="son1"
                  photoField="son1PhotoURL"
                  slideshowField="son1Images"
                  pageData={pageData}
                  update={update}
                  updateFields={updateFields}
                />
                <LeaderEditor
                  title="Son 2 - A. Prasanth"
                  prefix="son2"
                  photoField="son2PhotoURL"
                  slideshowField="son2Images"
                  pageData={pageData}
                  update={update}
                  updateFields={updateFields}
                />
              </div>
            </div>
          )}

          {activeTab === "homePage" && (
            <div className="admin-card">
              <h3 className="admin-card__title">Scripture Verses</h3>
              <div className="admin-form-grid">
                <Input label="Verse 1 Reference" value={pageData.verse1_reference} onChange={(v) => update("verse1_reference", v)} />
                <Area label="Verse 1 Text (English)" value={pageData.verse1_text_en} onChange={(v) => update("verse1_text_en", v)} />
                <Area label="Verse 1 Text (Telugu)" value={pageData.verse1_text_te} onChange={(v) => update("verse1_text_te", v)} lang="te" />
                <Input label="Verse 2 Reference" value={pageData.verse2_reference} onChange={(v) => update("verse2_reference", v)} />
                <Area label="Verse 2 Text (English)" value={pageData.verse2_text_en} onChange={(v) => update("verse2_text_en", v)} />
                <Area label="Verse 2 Text (Telugu)" value={pageData.verse2_text_te} onChange={(v) => update("verse2_text_te", v)} lang="te" />
              </div>
            </div>
          )}

          {activeTab === "contactPage" && (
            <div className="admin-card">
              <h3 className="admin-card__title">Contact Details</h3>
              <div className="admin-form-grid">
                <Area label="Address (English)" value={pageData.address_en} onChange={(v) => update("address_en", v)} />
                <Area label="Address (Telugu)" value={pageData.address_te} onChange={(v) => update("address_te", v)} lang="te" />
                <Input label="Phone" value={pageData.phone} onChange={(v) => update("phone", v)} />
                <Input label="Email" value={pageData.email} onChange={(v) => update("email", v)} />
                <Input label="Map Embed URL" value={pageData.mapEmbedURL} onChange={(v) => update("mapEmbedURL", v)} />
              </div>
            </div>
          )}

          <div className="admin-save-bar" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className={`admin-btn admin-btn--primary ${saved ? "admin-btn--success" : ""}`} onClick={savePage} disabled={saving}>
              {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
            </button>
            <button className="admin-btn admin-btn--danger" onClick={deletePageContent}>Clear Page Content</button>
          </div>
        </>
      )}
    </div>
  );
}

function LeaderEditor({ title, prefix, photoField, legacyPhotoField, slideshowField, pageData, update, updateFields }) {
  async function uploadLeaderPhoto(file, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, `${prefix}_leader_photo`, options);
    updateFields({ [photoField]: result.url, ...(legacyPhotoField ? { [legacyPhotoField]: result.url } : {}) });
  }

  const currentPhoto = pageData[photoField] || (legacyPhotoField ? pageData[legacyPhotoField] : "");

  return (
    <div className="admin-form-group admin-form-group--full">
      <h4 style={{ color: "var(--color-primary-dark)", margin: "8px 0" }}>{title}</h4>
      <div className="admin-form-grid">
        <Input label="Name (English)" value={pageData[`${prefix}Name_en`]} onChange={(v) => update(`${prefix}Name_en`, v)} />
        <Input label="Name (Telugu)" value={pageData[`${prefix}Name_te`]} onChange={(v) => update(`${prefix}Name_te`, v)} lang="te" />
        <Input label="Role (English)" value={pageData[`${prefix}Role_en`]} onChange={(v) => update(`${prefix}Role_en`, v)} />
        <Input label="Role (Telugu)" value={pageData[`${prefix}Role_te`]} onChange={(v) => update(`${prefix}Role_te`, v)} lang="te" />
        <Input label="Ministry Title (English)" value={pageData[`${prefix}Title_en`]} onChange={(v) => update(`${prefix}Title_en`, v)} />
        <Input label="Ministry Title (Telugu)" value={pageData[`${prefix}Title_te`]} onChange={(v) => update(`${prefix}Title_te`, v)} lang="te" />
        <Input label="Years / Credential (English)" value={pageData[`${prefix}Years_en`]} onChange={(v) => update(`${prefix}Years_en`, v)} />
        <Input label="Years / Credential (Telugu)" value={pageData[`${prefix}Years_te`]} onChange={(v) => update(`${prefix}Years_te`, v)} lang="te" />
        <Area label="Bio (English)" value={pageData[`${prefix}Bio_en`]} onChange={(v) => update(`${prefix}Bio_en`, v)} />
        <Area label="Bio (Telugu)" value={pageData[`${prefix}Bio_te`]} onChange={(v) => update(`${prefix}Bio_te`, v)} lang="te" />
        <div className="admin-form-group admin-form-group--full">
          <label>Main Profile Photo</label>
          <ImageUploader
            currentUrl={currentPhoto}
            onUpload={uploadLeaderPhoto}
            onUrlChange={(url) => updateFields({ [photoField]: url, ...(legacyPhotoField ? { [legacyPhotoField]: url } : {}) })}
            label={`Upload ${title} Photo`}
          />
        </div>
        <div className="admin-form-group admin-form-group--full">
          <SlideshowManager
            label={`${title} Portfolio Slideshow`}
            images={pageData[slideshowField]}
            onChange={(images) => update(slideshowField, images)}
            uploadName={`${prefix}_portfolio_slide`}
            maxImages={10}
          />
        </div>
      </div>
    </div>
  );
}

function Input({ label, value = "", onChange, lang }) {
  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <input className="admin-input" value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} />
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
