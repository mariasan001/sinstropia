'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import s from './Cursor.module.scss';

const HOVER = 'a, button, [role="button"], label, summary, .cursor-hover';
const NATIVE = 'input, textarea, select, [contenteditable="true"]';
const TRAIL = 5;

export default function Cursor() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLSpanElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const dots = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduce) return;

    const rootEl = root.current;
    const coreEl = core.current;
    const blobEl = blob.current;
    if (!rootEl || !coreEl || !blobEl) return;

    document.documentElement.classList.add('has-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mid = { x: pos.x, y: pos.y };
    const trail = Array.from({ length: TRAIL }, () => ({ x: pos.x, y: pos.y }));
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        mid.x = pos.x;
        mid.y = pos.y;
        trail.forEach((p) => {
          p.x = pos.x;
          p.y = pos.y;
        });
        rootEl.classList.add(s.show);
      }

      const t = e.target;
      if (!(t instanceof Element)) return;
      const overNative = Boolean(t.closest(NATIVE));
      rootEl.classList.toggle(s.native, overNative);
      rootEl.classList.toggle(s.on, !overNative && Boolean(t.closest(HOVER)));
    };

    const onDown = () => rootEl.classList.add(s.down);
    const onUp = () => rootEl.classList.remove(s.down);
    const onLeave = () => {
      visible = false;
      rootEl.classList.remove(s.show);
    };

    const tick = () => {
      mid.x += (pos.x - mid.x) * 0.18;
      mid.y += (pos.y - mid.y) * 0.18;

      const dx = pos.x - mid.x;
      const dy = pos.y - mid.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const stretch = Math.min(dist / 22, 1.65);

      coreEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      blobEl.style.transform = `translate3d(${mid.x}px, ${mid.y}px, 0) rotate(${angle}rad) scale(${1 + stretch * 0.85}, ${1 - stretch * 0.28})`;

      let px = mid.x;
      let py = mid.y;
      trail.forEach((p, i) => {
        const ease = 0.22 - i * 0.025;
        p.x += (px - p.x) * ease;
        p.y += (py - p.y) * ease;
        const el = dots.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
          el.style.opacity = String(0.45 - i * 0.07);
        }
        px = p.x;
        py = p.y;
      });

      raf = requestAnimationFrame(tick);
    };

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
      {Array.from({ length: TRAIL }, (_, i) => (
        <span
          key={i}
          className={s.dot}
          ref={(el) => {
            if (el) dots.current[i] = el;
          }}
        />
      ))}
      <span ref={blob} className={s.blob} />
      <span ref={core} className={s.core} />
    </div>
  );
}
