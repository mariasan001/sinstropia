'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar/Navbar';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollToHash, { peekReturnHash } from '@/components/providers/ScrollToHash';
import Preloader from '@/components/Preloader/Preloader';
import Hero from '@/components/Hero/Hero';
import Work from '@/components/Work/Work';
import Opinan from '@/components/Opinan/Opinan';
import Hacemos from '@/components/Hacemos/Hacemos';
import Productos from '@/components/Productos/Productos';
import Socios from '@/components/Socios/Socios';
import Somos from '@/components/Somos/Somos';
import Contacto from '@/components/Contacto/Contacto';
import Footer from '@/components/Footer/Footer';

const CotizarBubble = dynamic(() => import('@/components/CotizarBubble/CotizarBubble'), {
  ssr: false,
});

export default function HomeClient() {
  const [ready, setReady] = useState(false);
  const [bubble, setBubble] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  useLayoutEffect(() => {
    // Volver / back desde Ventures: sin preloader, directo a #socios.
    if (peekReturnHash()) setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId = 0;
    let timeoutId = 0;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(() => setBubble(true), { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(() => setBubble(true), 400);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      if (idleId && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [ready]);

  return (
    <>
      {!ready ? <Preloader onDone={onDone} /> : null}
      <div className={ready ? 'app-ready' : 'app-booting'} aria-busy={!ready}>
        <SmoothScroll>
          <ScrollToHash ready={ready} />
          <Navbar />
          <Hero ready={ready} />
          {/* Siempre en el DOM (SSR + crawlers). El preloader solo oculta; GSAP se recalcula al ready. */}
          <Work />
          <Opinan />
          <Hacemos />
          <Productos />
          <Socios />
          <Somos />
          <Contacto />
          <Footer />
        </SmoothScroll>
        {bubble ? <CotizarBubble /> : null}
      </div>
    </>
  );
}
