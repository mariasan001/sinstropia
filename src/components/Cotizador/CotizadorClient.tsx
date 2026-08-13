'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Cotizador from '@/components/Cotizador/Cotizador';

const Footer = dynamic(() => import('@/components/Footer/Footer'));

export default function CotizadorClient() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === '#') return;
    const id = decodeURIComponent(hash.slice(1));
    const run = () => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const t = window.setTimeout(run, 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <SmoothScroll>
      <Navbar />
      <Cotizador />
      <Footer />
    </SmoothScroll>
  );
}
