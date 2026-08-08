export const MAX_IMAGE_SIZE = 1.5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

interface ImageFileData {
  name: string;
  size: number;
  type: string;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function storagePathFromUrl(url: string) {
  const marker =
    "/storage/v1/object/public/project-images/";

  if (!url.includes(marker)) {
    return null;
  }

  return decodeURIComponent(url.split(marker)[1]);
}

export function validateProjectImage(
  file: ImageFileData,
): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return `${file.name} não é uma imagem válida.`;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return `${file.name} ultrapassa o limite de 1,5 MB. Comprima a imagem antes de enviar.`;
  }

  return null;
}