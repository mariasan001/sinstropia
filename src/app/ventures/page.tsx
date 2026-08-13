'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Ventures from '@/components/Ventures/Ventures';

const Footer = dynamic(() => import('@/components/Footer/Footer'));

export default function VenturesPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <Ventures />
      <Footer />
    </SmoothScroll>
  );
}
