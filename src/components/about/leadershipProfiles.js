function imageUrl(image) {
  if (!image) return "";
  if (typeof image === "string") return image.trim();
  return (
    image.url ||
    image.imageURL ||
    image.imageUrl ||
    image.src ||
    image.displayUrl ||
    image.thumbUrl ||
    image.thumbURL ||
    ""
  ).trim();
}

export function normalizePortfolioImages(images, fallbackAlt = "") {
  const list = Array.isArray(images) ? images : [];

  return list
    .map((image, index) => {
      const url = imageUrl(image);
      return {
        id: typeof image === "object" && image?.id ? image.id : `${url}-${index}`,
        url,
        alt:
          typeof image === "object"
            ? image.alt || image.alt_en || image.caption_en || fallbackAlt
            : fallbackAlt,
        order:
          typeof image === "object" && Number.isFinite(Number(image.order))
            ? Number(image.order)
            : index
      };
    })
    .filter((image) => image.url)
    .sort((a, b) => a.order - b.order);
}

function pick(data, language, field, fallback = "") {
  return data?.[`${field}_${language}`] || data?.[field] || fallback;
}

function founderPhoto(data) {
  const leaderPhoto = imageUrl(data?.leaderPhotoURL);
  const legacyFounderPhoto = imageUrl(data?.founderPhotoURL);
  const son2Photo = imageUrl(data?.son2PhotoURL);

  if (leaderPhoto && leaderPhoto !== son2Photo) return leaderPhoto;
  return legacyFounderPhoto;
}

export function buildLeaderProfiles(data = {}, language = "en") {
  const isTelugu = language === "te";

  return [
    {
      key: "founder",
      name: pick(data, language, "founderName", "Anuparti Ravi"),
      role: pick(data, language, "founderRole", isTelugu ? "FOUNDER" : "FOUNDER"),
      title: pick(data, language, "founderTitle", "Calvary Prema Ministries"),
      years: pick(data, language, "founderYears", "2008 – 2021"),
      bio: pick(
        data,
        language,
        "founderBio",
        "Faithfully served children and tribal communities through Calvary Prema Ministries with prayer, compassion, and dedication."
      ),
      photoUrl: founderPhoto(data),
      galleryImages: normalizePortfolioImages(data?.founderImages, "Founder portfolio image")
    },
    {
      key: "kranthi",
      slug: "kranthi",
      portfolioPath: "/portfolio/kranthi",
      name: pick(data, language, "son1Name", "Anuparti Kranthi"),
      role: pick(data, language, "son1Role", "DIRECTOR & CHAIRMAN"),
      title: pick(data, language, "son1Title", "Reaching Unreached Tribal Areas"),
      years: pick(data, language, "son1Years", "2018 – Present"),
      bio: pick(
        data,
        language,
        "son1Bio",
        "Serving unreached tribal areas with prayer, guidance, compassionate care, and practical ministry support."
      ),
      photoUrl: imageUrl(data?.son1PhotoURL),
      galleryImages: normalizePortfolioImages(data?.son1Images, "Kranthi portfolio image")
    },
    {
      key: "prasanth",
      slug: "prasanth",
      portfolioPath: "/portfolio/prasanth",
      name: pick(data, language, "son2Name", "Anuparti Prasanth"),
      role: pick(data, language, "son2Role", "VICE-CHAIRMAN"),
      title: pick(data, language, "son2Title", "Gospel Leader"),
      years: pick(data, language, "son2Years", "2018 – Present"),
      bio: pick(
        data,
        language,
        "son2Bio",
        "Continuing Gospel leadership through church ministry, tribal outreach, children's ministry, and Bible training."
      ),
      photoUrl: imageUrl(data?.son2PhotoURL),
      galleryImages: normalizePortfolioImages(data?.son2Images, "Prasanth portfolio image")
    }
  ];
}

export function getPortfolioProfile(data = {}, language = "en", slug = "") {
  return buildLeaderProfiles(data, language).find((profile) => profile.slug === slug);
}
