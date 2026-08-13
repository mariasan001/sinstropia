/** Secciones del home: orden = página; label/href = menú, pie y anclas. */
export type NavItem = {
  label: string;
  href: string;
  tag?: string;
};

export const HOME_SECTIONS = {
  inicio: { id: 'inicio', label: 'Inicio' },
  desarrollo: { id: 'desarrollo', label: 'Desarrollo' },
  opinan: { id: 'opinan', label: 'Opinan' },
  hacemos: { id: 'hacemos', label: 'Hacemos' },
  productos: { id: 'productos', label: 'Productos' },
  socios: { id: 'socios', label: 'Socios' },
  somos: { id: 'somos', label: 'Somos' },
  contacto: { id: 'contacto', label: 'Contacto' },
  cotizar: { id: 'cotizar', label: 'Cotizar' },
} as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS]['id'];

export const MAIN_NAV: NavItem[] = [
  { label: HOME_SECTIONS.inicio.label, href: `#${HOME_SECTIONS.inicio.id}` },
  { label: HOME_SECTIONS.desarrollo.label, href: `#${HOME_SECTIONS.desarrollo.id}` },
  { label: HOME_SECTIONS.opinan.label, href: `#${HOME_SECTIONS.opinan.id}` },
  { label: HOME_SECTIONS.hacemos.label, href: `#${HOME_SECTIONS.hacemos.id}` },
  { label: HOME_SECTIONS.productos.label, href: `#${HOME_SECTIONS.productos.id}` },
  { label: HOME_SECTIONS.socios.label, href: `#${HOME_SECTIONS.socios.id}`, tag: 'Nuevo' },
  { label: HOME_SECTIONS.somos.label, href: `#${HOME_SECTIONS.somos.id}` },
  { label: HOME_SECTIONS.contacto.label, href: `#${HOME_SECTIONS.contacto.id}` },
];

export const FOOTER_NAV: NavItem[] = MAIN_NAV.map(({ label, href }) => ({ label, href }));
