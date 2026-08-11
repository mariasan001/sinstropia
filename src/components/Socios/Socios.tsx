'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Socios.module.scss';

gsap.registerPlugin(ScrollTrigger);

function Btn({
  href,
  variant,
  now,
  next,
}: {
  href: string;
  variant: 'primary' | 'secondary';
  now: string;
  next: string;
}) {
  return (
    <a className={`${s.btn} ${s[variant]} cursor-hover`} href={href}>
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>{now}</span>
        <span>{next}</span>
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
    </a>
  );
}

export default function Socios() {
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

      gsap.from(q(`.${s.copy} > *, .${s.step}`), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 64%' },
      });
    }, el);

    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const buttons = Array.from(el.querySelectorAll<HTMLElement>(`.${s.btn}`));
    const onBtnMove = (e: PointerEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const box = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${((e.clientX - box.left) / box.width - 0.5) * 18}px`);
      btn.style.setProperty('--my', `${((e.clientY - box.top) / box.height - 0.5) * 18}px`);
    };
    const onBtnLeave = (e: PointerEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    };
    if (!coarse) {
      buttons.forEach((btn) => {
        btn.addEventListener('pointermove', onBtnMove);
        btn.addEventListener('pointerleave', onBtnLeave);
      });
    }

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('pointermove', onBtnMove);
        btn.removeEventListener('pointerleave', onBtnLeave);
      });
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section ref={root} className={s.wrap} id="socios" aria-label="Socios">
      <div ref={paint} className={s.paint} aria-hidden />
      <p className={s.ghost} aria-hidden>
        Socios
      </p>

      <div className={s.inner}>
        <div className={s.copy}>
          <p className={s.badge}>Nuevo</p>
          <h2>
            Traes el proyecto.
            Si tiene potencial,
            entramos como socios.
          </h2>
          <p>
            Es una modalidad nueva: colaboración. No cotizas un servicio y se
            acaba. Ponemos todo nuestro oficio —diseño, arquitectura,
            desarrollo, lanzamiento— para llevarlo hasta el final. A cambio
            somos socios: una parte del proyecto.
          </p>
          <p>
            No llegan todo el año. Llegan cuando abre la convocatoria.
          </p>
          <div className={s.actions}>
            <Btn href="#contact" variant="primary" now="Avisarme" next="Escribirnos" />
            <Btn href="#contact" variant="secondary" now="Cotizar servicio" next="Hacemos" />
          </div>
        </div>

        <ol className={s.steps}>
          <li className={s.step}>
            <span>01</span>
            <div>
              <h3>Convocatoria</h3>
              <p>Una al año. Ahí se postulan los proyectos. No hay fila permanente.</p>
            </div>
          </li>
          <li className={s.step}>
            <span>02</span>
            <div>
              <h3>Valoramos</h3>
              <p>Vemos cuál tiene potencial. No entramos a todos. Lo decimos claro.</p>
            </div>
          </li>
          <li className={s.step}>
            <span>03</span>
            <div>
              <h3>Sociedad</h3>
              <p>Si entra, ponemos todo. Ellos traen la idea y el empuje. Nosotros, el oficio. A cambio, una parte.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
