import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sintropía',
    short_name: 'Sintropía',
    description:
      'Agencia digital en México: desarrollo de sistemas, apps móviles y páginas web.',
    start_url: '/',
    display: 'standalone',
    background_color: '#17181C',
    theme_color: '#17181C',
    lang: 'es-MX',
    icons: [
      {
        src: '/img/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/img/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
