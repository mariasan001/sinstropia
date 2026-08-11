'use client';

import { useEffect, useRef, type FormEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Contacto.module.scss';

gsap.registerPlugin(ScrollTrigger);

const MAIL = 'hola@sintropia.mx';

export default function Contacto() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);

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
              start: 'top 88%',
              end: 'top 20%',
              scrub: 0.6,
            },
          },
        );
      }

      gsap.from(q(`.${s.copy} > *, .${s.form}`), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 64%' },
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get('nombre') ?? '').trim();
    const canal = String(data.get('canal') ?? '').trim();
    const idea = String(data.get('idea') ?? '').trim();
    const body = `Nombre: ${nombre}\nCómo escribirte: ${canal}\n\n${idea}`;
    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(`Cotizar · ${nombre || 'Sintropía'}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={root} className={s.wrap} id="contact" aria-label="Contacto">
      <div ref={paint} className={s.paint} aria-hidden />
      <p className={s.ghost} aria-hidden>
        Hola
      </p>

      <div className={s.inner}>
        <div className={s.copy}>
          <p className={s.kicker}>Contacto</p>
          <h2>
            Cuéntanos qué
            traes. Nos
            sentamos.
          </h2>
          <p>
            Una cotización, un producto en renta o la convocatoria de socios.
            Escribe. Respondemos.
          </p>
          <a className={`${s.mail} cursor-hover`} href={`mailto:${MAIL}`}>
            {MAIL}
          </a>
        </div>

        <form className={s.form} onSubmit={onSubmit}>
          <label>
            <span>Nombre</span>
            <input name="nombre" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Cómo escribirte</span>
            <input
              name="canal"
              type="text"
              autoComplete="email"
              placeholder="Correo o WhatsApp"
              required
            />
          </label>
          <label>
            <span>Qué traes</span>
            <textarea name="idea" rows={5} required />
          </label>
          <button type="submit" className={`${s.btn} cursor-hover`}>
            <span className={s.fill} aria-hidden />
            <span className={s.label}>
              <span>Enviar</span>
              <span>Escribirnos</span>
            </span>
            <span className={s.arrow} aria-hidden>
              <i>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </i>
              <b>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </b>
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
