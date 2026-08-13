/**
 * SEO / site identity — Sintropía
 * Dominio canónico: https://sintropia.mx
 */

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://sintropia.mx').replace(/\/$/, '');

export const SITE_NAME = 'Sintropía';
export const SITE_TAGLINE = 'Construimos lo que imaginas como si fuera nuestro.';
export const SITE_DESCRIPTION =
  'Agencia digital en México: desarrollo de sistemas, apps móviles y páginas web. Nos involucramos desde el boceto hasta el producto en el aire.';
export const SITE_LOCALE = 'es_MX';
export const SITE_EMAIL = 'hola@sintropia.mx';
export const SITE_PHONES = ['+527226068056', '+527292324754'] as const;
export const SITE_SAME_AS = [] as string[];

export const DEFAULT_TITLE = 'Sistemas, apps y páginas web en México';
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

export const KEYWORDS = [
  'agencia digital México',
  'desarrollo de software México',
  'apps móviles',
  'páginas web',
  'sistemas a la medida',
  'Sintropía',
  'desarrollo web',
  'producto digital',
  'Sintropía Ventures',
] as const;

/** Short title for `title.template` (`%s | Sintropía`). */
export const VENTURES_TITLE = 'Ventures — Convocatoria de socios';
export const VENTURES_OG_TITLE = 'Sintropía Ventures — Convocatoria de socios';
export const VENTURES_DESCRIPTION =
  'Escuchamos tu idea. Apostamos por ella. Sintropía Ventures: desarrollo, diseño, estrategia y mentoría a cambio de equity. Cupos por temporada.';

export const NEURONA_TITLE = 'Neurona — Validador';
export const NEURONA_OG_TITLE = 'Neurona — Validador que se renta';
export const NEURONA_DESCRIPTION =
  'Neurona valida texto, video o audio con las reglas que tú defines. Demo de prueba, renta mensual e instalación en tu operación.';

export const COTIZADOR_TITLE = 'Cotizador — IA para tu negocio';
export const COTIZADOR_OG_TITLE = 'Cotizador — Cotiza con IA, a tu medida';
export const COTIZADOR_DESCRIPTION =
  'Cotizador con IA para cualquier giro: conversación con el cliente, formatos, sitio y seguimiento de cotizaciones. Planes e implementación a tu operación.';
