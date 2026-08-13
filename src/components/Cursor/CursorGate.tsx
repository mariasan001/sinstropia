'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Cursor = dynamic(() => import('@/components/Cursor/Cursor'), { ssr: false });

export default function CursorGate() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && !reduce) setOn(true);
  }, []);

  if (!on) return null;
  return <Cursor />;
}
