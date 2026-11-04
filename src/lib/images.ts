import type { ImageMetadata } from 'astro';
// All images under src/assets, looked up by folder/file name, e.g. img('students/Teja.jpeg')
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });
export function img(path: string): ImageMetadata | undefined {
  return files['/src/assets/' + path]?.default;
}
export function imgOr(path: string, fallback: string): ImageMetadata {
  return (img(path) || img(fallback))!;
}
