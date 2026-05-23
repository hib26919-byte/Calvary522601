import { uploadToImgBB } from "../lib/imgbb";
export function useStorage() {
  return { upload: uploadToImgBB };
}
