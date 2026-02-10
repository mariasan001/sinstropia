'use client';

import { useMemo, useState } from 'react';
import s from './FeaturesSwitch.module.scss';

type Logo = {
  src: string;
  alt: string;
  w?: number;
  h?: number;
};

type FeatureCard = {
  title: string;
  desc: string;
  meta?: string;
};

type TabTone = 'light' | 'dark';

type BrandPreset = {
  id: string;
  logo: Logo;

  /** ✅ si el logo es blanco, pon 'dark' para que se vea */
  tabTone?: TabTone;

  headline: string;
  subhead: string;
  cards: FeatureCard[];
};

const PRESETS: BrandPreset[] = [
{
  id: 'DaBook',
  logo: { src: '/img/logo-blanco.png', alt: 'DaBook', w: 120, h: 28 },
  tabTone: 'dark',

  headline: 'DaBook — una sesión real para explorar lo que construimos',
  subhead:
    'Entra al MVP y recorre el flujo completo: diseño, estructura, módulos y experiencia. De lienzo en blanco a plataforma viva, lista para crecer.',

  cards: [
    { title: 'Módulos listos', desc: 'Blog, cursos, tienda y licencias con un camino claro para escalar.', meta: 'MVP' },
    { title: 'UX con intención', desc: 'Pantallas que guían, reducen fricción y se sienten “producto”.', meta: 'UI/UX' },
    { title: 'Base sólida', desc: 'Arquitectura por features, tipado fuerte y código mantenible.', meta: 'Next / TS' },
    { title: 'De deploy a evolución', desc: 'Publicación, mejoras, métricas y roadmap: el producto no se abandona.', meta: 'Ship ✅' },
  ],
},

  {
    id: 'partner1',
    logo: { src: '/logos/partner1.svg', alt: 'Partner 1', w: 110, h: 26 },
    tabTone: 'light',
    headline: 'Diseño que guía, marca que se siente',
    subhead: 'Branding y landing con intención: claridad, confianza y conversión.',
    cards: [
      { title: 'Mensaje claro', desc: 'Propuesta directa, sin humo ni ruido.', meta: 'Copy' },
      { title: 'Secciones modulares', desc: 'Bloques reutilizables para escalar contenido.', meta: 'Blocks' },
      { title: 'SEO técnico', desc: 'Estructura, metadata y performance bien hechos.', meta: 'SEO' },
      { title: 'Accesibilidad', desc: 'Contraste, focus y semántica de verdad.', meta: 'a11y' },
    ],
  },
  {
    id: 'partner2',
    logo: { src: '/logos/partner2.svg', alt: 'Partner 2', w: 90, h: 24 },
    tabTone: 'light',
    headline: 'Dashboards para operaciones reales',
    subhead: 'Roles, permisos, tablas avanzadas y flujos que sí se entienden.',
    cards: [
      { title: 'Roles & permisos', desc: 'Guardas reales, nada de “seguridad decorativa”.', meta: 'RBAC' },
      { title: 'Tablas pro', desc: 'Sort, filtros, sticky header, skeletons.', meta: 'UX Data' },
      { title: 'Estados claros', desc: 'Empty, loading, error… todo controlado.', meta: 'States' },
      { title: 'Trazabilidad', desc: 'Acciones auditables, soporte más fácil.', meta: 'Audit' },
    ],
  },
  {
    id: 'partner3',
    logo: { src: '/logos/partner3.svg', alt: 'Partner 3', w: 80, h: 24 },
    tabTone: 'light',
    headline: 'Escala sin reescribir todo mañana',
    subhead: 'Base sólida hoy para que tu futuro no sea un refactor eterno.',
    cards: [
      { title: 'Carpetas limpias', desc: 'Features, services, types, UI… orden real.', meta: 'Structure' },
      { title: 'Reutilización', desc: 'Componentes y utilidades como lego.', meta: 'Reuse' },
      { title: 'DX feliz', desc: 'Tipado fuerte, convenciones, menos bugs.', meta: 'DX' },
      { title: 'Deploy seguro', desc: 'Releases sin sustos.', meta: 'CI/CD' },
    ],
  },
  {
    id: 'partner4',
    logo: { src: '/logos/partner4.svg', alt: 'Partner 4', w: 110, h: 26 },
    tabTone: 'light',
    headline: 'Evolución sin drama',
    subhead: 'Métricas, mejoras y mantenimiento sin apagar incendios diario.',
    cards: [
      { title: 'Monitoreo', desc: 'Errores, performance y health checks.', meta: 'Observability' },
      { title: 'Backlog real', desc: 'Mejoras evolutivas con prioridad.', meta: 'Roadmap' },
      { title: 'Optimización', desc: 'Menos renders, payloads y queries.', meta: 'Perf' },
      { title: 'Documentación', desc: 'Para que el proyecto no dependa de “memoria”.', meta: 'Docs' },
    ],
  },
];

export default function FeaturesSwitch() {
  const [activeId, setActiveId] = useState<string>(PRESETS[0].id);

  const active = useMemo(
    () => PRESETS.find((x) => x.id === activeId) ?? PRESETS[0],
    [activeId]
  );

  return (
    <section className={s.section} id="benefits" aria-label="Features switcher">
      <div className="container">
        {/* LOGOS ROW */}
        <div className={s.logoRow} role="tablist" aria-label="Selecciona un logo">
          {PRESETS.map((x) => {
            const isActive = x.id === activeId;
            const tone = x.tabTone ?? 'light';

            return (
              <button
                key={x.id}
                type="button"
                className={[
                  s.logoBtn,
                  isActive ? s.logoBtnActive : '',
                  isActive && tone === 'dark' ? s.logoBtnActiveDark : '',
                ].join(' ')}
                onClick={() => setActiveId(x.id)}
                role="tab"
                aria-selected={isActive}
              >
                <img
                  className={`${s.logoImg} ${isActive ? s.logoImgActive : ''}`}
                  src={x.logo.src}
                  alt={x.logo.alt}
                  loading="lazy"
                  draggable={false}
                  style={{
                    width: x.logo.w ? `${x.logo.w}px` : undefined,
                    height: x.logo.h ? `${x.logo.h}px` : undefined,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* HEADER */}
        <div className={s.header}>
          <div className={s.pill}>Features</div>
          <h2 className={s.title}>{active.headline}</h2>
          <p className={s.sub}>{active.subhead}</p>
        </div>

        {/* GRID */}
        <div key={active.id} className={s.grid}>
          {active.cards.map((c) => (
            <article key={c.title} className={s.card}>
              <div className={s.preview} aria-hidden="true">
                <div className={s.previewTop} />
                <div className={s.previewLines}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className={s.cardBody}>
                <div className={s.cardHead}>
                  <h3 className={s.cardTitle}>{c.title}</h3>
                  {c.meta ? <span className={s.meta}>{c.meta}</span> : null}
                </div>
                <p className={s.cardDesc}>{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
