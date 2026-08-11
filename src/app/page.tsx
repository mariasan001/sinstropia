'use client';

import { useCallback, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SmoothScroll from '@/components/providers/SmoothScroll';
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

export default function Page() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      <div className={ready ? 'app-ready' : 'app-booting'} aria-busy={!ready}>
        <SmoothScroll>
          <Navbar />
          <Hero ready={ready} />
          <Work />
          <Opinan />
          <Hacemos />
          <Productos />
          <Socios />
          <Somos />
          <Contacto />
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
