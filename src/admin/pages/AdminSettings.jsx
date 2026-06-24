import React, { useEffect, useMemo, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import {
  FALLBACK_HOME_SECTIONS,
  FALLBACK_NAV_ITEMS,
  mergeHomeSections,
  mergeNavigationItems,
  slugifyRecordId,
  sortByDisplayOrder
} from "../../lib/dynamicContent";
import ImageUploader from "../components/ImageUploader";

const EMPTY_NAV_FORM = {
  label_en: "",
  label_te: "",
  path: "",
  parentId: "",
  sortOrder: 70,
  status: "active",
  icon: "",
  bottomVisible: true
};

const EMPTY_HOME_FORM = {
  title_en: "",
  title_te: "",
  subtitle_en: "",
  subtitle_te: "",
  description_en: "",
  description_te: "",
  buttonText_en: "Read More",
  buttonText_te: "",
  link: "",
  imageURL: "",
  sortOrder: 50,
  status: "active",
  icon: "",
  color: "#4B168C"
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName_en: "Calvary Prema Ministries",
    siteName_te: "కల్వరి ప్రేమ పరిచర్యలు",
    logoURL: "",
    footerText_en: "",
    footerText_te: "",
    socialLinks: { facebook: "", youtube: "", instagram: "", whatsapp: "" },
    adminEmail: "",
    phone: "81793 05085",
    email: ""
  });
  const [saved, setSaved] = useState(false);
  const [navRecords, setNavRecords] = useState([]);
  const [navForm, setNavForm] = useState(EMPTY_NAV_FORM);
  const [editingNavId, setEditingNavId] = useState(null);
  const [navBusy, setNavBusy] = useState(false);
  const [homeRecords, setHomeRecords] = useState([]);
  const [homeForm, setHomeForm] = useState(EMPTY_HOME_FORM);
  const [editingHomeId, setEditingHomeId] = useState(null);
  const [homeBusy, setHomeBusy] = useState(false);

  const effectiveNavItems = useMemo(() => mergeNavigationItems(navRecords), [navRecords]);
  const effectiveHomeSections = useMemo(() => mergeHomeSections(homeRecords), [homeRecords]);
  const fallbackIds = useMemo(() => new Set(FALLBACK_NAV_ITEMS.map((item) => item.id)), []);
  const fallbackHomeIds = useMemo(() => new Set(FALLBACK_HOME_SECTIONS.map((item) => item.id)), []);

  useEffect(() => {
    load();
    fetchNavigation();
    fetchHomeSections();
  }, []);

  async function load() {
    const snap = await getDoc(doc(db, "siteContent", "globalSettings"));
    if (snap.exists()) setSettings((prev) => ({ ...prev, ...snap.data(), socialLinks: { ...prev.socialLinks, ...(snap.data().socialLinks || {}) } }));
  }

  async function fetchNavigation() {
    const snap = await getDocs(collection(db, "navItems"));
    setNavRecords(sortByDisplayOrder(snap.docs.map((navDoc) => ({ id: navDoc.id, ...navDoc.data() }))));
  }

  async function fetchHomeSections() {
    const snap = await getDocs(collection(db, "homeSections"));
    setHomeRecords(sortByDisplayOrder(snap.docs.map((sectionDoc) => ({ id: sectionDoc.id, ...sectionDoc.data() }))));
  }

  function update(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function updateSocial(field, value) {
    setSettings((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [field]: value } }));
  }

  function updateNav(field, value) {
    setNavForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateHome(field, value) {
    setHomeForm((prev) => ({ ...prev, [field]: value }));
  }

  async function uploadLogo(file, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "calvary_prema_logo", options);
    update("logoURL", result.url);
  }

  async function uploadHomeImage(file, options = {}) {
    validateImageFile(file);
    const result = await uploadToImgBB(file, "home_section_card", options);
    updateHome("imageURL", result.url);
  }

  async function save() {
    await setDoc(doc(db, "siteContent", "globalSettings"), { ...settings, updatedAt: serverTimestamp() }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function resetNavForm() {
    setEditingNavId(null);
    setNavForm(EMPTY_NAV_FORM);
  }

  function editNavItem(item) {
    setEditingNavId(item.id);
    setNavForm({
      label_en: item.label_en || "",
      label_te: item.label_te || "",
      path: item.path || "",
      parentId: item.parentId || "",
      sortOrder: item.sortOrder || 0,
      status: item.status || "active",
      icon: item.icon || "",
      bottomVisible: item.bottomVisible !== false
    });
  }

  async function saveNavItem() {
    const label = navForm.label_en.trim();
    if (!label) return alert("Please enter a navigation label.");
    const id = editingNavId || slugifyRecordId(navForm.path || label);
    if (!id) return alert("Please use letters or numbers for the navigation item.");

    setNavBusy(true);
    try {
      await setDoc(doc(db, "navItems", id), {
        id,
        label_en: label,
        label_te: navForm.label_te || "",
        path: navForm.path || "",
        parentId: navForm.parentId || "",
        sortOrder: Number(navForm.sortOrder) || 0,
        status: navForm.status,
        icon: navForm.icon || label.charAt(0).toUpperCase(),
        bottomVisible: navForm.bottomVisible !== false,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      }, { merge: true });
      resetNavForm();
      await fetchNavigation();
    } finally {
      setNavBusy(false);
    }
  }

  async function disableOrDeleteNavItem(item) {
    if (fallbackIds.has(item.id)) {
      if (!window.confirm(`Disable "${item.label_en}" from the menu?`)) return;
      await setDoc(doc(db, "navItems", item.id), {
        ...item,
        status: "inactive",
        updatedAt: serverTimestamp()
      }, { merge: true });
    } else {
      if (!window.confirm(`Delete "${item.label_en}" from the menu?`)) return;
      await deleteDoc(doc(db, "navItems", item.id));
    }
    await fetchNavigation();
  }

  function resetHomeForm() {
    setEditingHomeId(null);
    setHomeForm(EMPTY_HOME_FORM);
  }

  function editHomeSection(section) {
    setEditingHomeId(section.id);
    setHomeForm({
      title_en: section.title_en || "",
      title_te: section.title_te || "",
      subtitle_en: section.subtitle_en || "",
      subtitle_te: section.subtitle_te || "",
      description_en: section.description_en || "",
      description_te: section.description_te || "",
      buttonText_en: section.buttonText_en || "Read More",
      buttonText_te: section.buttonText_te || "",
      link: section.link || "",
      imageURL: section.imageURL || "",
      sortOrder: section.sortOrder || 0,
      status: section.status || "active",
      icon: section.icon || "",
      color: section.color || "#4B168C"
    });
  }

  async function saveHomeSection() {
    const title = homeForm.title_en.trim();
    if (!title) return alert("Please enter a home card title.");
    const id = editingHomeId || slugifyRecordId(homeForm.link || title);
    if (!id) return alert("Please use letters or numbers for the home card.");

    setHomeBusy(true);
    try {
      await setDoc(doc(db, "homeSections", id), {
        id,
        ...homeForm,
        title_en: title,
        sortOrder: Number(homeForm.sortOrder) || 0,
        icon: homeForm.icon || title.charAt(0).toUpperCase(),
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      }, { merge: true });
      resetHomeForm();
      await fetchHomeSections();
    } finally {
      setHomeBusy(false);
    }
  }

  async function disableOrDeleteHomeSection(section) {
    if (fallbackHomeIds.has(section.id)) {
      if (!window.confirm(`Disable "${section.title_en}" from the home page?`)) return;
      await setDoc(doc(db, "homeSections", section.id), {
        ...section,
        status: "inactive",
        updatedAt: serverTimestamp()
      }, { merge: true });
    } else {
      if (!window.confirm(`Delete "${section.title_en}" from the home page?`)) return;
      await deleteDoc(doc(db, "homeSections", section.id));
    }
    await fetchHomeSections();
  }

  return (
    <div>
      <div className="admin-section-header"><h2>Global Settings</h2><p>Manage logo, site names, footer copy, socials, contact information, and the public navigation menu.</p></div>

      <div className="admin-card">
        <h3 className="admin-card__title">Identity</h3>
        <div className="admin-form-grid">
          <Field label="Site Name (English)" value={settings.siteName_en} onChange={(v) => update("siteName_en", v)} />
          <Field label="Site Name (Telugu)" value={settings.siteName_te} onChange={(v) => update("siteName_te", v)} lang="te" />
          <div className="admin-form-group admin-form-group--full">
            <label>Logo</label>
            <ImageUploader currentUrl={settings.logoURL} onUpload={uploadLogo} onUrlChange={(url) => update("logoURL", url)} label="Upload Logo" />
          </div>
          <Field label="Footer Text (English)" value={settings.footerText_en} onChange={(v) => update("footerText_en", v)} />
          <Field label="Footer Text (Telugu)" value={settings.footerText_te} onChange={(v) => update("footerText_te", v)} lang="te" />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Contact & Social</h3>
        <div className="admin-form-grid">
          <Field label="Phone" value={settings.phone} onChange={(v) => update("phone", v)} />
          <Field label="Email" value={settings.email} onChange={(v) => update("email", v)} />
          <Field label="Facebook URL" value={settings.socialLinks.facebook} onChange={(v) => updateSocial("facebook", v)} />
          <Field label="YouTube URL" value={settings.socialLinks.youtube} onChange={(v) => updateSocial("youtube", v)} />
          <Field label="Instagram URL" value={settings.socialLinks.instagram} onChange={(v) => updateSocial("instagram", v)} />
          <Field label="WhatsApp Number" value={settings.socialLinks.whatsapp} onChange={(v) => updateSocial("whatsapp", v)} />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Navigation Menu</h3>
        <div className="admin-form-grid">
          <Field label="Label (English)" value={navForm.label_en} onChange={(v) => updateNav("label_en", v)} />
          <Field label="Label (Telugu)" value={navForm.label_te} onChange={(v) => updateNav("label_te", v)} lang="te" />
          <Field label="Path" value={navForm.path} onChange={(v) => updateNav("path", v)} placeholder="/bible-distribution" />
          <div className="admin-form-group">
            <label>Parent Menu</label>
            <select className="admin-select" value={navForm.parentId} onChange={(e) => updateNav("parentId", e.target.value)}>
              <option value="">Top Level</option>
              {effectiveNavItems.filter((item) => !item.parentId && item.id !== editingNavId).map((item) => (
                <option key={item.id} value={item.id}>{item.label_en}</option>
              ))}
            </select>
          </div>
          <Field label="Display Order" type="number" value={navForm.sortOrder} onChange={(v) => updateNav("sortOrder", v)} />
          <Field label="Icon / Short Label" value={navForm.icon} onChange={(v) => updateNav("icon", v)} />
          <div className="admin-form-group">
            <label>Status</label>
            <select className="admin-select" value={navForm.status} onChange={(e) => updateNav("status", e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <label className="admin-check-row">
            <input type="checkbox" checked={navForm.bottomVisible} onChange={(e) => updateNav("bottomVisible", e.target.checked)} />
            Show in mobile bottom nav
          </label>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button className="admin-btn admin-btn--primary" onClick={saveNavItem} disabled={navBusy}>{navBusy ? "Saving..." : editingNavId ? "Save Menu Item" : "Add Menu Item"}</button>
          {editingNavId && <button className="admin-btn admin-btn--ghost" onClick={resetNavForm}>Cancel Edit</button>}
        </div>

        <div className="admin-category-table" role="table" aria-label="Navigation items">
          <div className="admin-category-table__row admin-category-table__row--head" role="row">
            <span>Label</span><span>Path</span><span>Status</span><span>Actions</span>
          </div>
          {effectiveNavItems.map((item) => (
            <div className="admin-category-table__row" role="row" key={item.id}>
              <span><b>{item.icon}</b>{item.label_en}<small>{item.parentId ? `Child of ${item.parentId}` : "Top level"} | Order {item.sortOrder}</small></span>
              <span>{item.path || "Dropdown"}</span>
              <span>{item.status === "inactive" ? "Inactive" : "Active"}</span>
              <span>
                <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => editNavItem(item)}>Edit</button>
                <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => disableOrDeleteNavItem(item)}>{fallbackIds.has(item.id) ? "Disable" : "Delete"}</button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Home Page Cards</h3>
        <div className="admin-form-grid">
          <Field label="Title (English)" value={homeForm.title_en} onChange={(v) => updateHome("title_en", v)} />
          <Field label="Title (Telugu)" value={homeForm.title_te} onChange={(v) => updateHome("title_te", v)} lang="te" />
          <Field label="Subtitle (English)" value={homeForm.subtitle_en} onChange={(v) => updateHome("subtitle_en", v)} />
          <Field label="Subtitle (Telugu)" value={homeForm.subtitle_te} onChange={(v) => updateHome("subtitle_te", v)} lang="te" />
          <div className="admin-form-group admin-form-group--full">
            <label>Description (English)</label>
            <textarea className="admin-textarea" rows={3} value={homeForm.description_en || ""} onChange={(e) => updateHome("description_en", e.target.value)} />
          </div>
          <div className="admin-form-group admin-form-group--full">
            <label>Description (Telugu)</label>
            <textarea className="admin-textarea" rows={3} value={homeForm.description_te || ""} onChange={(e) => updateHome("description_te", e.target.value)} lang="te" />
          </div>
          <Field label="Button Text (English)" value={homeForm.buttonText_en} onChange={(v) => updateHome("buttonText_en", v)} />
          <Field label="Button Text (Telugu)" value={homeForm.buttonText_te} onChange={(v) => updateHome("buttonText_te", v)} lang="te" />
          <Field label="Link" value={homeForm.link} onChange={(v) => updateHome("link", v)} placeholder="/bible-distribution" />
          <Field label="Display Order" type="number" value={homeForm.sortOrder} onChange={(v) => updateHome("sortOrder", v)} />
          <Field label="Icon / Short Label" value={homeForm.icon} onChange={(v) => updateHome("icon", v)} />
          <div className="admin-form-group">
            <label>Status</label>
            <select className="admin-select" value={homeForm.status} onChange={(e) => updateHome("status", e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Color</label>
            <input className="admin-input" type="color" value={homeForm.color || "#4B168C"} onChange={(e) => updateHome("color", e.target.value)} />
          </div>
          <div className="admin-form-group admin-form-group--full">
            <label>Card Image</label>
            <ImageUploader currentUrl={homeForm.imageURL} onUpload={uploadHomeImage} onUrlChange={(url) => updateHome("imageURL", url)} label="Upload Home Card Image" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button className="admin-btn admin-btn--primary" onClick={saveHomeSection} disabled={homeBusy}>{homeBusy ? "Saving..." : editingHomeId ? "Save Home Card" : "Add Home Card"}</button>
          {editingHomeId && <button className="admin-btn admin-btn--ghost" onClick={resetHomeForm}>Cancel Edit</button>}
        </div>

        <div className="admin-category-table" role="table" aria-label="Home page cards">
          <div className="admin-category-table__row admin-category-table__row--head" role="row">
            <span>Title</span><span>Link</span><span>Status</span><span>Actions</span>
          </div>
          {effectiveHomeSections.map((section) => (
            <div className="admin-category-table__row" role="row" key={section.id}>
              <span><b>{section.icon}</b>{section.title_en}<small>Order {section.sortOrder}</small></span>
              <span>{section.link || "#"}</span>
              <span>{section.status === "inactive" ? "Inactive" : "Active"}</span>
              <span>
                <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => editHomeSection(section)}>Edit</button>
                <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => disableOrDeleteHomeSection(section)}>{fallbackHomeIds.has(section.id) ? "Disable" : "Delete"}</button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className={`admin-btn admin-btn--primary ${saved ? "admin-btn--success" : ""}`} onClick={save}>{saved ? "Saved" : "Save Settings"}</button>
    </div>
  );
}

function Field({ label, value = "", onChange, lang, type = "text", placeholder = "" }) {
  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <input className="admin-input" type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} lang={lang} placeholder={placeholder} />
    </div>
  );
}
