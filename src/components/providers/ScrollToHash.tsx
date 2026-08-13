'use client';

import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

const RETURN_KEY = 'sintropia:return-hash';

export function rememberReturn(hash: string) {
  try {
    sessionStorage.setItem(RETURN_KEY, hash.startsWith('#') ? hash : `#${hash}`);
  } catch {
    /* ignore */
  }
}

export function peekReturnHash() {
  if (typeof window === 'undefined') return '';
  try {
    return sessionStorage.getItem(RETURN_KEY) || window.location.hash || '';
  } catch {
    return window.location.hash || '';
  }
}

/** After home is ready, scroll to hash / remembered section (e.g. #socios). */
export default function ScrollToHash({ ready = true }: { ready?: boolean }) {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready || pathname !== '/') return;

    let stored = '';
    try {
      stored = sessionStorage.getItem(RETURN_KEY) || '';
      if (stored) sessionStorage.removeItem(RETURN_KEY);
    } catch {
      /* ignore */
    }

    const hash = window.location.hash || stored;
    if (!hash || hash === '#') return;

    // Cotizar is a floating panel, not a scroll section.
    if (hash === '#cotizar') {
      window.dispatchEvent(new Event('open-cotizar'));
      return;
    }

    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) return;

    const run = () => {
      const el = document.getElementById(id);
      if (!el) return;

      if (lenis) {
        lenis.scrollTo(el, { offset: -12, immediate: true });
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({ top: y, left: 0, behavior: 'instant' });
      }

      if (window.location.hash !== hash) {
        history.replaceState(null, '', hash);
      }
    };

    const t = window.setTimeout(run, 40);
    return () => window.clearTimeout(t);
  }, [ready, pathname, lenis]);

  return null;
}
