import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { reoptimizeImageUrl, uploadToImgBB, validateImageFile } from "../../lib/imgbb";
import {
  activeGalleryCategories,
  findGalleryCategory,
  galleryCategoryLabel,
  imageMatchesCategory,
  normalizeGalleryCategory,
  slugifyCategoryName,
  sortGalleryCategories
} from "../../lib/galleryCategories";

const EMPTY_UPLOAD_META = { categoryId: "", caption_en: "", caption_te: "", about_en: "", about_te: "" };
const EMPTY_CATEGORY_FORM = { categoryName: "", status: "active", sortOrder: 50, color: "#6D28D9", icon: "" };

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [filter, setFilter] = useState("all");
  const [uploadMeta, setUploadMeta] = useState(EMPTY_UPLOAD_META);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY_FORM);
  const [categoryBusy, setCategoryBusy] = useState(false);
  const [reoptimizingId, setReoptimizingId] = useState(null);
  const [reoptimizeProgress, setReoptimizeProgress] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const activeCategories = useMemo(() => activeGalleryCategories(categories), [categories]);

  useEffect(() => {
    if (!activeCategories.length) return;
    setUploadMeta((prev) => {
      if (prev.categoryId && activeCategories.some((cat) => cat.id === prev.categoryId)) return prev;
      return { ...prev, categoryId: activeCategories[0].id };
    });
  }, [activeCategories]);

  async function fetchAll() {
    await Promise.all([fetchCategories(), fetchImages()]);
  }

  async function fetchCategories() {
    const snap = await getDocs(collection(db, "galleryCategories"));
    const nextCategories = snap.docs.map((categoryDoc, index) => normalizeGalleryCategory({ id: categoryDoc.id, ...categoryDoc.data() }, index));
    setCategories(sortGalleryCategories(nextCategories));
  }

  async function fetchImages() {
    const snap = await getDocs(collection(db, "gallery"));
    const nextImages = snap.docs.map((imageDoc) => ({ id: imageDoc.id, ...imageDoc.data() }));
    setImages(nextImages.sort((a, b) => {
      const order = Number(a.order || 0) - Number(b.order || 0);
      if (order !== 0) return order;
      return String(b.uploadedAt?.seconds || "").localeCompare(String(a.uploadedAt?.seconds || ""));
    }));
  }

  function getImageCategory(image) {
    return (
      findGalleryCategory(categories, image.categoryId) ||
      findGalleryCategory(categories, image.category) ||
      findGalleryCategory(categories, image.categoryName)
    );
  }

  function categoryImageCount(category) {
    return images.filter((image) => imageMatchesCategory(image, category)).length;
  }

  const filteredImages = useMemo(() => {
    if (filter === "all") return images;
    const selectedCategory = findGalleryCategory(categories, filter);
    if (!selectedCategory) return images.filter((img) => img.categoryId === filter || img.category === filter);
    return images.filter((img) => imageMatchesCategory(img, selectedCategory));
  }, [categories, filter, images]);

  const handleFileDrop = useCallback(async (files) => {
    const selectedCategory = findGalleryCategory(categories, uploadMeta.categoryId) || activeCategories[0];
    if (!selectedCategory) {
      alert("Please create an active gallery category before uploading images.");
      return;
    }

    const validFiles = Array.from(files || []).filter((file) => {
      try {
        validateImageFile(file);
        return true;
      } catch (err) {
        alert(`${file.name}: ${err.message}`);
        return false;
      }
    });
    if (!validFiles.length) return;

    setUploading(true);
    for (const [index, file] of validFiles.entries()) {
      try {
        setUploadProgress({ percent: 0, message: `Preparing ${file.name} (${index + 1}/${validFiles.length})` });
        const result = await uploadToImgBB(file, `gallery_${selectedCategory.slug}_${Date.now()}`, {
          onProgress: (progress) => setUploadProgress({
            ...progress,
            message: `${progress.message} ${file.name} (${index + 1}/${validFiles.length})`
          })
        });

        await addDoc(collection(db, "gallery"), {
          imageURL: result.url,
          thumbURL: result.thumbUrl,
          categoryId: selectedCategory.id,
          category: selectedCategory.slug,
          categoryName: selectedCategory.categoryName,
          caption_en: uploadMeta.caption_en,
          caption_te: uploadMeta.caption_te,
          about_en: uploadMeta.about_en,
          about_te: uploadMeta.about_te,
          originalSize: result.originalSize || null,
          optimizedSize: result.optimizedSize || result.compressedSize || null,
          optimizedType: result.optimizedType || result.compressedType || null,
          uploadedAt: serverTimestamp(),
          order: Date.now()
        });

        await addDoc(collection(db, "notifications"), {
          type: "gallery",
          title: "New gallery item added",
          message: `A new optimized image was uploaded to ${galleryCategoryLabel(selectedCategory)}.`,
          read: false,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        alert(`Upload failed for ${file.name}: ${err.message}`);
      }
    }
    setUploading(false);
    setUploadProgress(null);
    fetchImages();
  }, [activeCategories, categories, uploadMeta]);

  async function deleteImage(id) {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    await deleteDoc(doc(db, "gallery", id));
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function beginEditImage(image) {
    const selectedCategory = getImageCategory(image) || activeCategories[0];
    setEditingId(image.id);
    setEditData({
      caption_en: image.caption_en || "",
      caption_te: image.caption_te || "",
      about_en: image.about_en || "",
      about_te: image.about_te || "",
      categoryId: selectedCategory?.id || ""
    });
  }

  async function saveEdit(id) {
    const selectedCategory = findGalleryCategory(categories, editData.categoryId);
    const nextData = {
      caption_en: editData.caption_en || "",
      caption_te: editData.caption_te || "",
      about_en: editData.about_en || "",
      about_te: editData.about_te || "",
      updatedAt: serverTimestamp()
    };

    if (selectedCategory) {
      nextData.categoryId = selectedCategory.id;
      nextData.category = selectedCategory.slug;
      nextData.categoryName = selectedCategory.categoryName;
    }

    await updateDoc(doc(db, "gallery", id), nextData);
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, ...nextData } : img));
    setEditingId(null);
    setEditData({});
  }

  async function reoptimizeImage(image) {
    const url = image.imageURL || image.thumbURL || image.thumbUrl;
    if (!url) return;

    setReoptimizingId(image.id);
    setReoptimizeProgress({ percent: 0, message: "Preparing image..." });
    try {
      const result = await reoptimizeImageUrl(url, `gallery_${image.id}`, { onProgress: setReoptimizeProgress });
      const nextData = {
        imageURL: result.url,
        thumbURL: result.thumbUrl,
        originalSize: result.originalSize || image.originalSize || null,
        optimizedSize: result.optimizedSize || result.compressedSize || null,
        optimizedType: result.optimizedType || result.compressedType || null,
        optimizedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await updateDoc(doc(db, "gallery", image.id), nextData);
      setImages((prev) => prev.map((img) => img.id === image.id ? { ...img, ...nextData } : img));
    } catch (err) {
      alert(`${err.message} If the image host blocks downloads, upload the original file again.`);
    } finally {
      setReoptimizingId(null);
      setReoptimizeProgress(null);
    }
  }

  function resetCategoryForm() {
    setEditingCategoryId(null);
    setCategoryForm(EMPTY_CATEGORY_FORM);
  }

  function editCategory(category) {
    setEditingCategoryId(category.id);
    setCategoryForm({
      categoryName: category.categoryName,
      status: category.status,
      sortOrder: category.sortOrder,
      color: category.color || "#6D28D9",
      icon: category.icon || ""
    });
  }

  async function saveCategory() {
    const name = categoryForm.categoryName.trim();
    if (!name) return alert("Please enter a category name.");

    setCategoryBusy(true);
    try {
      if (editingCategoryId) {
        const existing = findGalleryCategory(categories, editingCategoryId);
        await updateDoc(doc(db, "galleryCategories", editingCategoryId), {
          categoryName: name,
          slug: existing?.slug || slugifyCategoryName(name),
          status: categoryForm.status,
          sortOrder: Number(categoryForm.sortOrder) || 0,
          color: categoryForm.color || "#6D28D9",
          icon: categoryForm.icon || "",
          updatedAt: serverTimestamp()
        });
      } else {
        const slug = slugifyCategoryName(name);
        if (!slug) return alert("Please use letters or numbers in the category name.");
        if (categories.some((category) => category.id === slug || category.slug === slug)) {
          return alert("A category with this name already exists.");
        }
        await setDoc(doc(db, "galleryCategories", slug), {
          id: slug,
          categoryName: name,
          slug,
          status: categoryForm.status,
          sortOrder: Number(categoryForm.sortOrder) || 0,
          color: categoryForm.color || "#6D28D9",
          icon: categoryForm.icon || "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      resetCategoryForm();
      await fetchCategories();
    } finally {
      setCategoryBusy(false);
    }
  }

  async function commitGalleryImageBatch(matchingImages, applyOperation) {
    let batch = writeBatch(db);
    let count = 0;

    for (const image of matchingImages) {
      applyOperation(batch, doc(db, "gallery", image.id), image);
      count += 1;
      if (count >= 450) {
        await batch.commit();
        batch = writeBatch(db);
        count = 0;
      }
    }

    if (count > 0) await batch.commit();
  }

  async function deleteCategory(category) {
    const matchingImages = images.filter((image) => imageMatchesCategory(image, category));

    if (matchingImages.length === 0) {
      if (!window.confirm(`Delete "${category.categoryName}"?`)) return;
      await deleteDoc(doc(db, "galleryCategories", category.id));
      await fetchCategories();
      return;
    }

    const action = window.prompt(
      `"${category.categoryName}" has ${matchingImages.length} image(s).\n\nType MOVE to move images to another category.\nType DELETE to delete the images together with this category.\nType CANCEL to stop.`
    );
    if (!action || action.toUpperCase() === "CANCEL") return;

    if (action.toUpperCase() === "MOVE") {
      const targets = categories.filter((target) => target.id !== category.id);
      if (!targets.length) return alert("Create another category before moving images.");
      const targetList = targets.map((target) => `${target.id} = ${target.categoryName}`).join("\n");
      const targetId = window.prompt(`Move images to which category id?\n\n${targetList}`);
      const targetCategory = findGalleryCategory(targets, targetId);
      if (!targetCategory) return alert("No matching target category found.");

      await commitGalleryImageBatch(matchingImages, (batch, imageRef) => {
        batch.update(imageRef, {
          categoryId: targetCategory.id,
          category: targetCategory.slug,
          categoryName: targetCategory.categoryName,
          updatedAt: serverTimestamp()
        });
      });
    } else if (action.toUpperCase() === "DELETE") {
      if (!window.confirm(`Delete ${matchingImages.length} image(s) and the "${category.categoryName}" category?`)) return;
      await commitGalleryImageBatch(matchingImages, (batch, imageRef) => {
        batch.delete(imageRef);
      });
    } else {
      return alert("Category delete cancelled. Type MOVE or DELETE exactly.");
    }

    await deleteDoc(doc(db, "galleryCategories", category.id));
    setFilter("all");
    await fetchAll();
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2>Gallery Manager</h2>
        <p>Upload optimized ministry photos, manage dynamic categories, and keep gallery filters in sync with the public website.</p>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Gallery Categories</h3>
        <div className="admin-form-grid">
          <div className="admin-form-group"><label>Category Name</label><input className="admin-input" value={categoryForm.categoryName} onChange={(e) => setCategoryForm((p) => ({ ...p, categoryName: e.target.value }))} placeholder="Youth Meetings" /></div>
          <div className="admin-form-group"><label>Status</label><select className="admin-select" value={categoryForm.status} onChange={(e) => setCategoryForm((p) => ({ ...p, status: e.target.value }))}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
          <div className="admin-form-group"><label>Display Order</label><input className="admin-input" type="number" value={categoryForm.sortOrder} onChange={(e) => setCategoryForm((p) => ({ ...p, sortOrder: e.target.value }))} /></div>
          <div className="admin-form-group"><label>Color</label><input className="admin-input" type="color" value={categoryForm.color} onChange={(e) => setCategoryForm((p) => ({ ...p, color: e.target.value }))} /></div>
          <div className="admin-form-group"><label>Optional Icon</label><input className="admin-input" value={categoryForm.icon} onChange={(e) => setCategoryForm((p) => ({ ...p, icon: e.target.value }))} placeholder="Optional short icon/text" /></div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <button className="admin-btn admin-btn--primary" onClick={saveCategory} disabled={categoryBusy}>{categoryBusy ? "Saving..." : editingCategoryId ? "Save Category" : "Add New Category"}</button>
          {editingCategoryId && <button className="admin-btn admin-btn--ghost" onClick={resetCategoryForm}>Cancel Edit</button>}
        </div>

        <div className="admin-category-table" role="table" aria-label="Gallery categories">
          <div className="admin-category-table__row admin-category-table__row--head" role="row">
            <span>Category Name</span><span>Images Count</span><span>Status</span><span>Actions</span>
          </div>
          {categories.map((category) => (
            <div className="admin-category-table__row" role="row" key={category.id}>
              <span><i style={{ background: category.color }} />{category.icon && <b>{category.icon}</b>}{category.categoryName}<small>{category.slug}</small></span>
              <span>{categoryImageCount(category)}</span>
              <span>{category.status === "inactive" ? "Inactive" : "Active"}</span>
              <span>
                <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => editCategory(category)}>Edit</button>
                <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteCategory(category)}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Upload to Gallery Section</h3>
        {activeCategories.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", margin: "12px 0" }}>
            Add at least one active Gallery Category before uploading images.
          </p>
        ) : (
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Category</label>
              <select className="admin-select" value={uploadMeta.categoryId} onChange={(e) => setUploadMeta((p) => ({ ...p, categoryId: e.target.value }))}>
                {activeCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.categoryName}</option>)}
              </select>
            </div>
          <div className="admin-form-group"><label>Caption English</label><input className="admin-input" value={uploadMeta.caption_en} onChange={(e) => setUploadMeta((p) => ({ ...p, caption_en: e.target.value }))} /></div>
          <div className="admin-form-group"><label>Caption Telugu</label><input className="admin-input" lang="te" value={uploadMeta.caption_te} onChange={(e) => setUploadMeta((p) => ({ ...p, caption_te: e.target.value }))} /></div>
          <div className="admin-form-group admin-form-group--full"><label>About Image English</label><textarea className="admin-textarea" rows={3} value={uploadMeta.about_en} onChange={(e) => setUploadMeta((p) => ({ ...p, about_en: e.target.value }))} /></div>
          <div className="admin-form-group admin-form-group--full"><label>About Image Telugu</label><textarea className="admin-textarea" rows={3} lang="te" value={uploadMeta.about_te} onChange={(e) => setUploadMeta((p) => ({ ...p, about_te: e.target.value }))} /></div>
          </div>
        )}
        <p style={{ color: "var(--color-text-muted)", margin: "12px 0" }}>Images are automatically optimized near 300 KB, converted to WebP when beneficial, and uploaded as optimized files.</p>
      </div>

      <div className="admin-upload-zone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFileDrop(e.dataTransfer.files); }} onClick={() => activeCategories.length && document.getElementById("gallery-file-input").click()} aria-disabled={activeCategories.length === 0}>
        <input id="gallery-file-input" type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={(e) => handleFileDrop(e.target.files)} />
        <strong>{uploading ? uploadProgress?.message || "Optimizing images..." : activeCategories.length ? `Upload to ${galleryCategoryLabel(findGalleryCategory(categories, uploadMeta.categoryId) || activeCategories[0])}` : "Gallery categories required"}</strong>
        <span>{activeCategories.length ? "Drag and drop or click to browse" : "Create an active category first"}</span>
        {uploadProgress && <progress value={uploadProgress.percent || 0} max="100" style={{ width: "min(320px, 100%)" }} />}
      </div>

      <div className="admin-tabs" style={{ marginTop: 18 }}>
        <button className={`admin-filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All ({images.length})</button>
        {categories.map((cat) => <button key={cat.id} className={`admin-filter-btn ${filter === cat.id ? "active" : ""}`} onClick={() => setFilter(cat.id)}>{cat.categoryName} ({categoryImageCount(cat)})</button>)}
      </div>

      <div className="admin-gallery-grid">
        {filteredImages.map((img) => {
          const selectedCategory = getImageCategory(img);
          return (
            <div key={img.id} className="admin-gallery-item">
              <img src={img.thumbURL || img.thumbUrl || img.imageURL} alt={img.caption_en || "Gallery"} loading="lazy" />
              <div className="admin-gallery-item__body">
                <strong>{galleryCategoryLabel(selectedCategory) || img.categoryName || img.category || "Uncategorized"}</strong>
                <p>{img.caption_en || "No caption"}</p>
                {(img.optimizedSize || img.compressedSize) && <small>{Math.round((img.optimizedSize || img.compressedSize) / 1024)} KB optimized</small>}
                {reoptimizingId === img.id && <small>{reoptimizeProgress?.message || "Optimizing..."} ({reoptimizeProgress?.percent || 0}%)</small>}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => beginEditImage(img)}>Edit</button>
                  <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => reoptimizeImage(img)} disabled={reoptimizingId === img.id}>Re-optimize</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteImage(img.id)}>Delete</button>
                  <a className="admin-btn admin-btn--sm admin-btn--ghost" href={img.imageURL} target="_blank" rel="noopener noreferrer">View</a>
                </div>
                {editingId === img.id && (
                  <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                    <input className="admin-input" value={editData.caption_en || ""} onChange={(e) => setEditData((p) => ({ ...p, caption_en: e.target.value }))} placeholder="Caption English" />
                    <input className="admin-input" value={editData.caption_te || ""} onChange={(e) => setEditData((p) => ({ ...p, caption_te: e.target.value }))} placeholder="Caption Telugu" lang="te" />
                    <textarea className="admin-textarea" rows={3} value={editData.about_en || ""} onChange={(e) => setEditData((p) => ({ ...p, about_en: e.target.value }))} placeholder="About this image (English)" />
                    <textarea className="admin-textarea" rows={3} value={editData.about_te || ""} onChange={(e) => setEditData((p) => ({ ...p, about_te: e.target.value }))} placeholder="About this image (Telugu)" lang="te" />
                    <select className="admin-select" value={editData.categoryId || ""} onChange={(e) => setEditData((p) => ({ ...p, categoryId: e.target.value }))}>{categories.map((category) => <option key={category.id} value={category.id}>{category.categoryName}</option>)}</select>
                    <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={() => saveEdit(img.id)}>Save</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
