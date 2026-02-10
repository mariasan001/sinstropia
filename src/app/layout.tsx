// src/app/layout.tsx
import './globals.css';
import { fontVars } from '@/config/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
