import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MOTION = {
  y: 28,
  duration: 0.72,
  stagger: 0.14,
  word: 0.04,
  ease: 'power3.out',
  outDur: 0.36,
  outEase: 'power3.in',
  start: 'top 72%',
  end: 'bottom 20%',
} as const;

function list(targets: gsap.TweenTarget): Element[] {
  const raw = gsap.utils.toArray(targets) as Element[];
  const out: Element[] = [];
  raw.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    if (/^H[1-4]$/.test(el.tagName)) {
      if (el.dataset.nosplit === '1') {
        out.push(el);
        return;
      }
      if (el.querySelector('[data-word]')) {
        out.push(...Array.from(el.querySelectorAll('[data-word]')));
        return;
      }
      if (el.querySelector('a, button, svg, [class*="char"]')) {
        out.push(el);
        return;
      }
      splitHeading(el);
      out.push(...Array.from(el.querySelectorAll('[data-word]')));
      return;
    }
    out.push(el);
  });
  return out;
}

function splitHeading(h: HTMLElement) {
  if (h.dataset.split === '1') return;

  // <br> does not appear in textContent — collect lines from nodes.
  const lines: string[] = [];
  let buf = '';
  const flush = () => {
    const t = buf.replace(/\s+/g, ' ').trim();
    if (t) lines.push(t);
    buf = '';
  };

  h.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      buf += node.textContent || '';
      return;
    }
    if (node instanceof HTMLElement) {
      if (node.tagName === 'BR') {
        flush();
        return;
      }
      buf += node.textContent || '';
    }
  });
  flush();

  if (!lines.length) {
    const fallback = (h.textContent || '').replace(/\s+/g, ' ').trim();
    if (fallback) lines.push(fallback);
  }

  h.textContent = '';
  h.dataset.split = '1';
  lines.forEach((line) => {
    const row = document.createElement('span');
    row.dataset.line = '1';
    row.style.display = 'block';
    row.style.overflow = 'hidden';
    // Horizontal pad so negative letter-spacing doesn't clip the first glyph.
    row.style.padding = '0.05em 0.12em';
    row.style.margin = '0 -0.12em';
    line.split(/\s+/).forEach((word, i) => {
      const w = document.createElement('span');
      w.dataset.word = '1';
      w.textContent = word;
      w.style.display = 'inline-block';
      w.style.whiteSpace = 'nowrap';
      if (i) w.style.marginLeft = '0.28em';
      row.appendChild(w);
    });
    h.appendChild(row);
  });
}

function isWord(el: Element) {
  return el instanceof HTMLElement && el.dataset.word === '1';
}

export function hide(targets: gsap.TweenTarget) {
  const items = list(targets);
  items.forEach((el) => {
    if (isWord(el)) gsap.set(el, { yPercent: 120, autoAlpha: 1 });
    else gsap.set(el, { y: MOTION.y, autoAlpha: 0 });
  });
}

export function playIn(targets: gsap.TweenTarget) {
  const items = list(targets);
  const tl = gsap.timeline({ overwrite: 'auto' });
  let at = 0;
  items.forEach((el, i) => {
    const word = isWord(el);
    const prevWord = i > 0 && isWord(items[i - 1]);
    if (i > 0) at += word && prevWord ? MOTION.word : MOTION.stagger;
    if (word) {
      tl.to(el, { yPercent: 0, duration: 0.68, ease: MOTION.ease }, at);
    } else {
      tl.to(el, { y: 0, autoAlpha: 1, duration: MOTION.duration, ease: MOTION.ease }, at);
    }
  });
  return tl;
}

export function playOut(targets: gsap.TweenTarget, dir: 'up' | 'down') {
  const items = list(targets);
  const tl = gsap.timeline({ overwrite: 'auto' });
  const seq = dir === 'up' ? [...items].reverse() : items;
  let at = 0;
  seq.forEach((el, i) => {
    const word = isWord(el);
    const prevWord = i > 0 && isWord(seq[i - 1]);
    if (i > 0) at += word && prevWord ? 0.02 : 0.06;
    if (word) {
      tl.to(el, { yPercent: dir === 'up' ? -120 : 120, duration: MOTION.outDur, ease: MOTION.outEase }, at);
    } else {
      tl.to(
        el,
        { y: dir === 'up' ? -18 : MOTION.y, autoAlpha: 0, duration: MOTION.outDur, ease: MOTION.outEase },
        at,
      );
    }
  });
  return tl;
}

export function bindReveal(
  trigger: Element,
  targets: gsap.TweenTarget,
  opts?: { start?: string; end?: string },
) {
  hide(targets);
  return ScrollTrigger.create({
    trigger,
    start: opts?.start ?? MOTION.start,
    end: opts?.end ?? MOTION.end,
    onEnter: () => playIn(targets),
    onLeave: () => playOut(targets, 'up'),
    onEnterBack: () => playIn(targets),
    onLeaveBack: () => playOut(targets, 'down'),
  });
}
