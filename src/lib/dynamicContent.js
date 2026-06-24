export const FALLBACK_NAV_ITEMS = [
  { id: "home", labelKey: "nav_home", label_en: "Home", path: "/", status: "active", sortOrder: 10, icon: "H", bottomVisible: true },
  { id: "about", labelKey: "nav_about", label_en: "About Us", path: "/about", status: "active", sortOrder: 20, icon: "A", bottomVisible: true },
  { id: "ministries", labelKey: "nav_ministries", label_en: "Ministries", path: "/ministries", status: "active", sortOrder: 30, icon: "M", bottomVisible: false },
  { id: "tribal-outreach", labelKey: "nav_tribal", label_en: "Tribal Outreach", path: "/tribal-outreach", parentId: "ministries", status: "active", sortOrder: 31, icon: "T", bottomVisible: false },
  { id: "childrens-ministry", labelKey: "nav_children", label_en: "Children's Ministry", path: "/childrens-ministry", parentId: "ministries", status: "active", sortOrder: 32, icon: "C", bottomVisible: false },
  { id: "bible-distribution", label_en: "Bible Distribution", path: "/bible-distribution", status: "active", sortOrder: 40, icon: "B", bottomVisible: true },
  { id: "gallery", labelKey: "nav_gallery", label_en: "Gallery", path: "/gallery", status: "active", sortOrder: 50, icon: "G", bottomVisible: true },
  { id: "contact", labelKey: "nav_contact", label_en: "Contact", path: "/contact", status: "active", sortOrder: 60, icon: "C", bottomVisible: true }
];

export const FALLBACK_HOME_SECTIONS = [
  {
    id: "tribal-outreach",
    titleKey: "tribal_label",
    title_en: "Tribal Outreach",
    description_en: "Prayer, hope, and practical care for remote tribal villages.",
    buttonTextKey: "read_more",
    buttonText_en: "Read More",
    link: "/tribal-outreach",
    imageURL: "/calvarypremanrt.webp",
    status: "active",
    sortOrder: 10,
    icon: "T"
  },
  {
    id: "childrens-ministry",
    titleKey: "children_label",
    title_en: "Children's Ministry",
    description_en: "Nurturing children's hearts with God's word and faithful care.",
    buttonTextKey: "read_more",
    buttonText_en: "Read More",
    link: "/childrens-ministry",
    imageURL: "/children-ministry.webp",
    status: "active",
    sortOrder: 20,
    icon: "C"
  },
  {
    id: "bible-distribution",
    title_en: "Bible Distribution",
    subtitle_en: "Sharing God's Word",
    description_en: "Sharing God's Word and distributing Bibles to communities with love and compassion.",
    buttonTextKey: "read_more",
    buttonText_en: "Read More",
    link: "/bible-distribution",
    imageURL: "",
    status: "active",
    sortOrder: 30,
    icon: "B"
  }
];

export function slugifyRecordId(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function sortByDisplayOrder(items = []) {
  return [...items].sort((a, b) => {
    const order = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
    if (order !== 0) return order;
    return (a.label_en || a.title_en || a.id || "").localeCompare(b.label_en || b.title_en || b.id || "");
  });
}

export function normalizeNavItem(item = {}, index = 0) {
  const label = item.label_en || item.label || item.title_en || "Menu Item";
  const id = item.id || slugifyRecordId(label) || `nav-item-${index + 1}`;

  return {
    id,
    labelKey: item.labelKey || "",
    label_en: label,
    label_te: item.label_te || "",
    path: item.path || "",
    parentId: item.parentId || "",
    status: item.status === "inactive" ? "inactive" : "active",
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : index * 10,
    icon: item.icon || label.charAt(0).toUpperCase(),
    bottomVisible: item.bottomVisible !== false,
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null
  };
}

export function mergeNavigationItems(records = []) {
  const merged = new Map();
  FALLBACK_NAV_ITEMS.forEach((item, index) => {
    merged.set(item.id, { ...normalizeNavItem(item, index), isFallback: true });
  });
  records.forEach((record, index) => {
    const normalized = normalizeNavItem(record, index);
    merged.set(normalized.id, {
      ...(merged.get(normalized.id) || {}),
      ...normalized,
      isFallback: false
    });
  });
  return sortByDisplayOrder([...merged.values()]);
}

export function activeNavItems(items = []) {
  return sortByDisplayOrder(items).filter((item) => item.status !== "inactive");
}

export function buildNavTree(items = []) {
  const activeItems = activeNavItems(items);
  const byParent = new Map();
  activeItems.forEach((item) => {
    if (!item.parentId) return;
    byParent.set(item.parentId, [...(byParent.get(item.parentId) || []), item]);
  });

  return activeItems
    .filter((item) => !item.parentId)
    .map((item) => ({ ...item, dropdown: sortByDisplayOrder(byParent.get(item.id) || []) }));
}

export function normalizeHomeSection(item = {}, index = 0) {
  const title = item.title_en || item.title || item.label_en || "Home Section";
  const id = item.id || slugifyRecordId(title) || `home-section-${index + 1}`;

  return {
    id,
    titleKey: item.titleKey || "",
    title_en: title,
    title_te: item.title_te || "",
    subtitle_en: item.subtitle_en || "",
    subtitle_te: item.subtitle_te || "",
    description_en: item.description_en || item.description || "",
    description_te: item.description_te || "",
    buttonTextKey: item.buttonTextKey || "",
    buttonText_en: item.buttonText_en || item.buttonText || "Read More",
    buttonText_te: item.buttonText_te || "",
    link: item.link || item.path || "#",
    imageURL: item.imageURL || item.imageUrl || "",
    status: item.status === "inactive" ? "inactive" : "active",
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : index * 10,
    icon: item.icon || title.charAt(0).toUpperCase(),
    color: item.color || "#4B168C",
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null
  };
}

export function mergeHomeSections(records = []) {
  const merged = new Map();
  FALLBACK_HOME_SECTIONS.forEach((item, index) => {
    merged.set(item.id, { ...normalizeHomeSection(item, index), isFallback: true });
  });
  records.forEach((record, index) => {
    const normalized = normalizeHomeSection(record, index);
    merged.set(normalized.id, {
      ...(merged.get(normalized.id) || {}),
      ...normalized,
      isFallback: false
    });
  });
  return sortByDisplayOrder([...merged.values()]);
}

export function activeHomeSections(items = []) {
  return sortByDisplayOrder(items).filter((item) => item.status !== "inactive");
}

export function localizeDynamic(item = {}, field, language, ts) {
  const key = item[`${field}Key`];
  if (key && typeof ts === "function") return ts(key);
  return item[`${field}_${language}`] || item[`${field}_en`] || item[field] || "";
}
