import type { Metadata } from 'next';
import VenturesClient from '@/components/Ventures/VenturesClient';
import JsonLd from '@/components/Seo/JsonLd';
import {
  VENTURES_DESCRIPTION,
  VENTURES_OG_TITLE,
  VENTURES_TITLE,
} from '@/config/seo';
import { organizationJsonLd, venturesJsonLd } from '@/config/schema';

export const metadata: Metadata = {
  title: VENTURES_TITLE,
  description: VENTURES_DESCRIPTION,
  alternates: {
    canonical: '/ventures',
  },
  openGraph: {
    url: '/ventures',
    title: VENTURES_OG_TITLE,
    description: VENTURES_DESCRIPTION,
  },
  twitter: {
    title: VENTURES_OG_TITLE,
    description: VENTURES_DESCRIPTION,
  },
};

export default function VenturesPage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), venturesJsonLd()]} />
      <VenturesClient />
    </>
  );
}
