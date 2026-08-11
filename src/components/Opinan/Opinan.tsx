'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Opinan.module.scss';

gsap.registerPlugin(ScrollTrigger);

const notes = [
  {
    id: 'cb',
    name: 'Credibringe',
    who: 'Dirección',
    lines: [
      'Teníamos los préstamos en Excel y se nos escapaba todo.',
      'Ahora el equipo opera desde adentro y nuestros clientes también entran. Se usa todos los días.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#060709" />
        <path d="M14 32V16h9.2c4.6 0 7.4 2.4 7.4 6.2 0 3.8-2.8 6.2-7.4 6.2H20v3.6H14zm6-9.2h2.6c1.8 0 2.8-1 2.8-2.4s-1-2.4-2.8-2.4H20v4.8z" fill="#C1FF72" />
      </svg>
    ),
  },
  {
    id: 'usyc',
    name: 'USYC',
    who: 'Administración escolar',
    lines: [
      'La caja era papeles sueltos: lo que se debía, lo que ya se pagó.',
      'Hoy hay reportes y comprobantes. La escuela ve el dinero, no lo persigue.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#7753F5" />
        <path d="M15 18.2h18v3.4H27.2V32h-4.4V21.6H15v-3.4z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: 'bruma',
    name: 'Taller Bruma',
    who: 'Dueña',
    lines: [
      'Llegué con la idea a medias y no me la recortaron.',
      'Primero vimos bocetos. Después el sitio. Y no se desaparecieron cuando se publicó.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#060709" />
        <path d="M14 30c3.2-6 6.4-12 10-12s6.8 6 10 12" fill="none" stroke="#C1FF72" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'norte',
    name: 'Clínica Norte',
    who: 'Administración',
    lines: [
      'No queríamos un sitio bonito y un sistema aparte.',
      'La página y lo de adentro se hablaron desde el principio. Eso nos evitó un desastre después.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#7753F5" />
        <path d="M24 14v20M14 24h20" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'lumen',
    name: 'Bodega Lumen',
    who: 'Operaciones',
    lines: [
      'No teníamos tiempo de construir de cero.',
      'Rentamos lo que ya tenían, lo acomodaron a cómo cobramos y en semanas ya estaba andando.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#C1FF72" />
        <rect x="15" y="16" width="18" height="16" rx="2" fill="none" stroke="#060709" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    id: 'velez',
    name: 'Casa Vélez',
    who: 'Dirección',
    lines: [
      'Habíamos oído “a la medida” en todos lados.',
      'Aquí sí se sentaron con cómo cobramos y cómo entregamos. El sistema se parece a nosotros, no al revés.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#060709" />
        <path d="M16 32V18l8-4 8 4v14H16z" fill="none" stroke="#C1FF72" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    id: 'oficio',
    name: 'Oficio',
    who: 'Fundador',
    lines: [
      'No era solo la app. Era que alguien entendiera el negocio.',
      'Lo construyeron, lo vimos andar y nos acompañaron el primer mes. Eso no lo habíamos tenido.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#7753F5" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="#fff" strokeWidth="3" />
      </svg>
    ),
  },
];

export default function Opinan() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const skin = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const ghost = useRef<HTMLParagraphElement>(null);
  const busy = useRef(false);
  const hold = useRef(false);
  const index = useRef(0);
  const [active, setActive] = useState(0);
  const note = notes[active];

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    const ctx = gsap.context(() => {
      if (!paint.current) return;
      gsap.fromTo(
        paint.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 20%',
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  const show = (i: number) => {
    if (i === index.current || busy.current) return;
    if (reduce) {
      index.current = i;
      setActive(i);
      return;
    }

    const cover = skin.current;
    const copy = body.current;
    const name = ghost.current;
    if (!cover || !copy || !name) {
      index.current = i;
      setActive(i);
      return;
    }

    busy.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    tl.to(copy, { y: -28, autoAlpha: 0, duration: 0.28, ease: 'power2.in' }, 0);
    tl.to(name, { y: 24, autoAlpha: 0, duration: 0.28, ease: 'power2.in' }, 0);
    tl.to(cover, { scaleY: 1, duration: 0.42, ease: 'power3.inOut' }, 0.05);
    tl.add(() => {
      index.current = i;
      setActive(i);
    });
    tl.set(copy, { y: 28 });
    tl.set(name, { y: -16 });
    tl.to(cover, { scaleY: 0, duration: 0.42, ease: 'power3.inOut' });
    tl.to(copy, { y: 0, autoAlpha: 1, duration: 0.38, ease: 'power3.out' }, '<0.08');
    tl.to(name, { y: 0, autoAlpha: 1, duration: 0.38, ease: 'power3.out' }, '<');
  };

  useEffect(() => {
    if (reduce) return;
    const tick = window.setInterval(() => {
      if (hold.current || busy.current) return;
      show((index.current + 1) % notes.length);
    }, 5600);
    return () => window.clearInterval(tick);
  }, [reduce]);

  return (
    <section
      ref={root}
      className={s.wrap}
      id="opinan"
      aria-label="Opinan"
      onPointerEnter={() => {
        hold.current = true;
      }}
      onPointerLeave={() => {
        hold.current = false;
      }}
    >
      <div ref={paint} className={s.paint} aria-hidden />
      <div ref={skin} className={s.skin} aria-hidden />

      <p ref={ghost} className={s.ghost} aria-hidden>
        {note.name}
      </p>

      <div ref={body} className={s.body}>
        <p className={s.kicker}>Clientes</p>
        <span className={s.logo}>{note.mark}</span>
        <blockquote>
          {note.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </blockquote>
        <footer>
          <strong>{note.name}</strong>
          <em>{note.who}</em>
        </footer>
      </div>

      <div className={s.bar}>
        <p className={s.count}>
          {String(active + 1).padStart(2, '0')}
          <span> / {String(notes.length).padStart(2, '0')}</span>
        </p>
        <div className={s.names} role="tablist" aria-label="Clientes">
          {notes.map((n, i) => (
            <button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`${s.name} ${active === i ? s.on : ''} cursor-hover`}
              onClick={() => show(i)}
            >
              {n.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
