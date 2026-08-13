import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONES,
  SITE_SAME_AS,
  SITE_TAGLINE,
  SITE_URL,
  VENTURES_DESCRIPTION,
  VENTURES_OG_TITLE,
} from '@/config/seo';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo_1.webp`,
    image: `${SITE_URL}/img/logo_1.webp`,
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    telephone: SITE_PHONES[0],
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_PHONES[0],
        contactType: 'sales',
        availableLanguage: ['Spanish'],
        email: SITE_EMAIL,
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE_PHONES[1],
        contactType: 'customer service',
        availableLanguage: ['Spanish'],
      },
    ],
    knowsAbout: [
      'Desarrollo de software',
      'Aplicaciones móviles',
      'Páginas web',
      'Sistemas a la medida',
      'Producto digital',
    ],
    slogan: SITE_TAGLINE,
    ...(SITE_SAME_AS.length ? { sameAs: SITE_SAME_AS } : {}),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'es-MX',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function webPageJsonLd({
  path = '/',
  name,
  description,
}: {
  path?: string;
  name: string;
  description: string;
}) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'es-MX',
  };
}

export function venturesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: VENTURES_OG_TITLE,
    description: VENTURES_DESCRIPTION,
    url: `${SITE_URL}/ventures`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Offer',
      name: 'Sintropía Ventures',
      description: VENTURES_DESCRIPTION,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    inLanguage: 'es-MX',
  };
}
