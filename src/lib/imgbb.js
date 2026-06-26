const IMGBB_API_KEY = "d3807d2bf0af64066b89b9dd40b453f3";
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export const IMAGE_UPLOAD_TARGET_BYTES = 800 * 1024;

const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_UPLOAD_BYTES = 32 * 1024 * 1024;

function reportProgress(onProgress, stage, percent, message) {
  if (typeof onProgress === "function") {
    onProgress({ stage, percent, message });
  }
}

export async function uploadToImgBB(imageData, name = "", options = {}) {
  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);
  const uploadMeta = {};

  if (imageData instanceof File) {
    const optimized = await compressImageFile(imageData, {
      maxBytes: options.maxBytes || IMAGE_UPLOAD_TARGET_BYTES,
      onProgress: options.onProgress
    });
    const base64 = await fileToBase64(optimized);
    reportProgress(options.onProgress, "uploading", 88, "Uploading optimized image...");
    formData.append("image", base64.split(",")[1]);
    uploadMeta.originalSize = imageData.size;
    uploadMeta.optimizedSize = optimized.size;
    uploadMeta.optimizedType = optimized.type;
    uploadMeta.compressedSize = optimized.size;
    uploadMeta.compressedType = optimized.type;
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
  reportProgress(options.onProgress, "done", 100, "Upload complete.");

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
  if (!file) throw new Error("No image selected.");
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) throw new Error("Only JPG, JPEG, PNG, and WebP images are allowed.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image must be smaller than 32MB.");
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

function optimizedFileName(fileName, type) {
  const extension = type === "image/webp" ? ".webp" : type === "image/png" ? ".png" : ".jpg";
  return (fileName || "optimized-image").replace(/\.[^.]+$/, "") + extension;
}

function asUploadFile(blob, sourceFile) {
  return new File([blob], optimizedFileName(sourceFile.name, blob.type), {
    type: blob.type || "image/jpeg",
    lastModified: Date.now()
  });
}

function drawToCanvas(bitmap, maxDimension, preserveAlpha) {
  const longestSide = Math.max(bitmap.width, bitmap.height);
  const scale = Math.min(1, maxDimension / longestSide);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: preserveAlpha });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (!preserveAlpha) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas;
}

async function hasTransparentPixels(bitmap) {
  const sampleSize = 96;
  const longestSide = Math.max(bitmap.width, bitmap.height);
  const scale = Math.min(1, sampleSize / longestSide);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.drawImage(bitmap, 0, 0, width, height);
  const pixels = ctx.getImageData(0, 0, width, height).data;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 255) return true;
  }
  return false;
}

function normalizeOptimizeOptions(options) {
  if (typeof options === "number") return { maxBytes: options };
  return options || {};
}

export async function compressImageFile(file, options = {}) {
  const { maxBytes = IMAGE_UPLOAD_TARGET_BYTES, onProgress } = normalizeOptimizeOptions(options);
  if (!file || !file.type?.startsWith("image/")) return file;
  validateImageFile(file);
  if (file.size <= maxBytes) {
    reportProgress(onProgress, "done", 100, "Image is already optimized.");
    return file;
  }
  reportProgress(onProgress, "analyzing", 8, "Analyzing image...");

  const bitmap = await createImageBitmap(file);
  const sourceLongestSide = Math.max(bitmap.width, bitmap.height);
  const preserveAlpha = ["image/png", "image/webp"].includes(file.type) && await hasTransparentPixels(bitmap);
  
  // Adaptive dimension selection:
  // We preserve original dimensions unless the image is extremely large (> 2560px).
  const MAX_WEBSITE_IMAGE_DIMENSION = 2560;
  const startDimension = sourceLongestSide > MAX_WEBSITE_IMAGE_DIMENSION ? MAX_WEBSITE_IMAGE_DIMENSION : sourceLongestSide;
  
  const dimensions = [];
  dimensions.push(startDimension);
  
  // Add standard downsizing options if startDimension is larger
  const standardDims = [2400, 2000, 1600, 1200, 1000, 800, 640];
  for (const dim of standardDims) {
    if (dim < startDimension) {
      dimensions.push(dim);
    }
  }

  // Adaptive quality parameters to maintain sharp details near 800 KB target
  const qualities = [0.95, 0.90, 0.85, 0.80, 0.75, 0.70];
  const types = preserveAlpha ? ["image/webp", "image/png"] : ["image/webp", "image/jpeg"];
  
  let smallestBlob = null;
  let previousCanvasSize = "";
  let attempts = 0;
  const maxAttempts = dimensions.length * qualities.length * types.length;

  try {
    for (const dimension of dimensions) {
      const canvas = drawToCanvas(bitmap, dimension, preserveAlpha);
      const canvasSize = `${canvas.width}x${canvas.height}`;
      if (canvasSize === previousCanvasSize) continue;
      previousCanvasSize = canvasSize;

      for (const quality of qualities) {
        for (const type of types) {
          attempts += 1;
          reportProgress(
            onProgress,
            "compressing",
            Math.min(82, 12 + Math.round((attempts / maxAttempts) * 70)),
            "Optimizing image quality..."
          );
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

  if (smallestBlob) return asUploadFile(smallestBlob, file);
  throw new Error("Could not optimize this image. Please try a different photo.");
}

export async function reoptimizeImageUrl(url, name = "reoptimized-image", options = {}) {
  if (!url) throw new Error("No image URL provided.");
  reportProgress(options.onProgress, "downloading", 5, "Downloading existing image...");
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) throw new Error("Could not download the existing image for re-optimization.");
  const blob = await response.blob();
  const type = SUPPORTED_IMAGE_TYPES.includes(blob.type) ? blob.type : "image/jpeg";
  const extension = type === "image/webp" ? "webp" : type === "image/png" ? "png" : "jpg";
  const file = new File([blob], `${name}.${extension}`, { type });
  return uploadToImgBB(file, name, options);
}
