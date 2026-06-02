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
      name: pick(data, language, "founderName", "Founder"),
      role: pick(data, language, "founderRole", isTelugu ? "Founder" : "Founder"),
      title: pick(data, language, "founderTitle", "Ravi Children & Tribal Ministry"),
      years: pick(data, language, "founderYears", "2000-2020"),
      bio: pick(
        data,
        language,
        "founderBio",
        "Faithfully served children and tribal communities with prayer, compassion, and dedication."
      ),
      photoUrl: founderPhoto(data),
      galleryImages: normalizePortfolioImages(data?.founderImages, "Founder portfolio image")
    },
    {
      key: "kranthi",
      slug: "kranthi",
      portfolioPath: "/portfolio/kranthi",
      name: pick(data, language, "son1Name", "Anuparti Kranthi"),
      role: pick(data, language, "son1Role", "Tribal Outreach Leader"),
      title: pick(data, language, "son1Title", "Tribal Ministry Support"),
      years: pick(data, language, "son1Years", "Community Service"),
      bio: pick(
        data,
        language,
        "son1Bio",
        "Serving tribal families with prayer, guidance, compassionate care, and practical ministry support."
      ),
      photoUrl: imageUrl(data?.son1PhotoURL),
      galleryImages: normalizePortfolioImages(data?.son1Images, "Kranthi portfolio image")
    },
    {
      key: "prasanth",
      slug: "prasanth",
      portfolioPath: "/portfolio/prasanth",
      name: pick(data, language, "son2Name", "A. Prasanth"),
      role: pick(data, language, "son2Role", "Present Director"),
      title: pick(data, language, "son2Title", "Calvary Prema Ministries"),
      years: pick(data, language, "son2Years", "Graduate B.A"),
      bio: pick(
        data,
        language,
        "son2Bio",
        "Continuing his father's vision through church ministry, tribal outreach, children's ministry, and Bible training."
      ),
      photoUrl: imageUrl(data?.son2PhotoURL),
      galleryImages: normalizePortfolioImages(data?.son2Images, "Prasanth portfolio image")
    }
  ];
}

export function getPortfolioProfile(data = {}, language = "en", slug = "") {
  return buildLeaderProfiles(data, language).find((profile) => profile.slug === slug);
}
