import type { Metadata } from 'next';
import HomeClient from '@/components/Home/HomeClient';
import JsonLd from '@/components/Seo/JsonLd';
import {
  DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/config/seo';
import { organizationJsonLd, webPageJsonLd, websiteJsonLd } from '@/config/schema';

export const metadata: Metadata = {
  title: {
    absolute: `${DEFAULT_TITLE} | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: SITE_URL,
    title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          webPageJsonLd({
            path: '/',
            name: `${DEFAULT_TITLE} | ${SITE_NAME}`,
            description: SITE_DESCRIPTION,
          }),
        ]}
      />
      <HomeClient />
    </>
  );
}
