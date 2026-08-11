'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindReveal } from '@/motion/reveal';
import s from './Somos.module.scss';

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

export default function Somos() {
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

      bindReveal(el, q(`.${s.copy} > *`));
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
    <section ref={root} className={s.wrap} id="about" aria-label="Somos">
      <div ref={paint} className={s.paint} aria-hidden />
      <p className={s.ghost} aria-hidden>
        Somos
      </p>

      <div className={s.copy}>
        <p className={s.kicker}>Agencia digital</p>
        <h2>
          Chicos que creen
          que un sistema
          se hace con creatividad.
        </h2>
        <p>
          No crear por crear. Llevar lo que llega a su máximo potencial — y
          seguir ahí cuando ya está andando. Nos sentamos con la idea. No la
          recortamos. La construimos como si fuera nuestra.
        </p>
        <p>
          Página, app o producto. Si ya existe, se renta. Si el proyecto da
          para más, hay convocatoria y podemos ser socios.
        </p>
        <p className={s.place}>
          En donde el proyecto quepa. Desde México. Contigo.
        </p>
        <div className={s.actions}>
          <Btn href="#contact" variant="primary" now="Escribirnos" next="Empezar" />
          <Btn href="#projects" variant="secondary" now="Ver el trabajo" next="Entrar" />
        </div>
      </div>
    </section>
  );
}
