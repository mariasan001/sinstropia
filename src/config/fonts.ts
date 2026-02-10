// src/config/fonts.ts
import { Montserrat, Raleway } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const fontVars = `${raleway.variable} ${montserrat.variable}`;
