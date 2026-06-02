const IMGBB_API_KEY = "d3807d2bf0af64066b89b9dd40b453f3";
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";
export const IMAGE_UPLOAD_TARGET_BYTES = 70 * 1024;

export async function uploadToImgBB(imageData, name = "", options = {}) {
  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);
  const uploadMeta = {};

  if (imageData instanceof File) {
    const compressed = await compressImageFile(imageData, options.maxBytes || IMAGE_UPLOAD_TARGET_BYTES);
    const base64 = await fileToBase64(compressed);
    formData.append("image", base64.split(",")[1]);
    uploadMeta.originalSize = imageData.size;
    uploadMeta.compressedSize = compressed.size;
    uploadMeta.compressedType = compressed.type;
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
    height: data.data.height,
    ...uploadMeta
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

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(null);
      if (type === "image/webp" && blob.type !== "image/webp") return resolve(null);
      resolve(blob);
    }, type, quality);
  });
}

function compressedFileName(fileName, type) {
  const extension = type === "image/webp" ? ".webp" : ".jpg";
  return (fileName || "compressed-image").replace(/\.[^.]+$/, "") + extension;
}

function asUploadFile(blob, sourceFile) {
  return new File([blob], compressedFileName(sourceFile.name, blob.type), {
    type: blob.type || "image/jpeg",
    lastModified: Date.now()
  });
}

function drawToCanvas(bitmap, maxDimension) {
  const longestSide = Math.max(bitmap.width, bitmap.height);
  const scale = Math.min(1, maxDimension / longestSide);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas;
}

export async function compressImageFile(file, maxBytes = IMAGE_UPLOAD_TARGET_BYTES) {
  if (!file || !file.type?.startsWith("image/")) return file;
  if (file.size <= maxBytes && (file.type === "image/jpeg" || file.type === "image/webp")) return file;
  if (file.type === "image/svg+xml") {
    if (file.size <= maxBytes) return file;
    throw new Error("SVG images cannot be compressed to 70 KB automatically. Please upload a JPG, PNG, WebP, BMP, or GIF image.");
  }

  const bitmap = await createImageBitmap(file);
  const dimensions = [1600, 1400, 1200, 1000, 840, 720, 600, 500, 420, 340, 280, 220, 180, 140, 110, 88];
  const qualities = [0.86, 0.8, 0.74, 0.68, 0.62, 0.56, 0.5, 0.44, 0.38, 0.32, 0.26, 0.2];
  const types = ["image/webp", "image/jpeg"];
  let smallestBlob = null;
  let previousCanvasSize = "";

  try {
    for (const dimension of dimensions) {
      const canvas = drawToCanvas(bitmap, dimension);
      const canvasSize = `${canvas.width}x${canvas.height}`;
      if (canvasSize === previousCanvasSize) continue;
      previousCanvasSize = canvasSize;

      for (const quality of qualities) {
        for (const type of types) {
          const blob = await canvasToBlob(canvas, type, quality);
          if (!blob) continue;
          if (!smallestBlob || blob.size < smallestBlob.size) smallestBlob = blob;
          if (blob.size <= maxBytes) return asUploadFile(blob, file);
        }
      }
    }
  } finally {
    bitmap.close?.();
  }

  if (smallestBlob && smallestBlob.size <= maxBytes) return asUploadFile(smallestBlob, file);
  throw new Error("Could not compress this image. Please try a different photo.");
}
