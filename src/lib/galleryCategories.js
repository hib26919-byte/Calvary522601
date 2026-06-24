export function slugifyCategoryName(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function normalizeGalleryCategory(category = {}, index = 0) {
  const name = category.categoryName || category.name || category.label || "Untitled Category";
  const slug = category.slug || slugifyCategoryName(name) || `category-${index + 1}`;
  const id = category.id || slug;

  return {
    id,
    categoryName: name,
    slug,
    status: category.status === "inactive" ? "inactive" : "active",
    sortOrder: Number.isFinite(Number(category.sortOrder)) ? Number(category.sortOrder) : index * 10,
    color: category.color || "#6D28D9",
    icon: category.icon || "",
    createdAt: category.createdAt || null,
    updatedAt: category.updatedAt || null
  };
}

export function sortGalleryCategories(categories = []) {
  return [...categories].sort((a, b) => {
    const order = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
    if (order !== 0) return order;
    return (a.categoryName || "").localeCompare(b.categoryName || "");
  });
}

export function activeGalleryCategories(categories = []) {
  return sortGalleryCategories(categories).filter((category) => category.status !== "inactive");
}

export function galleryCategoryLabel(category) {
  return category?.categoryName || category?.name || category?.label || category?.slug || "Uncategorized";
}

export function imageMatchesCategory(image = {}, category = {}) {
  if (!category) return false;
  const candidates = new Set([category.id, category.slug, category.categoryName].filter(Boolean));
  return (
    candidates.has(image.categoryId) ||
    candidates.has(image.category) ||
    candidates.has(image.categoryName)
  );
}

export function findGalleryCategory(categories = [], value = "") {
  return categories.find((category) => (
    category.id === value ||
    category.slug === value ||
    category.categoryName === value
  ));
}
