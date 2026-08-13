'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar/Navbar';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollToHash, { peekReturnHash } from '@/components/providers/ScrollToHash';
import Preloader from '@/components/Preloader/Preloader';
import Hero from '@/components/Hero/Hero';

const Work = dynamic(() => import('@/components/Work/Work'));
const Opinan = dynamic(() => import('@/components/Opinan/Opinan'));
const Hacemos = dynamic(() => import('@/components/Hacemos/Hacemos'));
const Productos = dynamic(() => import('@/components/Productos/Productos'));
const Socios = dynamic(() => import('@/components/Socios/Socios'));
const Somos = dynamic(() => import('@/components/Somos/Somos'));
const Contacto = dynamic(() => import('@/components/Contacto/Contacto'));
const CotizarBubble = dynamic(() => import('@/components/CotizarBubble/CotizarBubble'));
const Footer = dynamic(() => import('@/components/Footer/Footer'));

export default function Page() {
  const [ready, setReady] = useState(false);
  const [rest, setRest] = useState(false);
  const [bubble, setBubble] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  useLayoutEffect(() => {
    // Volver / back desde Ventures: sin preloader, directo a #socios.
    if (peekReturnHash()) setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    setRest(true);
  }, [ready]);

  useEffect(() => {
    if (!rest) return;

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
  }, [rest]);

  return (
    <>
      {!ready ? <Preloader onDone={onDone} /> : null}
      <div className={ready ? 'app-ready' : 'app-booting'} aria-busy={!ready}>
        <SmoothScroll>
          <ScrollToHash ready={ready} />
          <Navbar />
          <Hero ready={ready} />
          {rest ? (
            <>
              <Work />
              <Opinan />
              <Hacemos />
              <Productos />
              <Socios />
              <Somos />
              <Contacto />
              <Footer />
            </>
          ) : null}
        </SmoothScroll>
        {bubble ? <CotizarBubble /> : null}
      </div>
    </>
  );
}
