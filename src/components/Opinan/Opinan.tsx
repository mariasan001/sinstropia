'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindReveal } from '@/motion/reveal';
import s from './Opinan.module.scss';

gsap.registerPlugin(ScrollTrigger);

const notes = [
  {
    id: 'cb',
    name: 'Credibringe',
    who: 'Préstamos a empleados',
    lines: [
      'No sabíamos quién debía qué, ni cuándo se le iba a descontar.',
      'Hoy cada empleado entra y ve su cuenta: cuánto debe, cuánto ha pagado y cómo va.',
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
    id: 'dabook',
    name: 'Dabook',
    who: 'Dirección',
    lines: [
      'No podíamos tener una tienda para el curso, otra para lo físico y otra para el archivo.',
      'En Dabook vendemos, cobramos y volvemos a publicar en el mismo lugar. Se sigue armando con nosotros.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#060709" />
        <rect x="15" y="16" width="18" height="16" rx="2" fill="none" stroke="#C1FF72" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    id: 'herrera',
    name: 'Despacho Herrera',
    who: 'Socio',
    lines: [
      'Las actas, las llamadas y los videos se nos iban a carpetas sueltas. No había cómo probar que eso se dijo.',
      'Con Neurona queda constancia. Lo que se escribió, se habló o se grabó se puede validar.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#7753F5" />
        <path d="M16 32V18l8-4 8 4v14H16z" fill="none" stroke="#fff" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    id: 'roble',
    name: 'Taller Roble',
    who: 'Ventas',
    lines: [
      'Cada mueble se cotizaba otra vez en el chat. El precio no salía igual dos veces.',
      'Rentamos el Cotizador, pusimos nuestras reglas y el cliente pide. Sale un número. Sin rehacer la cuenta.',
    ],
    mark: (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#C1FF72" />
        <path d="M14 30c3.2-6 6.4-12 10-12s6.8 6 10 12" fill="none" stroke="#060709" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Opinan() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLElement>(null);
  const ghost = useRef<HTMLParagraphElement>(null);
  const wait = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const index = useRef(0);
  const primed = useRef(false);
  const [active, setActive] = useState(0);
  const note = notes[active];

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

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
              start: 'top 88%',
              end: 'top 20%',
              scrub: 0.6,
            },
          },
        );
      }
      bindReveal(el, el.querySelectorAll(`.${s.head}, .${s.bar}`), {
        start: 'top 80%',
        end: 'bottom 14%',
      });

      const bits = () => el.querySelectorAll(`.${s.rise}`);
      gsap.set(bits(), { yPercent: 115 });

      const playRise = () => {
        gsap.fromTo(
          bits(),
          { yPercent: 115 },
          { yPercent: 0, duration: 0.62, stagger: 0.055, ease: 'power3.out', overwrite: 'auto' },
        );
      };
      const playLeave = (dir: 'up' | 'down') => {
        gsap.to(bits(), {
          yPercent: dir === 'up' ? -110 : 115,
          duration: 0.36,
          stagger: 0.03,
          ease: 'power3.in',
          overwrite: 'auto',
        });
      };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        end: 'bottom 14%',
        onEnter: playRise,
        onEnterBack: playRise,
        onLeave: () => playLeave('up'),
        onLeaveBack: () => playLeave('down'),
      });

      el.querySelectorAll(`.${s.name}`).forEach((btn, i) => {
        gsap.set(btn, { y: 16, autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 78%',
          end: 'bottom 14%',
          onEnter: () =>
            gsap.to(btn, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.08 * i, ease: 'power3.out', overwrite: 'auto' }),
          onEnterBack: () =>
            gsap.to(btn, { y: 0, autoAlpha: 1, duration: 0.45, delay: 0.05 * i, ease: 'power3.out', overwrite: 'auto' }),
          onLeave: () => gsap.to(btn, { y: -12, autoAlpha: 0, duration: 0.28, ease: 'power2.in', overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(btn, { y: 16, autoAlpha: 0, duration: 0.28, ease: 'power2.in', overwrite: 'auto' }),
        });
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  const show = (i: number) => {
    if (i === index.current || busy.current) return;
    const next = (i + notes.length) % notes.length;

    const swap = () => {
      index.current = next;
      setActive(next);
    };

    if (reduce) {
      swap();
      return;
    }

    const body = copy.current;
    const name = ghost.current;
    if (!body) {
      swap();
      return;
    }

    busy.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    tl.to(body, { y: 18, autoAlpha: 0, duration: 0.26, ease: 'power2.in' }, 0);
    if (name) tl.to(name, { y: 12, autoAlpha: 0, duration: 0.26, ease: 'power2.in' }, 0);
    tl.add(swap);
    tl.to({}, { duration: 0.04 });
    tl.set(body, { y: -14 });
    if (name) tl.set(name, { y: 10 });
    tl.to(body, { y: 0, autoAlpha: 1, duration: 0.42, ease: 'power3.out' });
    if (name) tl.to(name, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, '<');
  };

  useEffect(() => {
    if (!primed.current) {
      primed.current = true;
      return;
    }
    const el = root.current;
    if (!el || reduce) return;
    const bits = el.querySelectorAll(`.${s.rise}`);
    gsap.fromTo(
      bits,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' },
    );
  }, [active, reduce]);

  useEffect(() => {
    const bar = wait.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.set(bar, { scaleX: 0 });
    if (reduce) return;
    gsap.to(bar, {
      scaleX: 1,
      duration: 6.4,
      ease: 'none',
      onComplete: () => {
        if (busy.current) return;
        show(index.current + 1);
      },
    });
  }, [active, reduce]);

  useEffect(() => {
    const el = root.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') show(index.current + 1);
      if (e.key === 'ArrowLeft') show(index.current - 1);
    };
    window.addEventListener('keydown', onKey);

    let x0 = 0;
    const onStart = (e: TouchEvent) => {
      x0 = e.changedTouches[0]?.clientX ?? 0;
    };
    const onEnd = (e: TouchEvent) => {
      const x1 = e.changedTouches[0]?.clientX ?? x0;
      const d = x1 - x0;
      if (Math.abs(d) < 48) return;
      show(index.current + (d < 0 ? 1 : -1));
    };
    el?.addEventListener('touchstart', onStart, { passive: true });
    el?.addEventListener('touchend', onEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      el?.removeEventListener('touchstart', onStart);
      el?.removeEventListener('touchend', onEnd);
    };
  }, []);

  return (
    <section ref={root} className={s.wrap} id="opinan" aria-label="Opinan">
      <div ref={paint} className={s.paint} aria-hidden />
      <p ref={ghost} className={s.ghost} aria-hidden>
        {note.name}
      </p>

      <div className={s.stage}>
        <header className={s.head}>
          <div className={s.headCopy}>
            <p className={s.index}>03</p>
            <h2 className={s.title}>Opinan</h2>
            <p className={s.kicker}>Cómo lo cuentan</p>
          </div>
          <div className={s.step}>
            <button type="button" className={`${s.dir} cursor-hover`} onClick={() => show(active - 1)} aria-label="Anterior">
              ←
            </button>
            <p className={s.count}>
              {String(active + 1).padStart(2, '0')}
              <span> / {String(notes.length).padStart(2, '0')}</span>
            </p>
            <button type="button" className={`${s.dir} cursor-hover`} onClick={() => show(active + 1)} aria-label="Siguiente">
              →
            </button>
          </div>
        </header>

        <article ref={copy} className={s.copy}>
          <span className={s.mark} aria-hidden>
            <span className={s.clip}>
              <span className={s.rise}>”</span>
            </span>
          </span>
          <blockquote>
            {note.lines.map((line) => (
              <p key={line}>
                <span className={s.clip}>
                  <span className={s.rise}>{line}</span>
                </span>
              </p>
            ))}
          </blockquote>
          <footer className={s.who}>
            <span className={s.logo}>{note.mark}</span>
            <div className={s.meta}>
              <strong>
                <span className={s.clip}>
                  <span className={s.rise}>{note.name}</span>
                </span>
              </strong>
              <em>
                <span className={s.clip}>
                  <span className={s.rise}>{note.who}</span>
                </span>
              </em>
            </div>
          </footer>
        </article>

        <div className={s.bar}>
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
          <span className={s.wait} aria-hidden>
            <i ref={wait} />
          </span>
        </div>
      </div>
    </section>
  );
}
