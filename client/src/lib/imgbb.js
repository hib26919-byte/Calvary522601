const IMGBB_API_KEY = "d3807d2bf0af64066b89b9dd40b453f3";
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export async function uploadToImgBB(imageData, name = "") {
  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);

  if (imageData instanceof File) {
    const compressed = await compressImageFile(imageData);
    const base64 = await fileToBase64(compressed);
    formData.append("image", base64.split(",")[1]);
  } else if (typeof imageData === "string" && imageData.startsWith("data:")) {
    formData.append("image", imageData.split(",")[1]);
  } else {
    formData.append("image", imageData);
  }

  if (name) formData.append("name", name);

  const response = await fetch(IMGBB_UPLOAD_URL, { method: "POST", body: formData });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`ImgBB upload failed: ${err?.error?.message || response.statusText}`);
  }
  const data = await response.json();
  if (!data.success) throw new Error(`ImgBB error: ${data?.error?.message || "Unknown error"}`);

  return {
    url: data.data.url,
    displayUrl: data.data.display_url,
    thumbUrl: data.data.thumb?.url || data.data.url,
    deleteUrl: data.data.delete_url,
    width: data.data.width,
    height: data.data.height
  };
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function validateImageFile(file) {
  const maxSize = 32 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/svg+xml"];
  if (!file) throw new Error("No image selected.");
  if (!allowedTypes.includes(file.type)) throw new Error("Only JPEG, PNG, GIF, WebP, BMP, and SVG images are allowed.");
  if (file.size > maxSize) throw new Error("Image must be smaller than 32MB.");
  return true;
}

export async function compressImageFile(file, maxBytes = 500 * 1024) {
  if (!file || !file.type?.startsWith("image/")) return file;
  if (file.type === "image/gif" || file.type === "image/svg+xml") return file;

  const bitmap = await createImageBitmap(file);
  let maxDimension = 1800;
  let quality = 0.9;
  let blob = file;

  for (let attempt = 0; attempt < 10; attempt++) {
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);
    blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));

    if (blob.size <= maxBytes || (quality <= 0.62 && maxDimension <= 1200)) break;
    if (quality > 0.68) quality -= 0.07;
    else maxDimension -= 160;
  }

  return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
}
