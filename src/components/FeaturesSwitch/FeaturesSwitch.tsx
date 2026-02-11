'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

type HeroMedia =
  | { type: 'image'; src: string; alt: string }
  | {
      type: 'video';
      alt: string;
      poster?: string;
      sources: Array<{ src: string; mime: string }>;
    };

type CollabNote = {
  leftLogo: Logo;
  rightLogo: Logo;
  eyebrow: string;
  title: string;
  lines: string[];
  footer: string;
};

type BrandPreset = {
  id: string;
  logo: Logo;

  headline: string;
  subhead: string;
  cards: FeatureCard[];

  heroMedia?: HeroMedia; // solo DaBook
  collabNote?: CollabNote; // solo DaBook
};

const PRESETS: BrandPreset[] = [
  {
    id: 'DaBook',
    logo: { src: '/img/dabook.png', alt: 'DaBook', w: 120, h: 28 },

    headline: 'Crea, enseña y vende con tu plataforma',
    subhead:
      'Es el espacio donde artistas y creadores publican cursos, artículos, venden y definen sus propias reglas. Todo en un solo lugar, listo para escalar.',

    heroMedia: {
      type: 'image',
      src: '/img/img_dabook.png',
      alt: 'Vista previa de DaBook',
    },

    collabNote: {
      leftLogo: { src: '/img/fav-icon.png', alt: 'Sintro', w: 28, h: 28 },
      rightLogo: { src: '/img/dabook.png', alt: 'DaBook', w: 28, h: 28 },
      eyebrow: 'colaboración',
      title: 'Cuando el diseño y el código se dan la mano, la idea deja de ser idea.',
      lines: [
        'En Sintro lo volvemos claridad, ritmo y experiencia.',
        'En DaBook se vuelve comunidad, contenido y ventas.',
        '',
      ],
      footer: '',
    },

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

function CollabInviteCard({ note }: { note: CollabNote }) {
  return (
    <div className={s.inviteOuter} role="note" aria-label="Nota de colaboración">
      <div className={s.inviteInner}>
        {/* Header (avatar + nombre) */}
        <div className={s.inviteHeader}>
          <span className={s.inviteAvatar} aria-hidden="true">
            <img src={note.leftLogo.src} alt={note.leftLogo.alt} draggable={false} />
          </span>

          <div className={s.inviteHeadText}>
            <b className={s.inviteName}>Sintro × DaBook</b>
            <span className={s.inviteEyebrow}>{note.eyebrow}</span>
          </div>
        </div>

        {/* Title + badge (iconito a la derecha como la imagen) */}
        <div className={s.inviteTitleRow}>
          <p className={s.inviteTitle}>{note.title}</p>

          <span className={s.inviteBadge} aria-hidden="true">
            <img src={note.rightLogo.src} alt={note.rightLogo.alt} draggable={false} />
          </span>
        </div>

        <div className={s.inviteDivider} aria-hidden="true" />

        {/* Body (texto gris, y el “Juntos…” fuerte) */}
        <div className={s.inviteBody}>
          {note.lines.map((x) => (
            <p key={x}>{x}</p>
          ))}
        </div>

        <div className={s.inviteFooter}>{note.footer}</div>
      </div>
    </div>
  );
}


function DaBookHero({
  subtitle,
  media,
  collab,
}: {
  subtitle: string;
  media?: HeroMedia;
  collab?: CollabNote;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!media || media.type !== 'video') return;
    const video = videoRef.current;
    const target = viewportRef.current;
    if (!video || !target) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const safePlay = async () => {
      if (prefersReduced) return;
      try {
        await video.play();
      } catch {
        // policies: si falla, no pasa nada
      }
    };

    const safePause = () => {
      try {
        video.pause();
      } catch {
        // ignore
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) safePlay();
        else safePause();
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    io.observe(target);

    const onVis = () => {
      if (document.visibilityState !== 'visible') safePause();
    };
    document.addEventListener('visibilitychange', onVis);

    safePlay();

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [media]);

  return (
    <div className={s.dbWrap}>
      <div className={s.dbTop}>
        <h2 className={s.dbTitle}>DA BOOK</h2>
        <p className={s.dbSubtitle}>{subtitle}</p>

        <div className={s.dbCtas}>
          <a className={s.dbPrimary} href="#contact">
            Contactar
          </a>
          <a className={s.dbSecondary} href="#projects">
            Explorar DaBook
          </a>
        </div>

        <div className={s.dbProof}>
          <div className={s.dbAvatars} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={s.dbProofText}>
            <b>60k+</b> <span>creadores</span>
          </div>
        </div>
      </div>

      <div className={s.dbGrid}>
        <aside className={s.dbSideLeft} aria-hidden="true">
          <div className={s.dbMiniGrid}>
            {[
              ['A1', 'Inicia'],
              ['A2', 'Avanza'],
              ['B1', 'Crece'],
              ['B2', 'Pulido'],
              ['C1', 'Pro'],
              ['C2', 'Mastery'],
            ].map(([tag, label]) => (
              <div key={tag} className={s.dbMiniCard}>
                <span className={s.dbTag}>{tag}</span>
                <span className={s.dbMiniText}>{label}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className={s.dbCenter}>
          <div className={s.dbScreen} aria-label="Vista previa de DaBook">
            <div className={s.dbScreenTop} aria-hidden="true">
              <div className={s.dbDots}>
                <span />
                <span />
                <span />
              </div>
              <div className={s.dbAddress} />
            </div>

            <div className={s.dbScreenPad}>
              <div ref={viewportRef} className={s.dbViewport}>
                {media?.type === 'video' ? (
                  <video
                    ref={videoRef}
                    className={s.dbViewportMedia}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={media.poster}
                    aria-label={media.alt}
                  >
                    {media.sources.map((src) => (
                      <source key={src.src} src={src.src} type={src.mime} />
                    ))}
                  </video>
                ) : media?.type === 'image' ? (
                  <img
                    className={s.dbViewportMedia}
                    src={media.src}
                    alt={media.alt}
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <div className={s.dbViewportPh} aria-hidden="true">
                    <div className={s.dbPhHero} />
                    <div className={s.dbPhLines}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={s.dbPager} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </main>

        <aside className={s.dbSideRight} aria-label="Colaboración Sintro y DaBook">
          {collab ? <CollabInviteCard note={collab} /> : null}
        </aside>
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
          <DaBookHero subtitle={active.subhead} media={active.heroMedia} collab={active.collabNote} />
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
