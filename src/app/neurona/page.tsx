import type { Metadata } from 'next';
import NeuronaClient from '@/components/Neurona/NeuronaClient';
import JsonLd from '@/components/Seo/JsonLd';
import {
  NEURONA_DESCRIPTION,
  NEURONA_OG_TITLE,
  NEURONA_TITLE,
  SITE_NAME,
} from '@/config/seo';
import { organizationJsonLd, webPageJsonLd } from '@/config/schema';

export const metadata: Metadata = {
  title: NEURONA_TITLE,
  description: NEURONA_DESCRIPTION,
  alternates: {
    canonical: '/neurona',
  },
  openGraph: {
    url: '/neurona',
    title: NEURONA_OG_TITLE,
    description: NEURONA_DESCRIPTION,
  },
  twitter: {
    title: NEURONA_OG_TITLE,
    description: NEURONA_DESCRIPTION,
  },
};

export default function NeuronaPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            path: '/neurona',
            name: `${NEURONA_OG_TITLE} | ${SITE_NAME}`,
            description: NEURONA_DESCRIPTION,
          }),
        ]}
      />
      <NeuronaClient />
    </>
  );
}
