// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { fontVars } from '@/config/fonts';
import CursorGate from '@/components/Cursor/CursorGate';

export const metadata: Metadata = {
  title: 'Sintropía — Sistemas, apps y páginas web',
  description:
    'Construimos lo que imaginas como si fuera nuestro. Desarrollo de sistemas, apps móviles y páginas web desde México.',
  icons: {
    icon: '/img/fav-icon.webp',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVars}>
      <body>
        <CursorGate />
        {children}
      </body>
    </html>
  );
}
