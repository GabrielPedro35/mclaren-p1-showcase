export const TOTAL_FRAMES_1 = 191;
export const TOTAL_FRAMES_2 = 188;
export const FRAME_PIXELS_1 = 48;
export const FRAME_PIXELS_2 = 48;
export const FRAME_SCROLL_HEIGHT_1 = (TOTAL_FRAMES_1 - 1) * FRAME_PIXELS_1;
export const FRAME_SCROLL_HEIGHT_2 = (TOTAL_FRAMES_2 - 1) * FRAME_PIXELS_2;

export function getFrame1Src(index: number): string {
  return `/frames/frame_${String(index).padStart(4, "0")}.webp`;
}

export function getFrame2Src(index: number): string {
  return `/frames2/frame_${String(index).padStart(5, "0")}.webp`;
}

const cache1: HTMLImageElement[] = [];
const cache2: HTMLImageElement[] = [];
let clip1Promise: Promise<void> | null = null;
let clip2Promise: Promise<void> | null = null;

function cacheFor(clip: 1 | 2) {
  return clip === 1 ? cache1 : cache2;
}

function srcFor(clip: 1 | 2, oneBased: number) {
  return clip === 1 ? getFrame1Src(oneBased) : getFrame2Src(oneBased);
}

function totalFor(clip: 1 | 2) {
  return clip === 1 ? TOTAL_FRAMES_1 : TOTAL_FRAMES_2;
}

export function getCachedFrame(clip: 1 | 2, index: number): HTMLImageElement | null {
  const img = cacheFor(clip)[index];
  if (img && img.complete && img.naturalWidth > 0) return img;
  return null;
}

export function preloadFrames(
  clip: 1 | 2,
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const existing = clip === 1 ? clip1Promise : clip2Promise;
  if (existing) return existing;

  const total = totalFor(clip);
  const cache = cacheFor(clip);

  const promise = new Promise<void>((resolve) => {
    let loaded = 0;

    function bump() {
      loaded++;
      onProgress?.(loaded, total);
      if (loaded >= total) resolve();
    }

    for (let i = 0; i < total; i++) {
      const prev = cache[i];
      if (prev && prev.complete && prev.naturalWidth > 0) {
        bump();
        continue;
      }
      const img = prev ?? new window.Image();
      img.decoding = "async";
      img.src = srcFor(clip, i + 1);
      img.onload = bump;
      img.onerror = bump;
      cache[i] = img;
    }
  });

  if (clip === 1) clip1Promise = promise;
  else clip2Promise = promise;
  return promise;
}
