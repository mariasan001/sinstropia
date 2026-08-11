// src/app/layout.tsx
import './globals.css';
import { fontVars } from '@/config/fonts';
import Cursor from '@/components/Cursor/Cursor';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" className={fontVars}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
