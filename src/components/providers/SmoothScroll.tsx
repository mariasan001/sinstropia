'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

type Props = { children: ReactNode };

/**
 * Smooth scroll (Lenis) synced to a single GSAP ticker loop
 * so ScrollTrigger stays in lockstep.
 */
export default function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    const lenis = lenisRef.current?.lenis;
    lenis?.on('scroll', onScroll);

    document.documentElement.classList.add('lenis');

    return () => {
      gsap.ticker.remove(update);
      lenis?.off('scroll', onScroll);
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
