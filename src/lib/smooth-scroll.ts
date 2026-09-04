"use client";

const LERP = 0.12;
const WHEEL_SCALE = 0.85;
const STOP_EPSILON = 0.4;

let started = false;
let running = false;
let rafId = 0;
let currentY = 0;
let targetY = 0;

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function clamp(y: number) {
  return Math.max(0, Math.min(maxScroll(), y));
}

function tick() {
  const next = currentY + (targetY - currentY) * LERP;
  if (Math.abs(targetY - next) < STOP_EPSILON) {
    currentY = targetY;
    window.scrollTo(0, currentY);
    running = false;
    rafId = 0;
    return;
  }
  currentY = next;
  window.scrollTo(0, currentY);
  rafId = requestAnimationFrame(tick);
}

function startLoop() {
  if (running) return;
  running = true;
  rafId = requestAnimationFrame(tick);
}

function onWheel(event: WheelEvent) {
  if (prefersReducedMotion() || isCoarsePointer()) return;
  if (event.ctrlKey) return;
  const target = event.target as HTMLElement | null;
  if (target?.closest("input, textarea, select, [data-lenis-prevent]")) return;

  event.preventDefault();

  let delta = event.deltaY;
  if (event.deltaMode === 1) delta *= 16;
  else if (event.deltaMode === 2) delta *= window.innerHeight;

  currentY = window.scrollY;
  targetY = clamp(targetY + delta * WHEEL_SCALE);
  startLoop();
}

export function getScroller() {
  if (typeof window === "undefined" || started) return;
  started = true;
  currentY = window.scrollY;
  targetY = currentY;
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener(
    "scroll",
    () => {
      if (running) return;
      currentY = window.scrollY;
      targetY = currentY;
    },
    { passive: true }
  );
}

export function scrollToY(top: number, _duration = 1.4) {
  getScroller();
  currentY = window.scrollY;
  targetY = clamp(top);
  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    currentY = targetY;
    return;
  }
  startLoop();
}

export function scrollToId(id: string, offset = -120) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  scrollToY(top);
}

export function onScroll(handler: () => void): () => void {
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}

export function destroyScroller() {
  if (rafId) cancelAnimationFrame(rafId);
  running = false;
  started = false;
  window.removeEventListener("wheel", onWheel);
}
