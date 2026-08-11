'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Work.module.scss';

gsap.registerPlugin(ScrollTrigger);

const pieces = [
  {
    id: '01',
    kind: 'App interna',
    title: 'Credibringe',
    note: 'Para un cliente: control de préstamos en su empresa. Ellos operan; sus clientes también entran.',
    story: [
      'Nació para un cliente que necesitaba controlar los préstamos dentro de su empresa. No un Excel. Un sistema que se usa todos los días.',
      'Es una aplicación interna: su equipo opera desde adentro, y también dan acceso a sus propios clientes.',
      'A la medida. Sin plantilla. Hecho para cómo ellos cobran, siguen y cierran.',
    ],
  },
  {
    id: '02',
    kind: 'Sistema',
    title: 'USYC',
    note: 'Caja y cobro para estudiantes: reportes y comprobantes. Escuela de verdad, no un demo.',
    story: [
      'USYC es el sistema de una escuela. Caja y cobro para estudiantes: lo que entra, lo que se debe, lo que ya se pagó.',
      'Reportes para ver claro. Comprobantes para quien paga. Sin teatro: operación real.',
      'Lo desarrollamos para que la escuela no persiga el dinero en papeles sueltos.',
    ],
  },
  {
    id: '03',
    kind: 'Sistema · Sitio',
    title: 'Dabook',
    status: 'Próximo lanzamiento',
    note: 'El más grande. Sigue creciendo. Artistas venden cursos, productos físicos y digitales — y más.',
    story: [
      'Dabook es el proyecto más grande. Del tamaño de Credibringe, pero con muchas más piezas — y sigue creciendo.',
      'Está hecho para que los artistas vendan: cursos, productos físicos, productos digitales. Republicar. Ampliar. No quedarse en una sola cosa.',
      'Próximo a lanzamiento. No es un sitio de vitrina. Es un sistema que va a seguir creciendo después de salir.',
    ],
  },
  {
    id: '04',
    kind: 'Sitio · Sistema',
    title: 'Gym',
    status: 'En desarrollo',
    story: [
      'Uno de los nuevos. Una página para quien llega de afuera, y un sistema interno para quien corre el gimnasio.',
      'Gestión del día a día y membresías: quién entra, quién está activo, qué se cobra.',
      'Todavía en el taller. App, sistema y sitio, armados juntos.',
    ],
    note: 'Página pública y gestión interna del gimnasio: operación y membresías.',
  },
];

export default function Work() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = pieces.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      if (paint.current) {
        gsap.fromTo(
          paint.current,
          { scaleY: 1 },
          {
            scaleY: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 18%',
              scrub: 0.65,
            },
          },
        );
      }

      gsap.from(q(`.${s.head} > *`), {
        y: 28,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 72%' },
      });

      q(`.${s.row}`).forEach((row) => {
        gsap.from(row, {
          y: 40,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });
      });

      gsap.fromTo(
        q(`.${s.ink}`),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: q(`.${s.list}`),
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 0.4,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  useEffect(() => {
    document.documentElement.classList.toggle('work-open', Boolean(open));
    if (!open || reduce || !stage.current) return;

    const q = gsap.utils.selector(stage.current);
    const tl = gsap.timeline();
    gsap.set(stage.current, { autoAlpha: 1 });
    gsap.set(q(`.${s.veil}`), { scaleX: 0 });
    gsap.set(q(`.${s.stageCopy} > *`), { y: 28, autoAlpha: 0 });
    tl.to(q(`.${s.veil}`), { scaleX: 1, duration: 0.7, ease: 'power3.inOut' });
    tl.to(q(`.${s.stageCopy} > *`), { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.55, ease: 'power3.out' }, '-=0.2');

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      tl.kill();
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('work-open');
    };
  }, [open, reduce]);

  return (
    <section ref={root} className={s.work} id="projects" aria-label="Trabajo">
      <div ref={paint} className={s.paint} aria-hidden />
      <div className={s.inner}>
        <header className={s.head}>
          <p className={s.index}>02</p>
          <h2 className={s.title}>Trabajo</h2>
        </header>

        <div className={s.list}>
          <span className={s.rail} aria-hidden>
            <i className={s.ink} />
          </span>

          {pieces.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${s.row} cursor-hover`}
              onClick={() => setOpenId(item.id)}
            >
              <span className={s.body}>
                <span className={s.kind}>
                  {item.kind}
                  {item.status ? <em>{item.status}</em> : null}
                </span>
                <span className={s.name}>{item.title}</span>
                <span className={s.note}>{item.note}</span>
              </span>
              <span className={s.go} aria-hidden>
                <svg viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open ? (
        <div ref={stage} className={s.stage} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className={s.veil} aria-hidden />
          <p className={s.ghost} aria-hidden>
            {open.title}
          </p>
          <div className={s.stageCopy}>
            <p className={s.stageKind}>
              {open.kind}
              {open.status ? <em>{open.status}</em> : null}
            </p>
            <h3>{open.title}</h3>
            {open.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <button type="button" className={s.close} onClick={() => setOpenId(null)}>
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
