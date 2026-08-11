'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import s from './Cursor.module.scss';

const HOVER = 'a, button, [role="button"], label, summary, .cursor-hover';
const NATIVE = 'input, textarea, select, [contenteditable="true"]';

type Tone = 'light' | 'dark' | 'green' | 'purple';

function parseRgba(color: string) {
  const m = color.match(/rgba?\(([\d.\s,]+)\)/i);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(',').map((n) => Number(n.trim()));
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b, a };
}

function toneOf(rgb: { r: number; g: number; b: number }): Tone {
  const { r, g, b } = rgb;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (g > 170 && g > r + 20 && g > b + 20) return 'green';
  if (b > 140 && r > 80 && r < 180 && g < 140) return 'purple';
  if (lum < 0.28) return 'dark';
  return 'light';
}

function toneAt(x: number, y: number): Tone {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest(`.${s.root}`)) continue;
    const rgb = parseRgba(getComputedStyle(el).backgroundColor);
    if (!rgb || rgb.a < 0.2) continue;
    return toneOf(rgb);
  }
  return 'light';
}

export default function Cursor() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const orbit = useRef<HTMLSpanElement>(null);
  const ripple = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduce) return;

    const rootEl = root.current;
    const coreEl = core.current;
    const ringEl = ring.current;
    const orbitEl = orbit.current;
    const rippleEl = ripple.current;
    if (!rootEl || !coreEl || !ringEl || !orbitEl || !rippleEl) return;

    document.documentElement.classList.add('has-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mid = { x: pos.x, y: pos.y, vx: 0, vy: 0 };
    const magnet = { x: 0, y: 0, on: false };
    let host: Element | null = null;
    let visible = false;
    let hovering = false;
    let raf = 0;
    let sample = 0;
    let spin = 0;
    let tone: Tone = 'dark';

    const applyTone = (next: Tone) => {
      if (next === tone) return;
      tone = next;
      rootEl.dataset.tone = next;
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        mid.x = pos.x;
        mid.y = pos.y;
        rootEl.classList.add(s.show);
      }

      const t = e.target;
      if (!(t instanceof Element)) return;
      const overNative = Boolean(t.closest(NATIVE));
      host = overNative ? null : t.closest(HOVER);
      hovering = Boolean(host);
      magnet.on = hovering;
      rootEl.classList.toggle(s.native, overNative);
      rootEl.classList.toggle(s.on, hovering);
    };

    const onDown = () => {
      rootEl.classList.add(s.down);
      rippleEl.classList.remove(s.pop);
      void rippleEl.offsetWidth;
      rippleEl.classList.add(s.pop);
    };
    const onUp = () => rootEl.classList.remove(s.down);
    const onLeave = () => {
      visible = false;
      rootEl.classList.remove(s.show);
    };

    const tick = () => {
      if (magnet.on && host instanceof HTMLElement) {
        const box = host.getBoundingClientRect();
        magnet.x = box.left + box.width / 2;
        magnet.y = box.top + box.height / 2;
      }

      const aimX = magnet.on ? magnet.x * 0.38 + pos.x * 0.62 : pos.x;
      const aimY = magnet.on ? magnet.y * 0.38 + pos.y * 0.62 : pos.y;

      mid.vx += (aimX - mid.x) * 0.22;
      mid.vy += (aimY - mid.y) * 0.22;
      mid.vx *= 0.72;
      mid.vy *= 0.72;
      mid.x += mid.vx;
      mid.y += mid.vy;

      const dx = pos.x - mid.x;
      const dy = pos.y - mid.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const stretch = hovering ? 0 : Math.min(dist / 16, 1.9);
      const speed = Math.hypot(mid.vx, mid.vy);
      spin += 0.035 + speed * 0.01;

      coreEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ringEl.style.transform = `translate3d(${mid.x}px, ${mid.y}px, 0) rotate(${angle}rad) scale(${1 + stretch * 0.62}, ${1 - stretch * 0.24})`;
      orbitEl.style.transform = `translate3d(${mid.x}px, ${mid.y}px, 0) rotate(${spin}rad)`;
      rippleEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      sample += 1;
      if (sample % 4 === 0 && visible) applyTone(toneAt(pos.x, pos.y));

      raf = requestAnimationFrame(tick);
    };

    rootEl.dataset.tone = 'dark';
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={root} className={s.root} aria-hidden>
      <span ref={ripple} className={s.ripple} />
      <span ref={orbit} className={s.orbit} />
      <span ref={ring} className={s.ring} />
      <span ref={core} className={s.core} />
    </div>
  );
}
