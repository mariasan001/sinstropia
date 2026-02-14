'use client';

import { useMemo, useState } from 'react';
import s from './FeaturesSwitch.module.scss';

type Logo = { src: string; alt: string; w?: number; h?: number };
type FeatureCard = { title: string; desc: string; meta?: string };

type BrandPreset = {
  id: string;
  logo: Logo;
  headline: string;
  subhead: string;
  cards: FeatureCard[];
};

const PRESETS: BrandPreset[] = [
  {
    id: 'DaBook',
    logo: { src: '/img/dabook.png', alt: 'DaBook', w: 120, h: 28 },
    headline: 'DA BOOK',
    subhead:
      'El espacio donde artistas y creadores publican cursos, artículos, venden y definen sus propias reglas. Todo en un solo lugar, listo para escalar.',
    cards: [],
  },

  {
    id: 'partner1',
    logo: { src: '/logos/partner1.svg', alt: 'Partner 1', w: 110, h: 26 },
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

function DaBookCenteredHero({ subtitle }: { subtitle: string }) {
  return (
    <div className={s.dbHero}>
      <div className={s.dbStage}>
        {/* doodles orbitando (decorativos) */}
        <div className={s.dbDoodles} aria-hidden="true">
          {/* chat bubble */}
          <div className={`${s.doodle} ${s.doodleBubble}`}>
            <svg viewBox="0 0 80 80" fill="none">
              <path
                d="M18 22 C18 16, 23 12, 30 12 H52 C59 12, 64 16, 64 22 V42 C64 48, 59 52, 52 52 H38 L26 62 V52 H30 C23 52, 18 48, 18 42 V22 Z"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* cursor (más “Figma vibe”) */}
          <div className={`${s.doodle} ${s.doodleCursor}`}>
            <svg viewBox="0 0 64 64" fill="none">
              <path
                d="M18 12 L46 40 L34 40 L40 54 L34 56 L28 42 L18 50 L18 12 Z"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* sticky note (amarillo/verde, tu elección por tokens) */}
          <div className={`${s.doodle} ${s.doodleNote}`} />

          {/* dotted connector (pizarrón) */}
          <div className={`${s.doodle} ${s.doodleDotted}`} />

          {/* scribbles sutiles detrás del texto */}
          <div className={`${s.doodle} ${s.doodleScribbleA}`} />
          <div className={`${s.doodle} ${s.doodleScribbleB}`} />

          {/* wave line */}
          <div className={`${s.doodle} ${s.doodleWave}`}>
            <svg viewBox="0 0 320 110" fill="none">
              <path
                d="M10 70 C 60 20, 110 105, 160 60 S 250 15, 310 70"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* creator callouts (no invaden el centro por mask) */}
          <div className={`${s.doodle} ${s.doodleCallout} ${s.dcA}`}>
            <span className={s.dcTag}>Artista</span>
            <b>Ana</b>
          </div>

          <div className={`${s.doodle} ${s.doodleCallout} ${s.dcB}`}>
            <span className={s.dcTag}>Profesor</span>
            <b>Mark</b>
          </div>

          <div className={`${s.doodle} ${s.doodleCallout} ${s.dcC}`}>
            <span className={s.dcTag}>Creadora</span>
            <b>Elena</b>
          </div>

          {/* module pills */}
          <div className={`${s.doodle} ${s.doodlePill} ${s.dpA}`}>Cursos</div>
          <div className={`${s.doodle} ${s.doodlePill} ${s.dpB}`}>Artículos</div>
          <div className={`${s.doodle} ${s.doodlePill} ${s.dpC}`}>Tienda</div>
          <div className={`${s.doodle} ${s.doodlePill} ${s.dpD}`}>Licencias</div>
        </div>

        {/* contenido centrado */}
        <div className={s.dbContent}>
          <h2 className={s.dbTitle}>DA BOOK</h2>

          <p className={s.dbSubtitle}>{subtitle}</p>

        <a
          href="https://dabook.sintropia-dev.com/"
          className={s.dbCta}
          target="_blank"
          rel="noreferrer"
        >
          Explorar DaBook <span aria-hidden="true">→</span>
        </a>

          <div className={s.dbProof}>
            <div className={s.dbAvatars} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={s.dbProofText}>
              <b>+</b> <span>se parte de la familia dabook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function FeaturesSwitch() {
  const [activeId, setActiveId] = useState<string>(PRESETS[0].id);

  const active = useMemo(
    () => PRESETS.find((x) => x.id === activeId) ?? PRESETS[0],
    [activeId]
  );

  const isDaBook = active.id === 'DaBook';

  return (
    <section className={s.section} id="benefits" aria-label="Features switcher">
      <div className="container">
        <div className={s.logoRow} role="tablist" aria-label="Selecciona un logo">
          {PRESETS.map((x) => {
            const isActive = x.id === activeId;

            return (
              <button
                key={x.id}
                type="button"
                className={`${s.logoBtn} ${isActive ? s.logoBtnActive : ''}`}
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

        {isDaBook ? (
          <DaBookCenteredHero subtitle={active.subhead} />
        ) : (
          <>
            <div className={s.header}>
              <div className={s.pill}>Features</div>
              <h2 className={s.title}>{active.headline}</h2>
              <p className={s.sub}>{active.subhead}</p>
            </div>

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
          </>
        )}
      </div>
    </section>
  );
}
