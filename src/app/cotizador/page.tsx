import type { Metadata } from 'next';
import CotizadorClient from '@/components/Cotizador/CotizadorClient';
import JsonLd from '@/components/Seo/JsonLd';
import {
  COTIZADOR_DESCRIPTION,
  COTIZADOR_OG_TITLE,
  COTIZADOR_TITLE,
  SITE_NAME,
} from '@/config/seo';
import { organizationJsonLd, webPageJsonLd } from '@/config/schema';

export const metadata: Metadata = {
  title: COTIZADOR_TITLE,
  description: COTIZADOR_DESCRIPTION,
  alternates: {
    canonical: '/cotizador',
  },
  openGraph: {
    url: '/cotizador',
    title: COTIZADOR_OG_TITLE,
    description: COTIZADOR_DESCRIPTION,
  },
  twitter: {
    title: COTIZADOR_OG_TITLE,
    description: COTIZADOR_DESCRIPTION,
  },
};

export default function CotizadorPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            path: '/cotizador',
            name: `${COTIZADOR_OG_TITLE} | ${SITE_NAME}`,
            description: COTIZADOR_DESCRIPTION,
          }),
        ]}
      />
      <CotizadorClient />
    </>
  );
}
