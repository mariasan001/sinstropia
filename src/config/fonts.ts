// src/config/fonts.ts
import { Caveat, Montserrat, Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['500'],
  display: 'swap',
});

export const fontVars = `${raleway.variable} ${montserrat.variable} ${caveat.variable}`;
