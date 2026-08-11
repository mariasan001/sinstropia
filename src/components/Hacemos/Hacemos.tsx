'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindReveal } from '@/motion/reveal';
import s from './Hacemos.module.scss';

gsap.registerPlugin(ScrollTrigger);

function Arrow() {
  return (
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
  );
}

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
      <Arrow />
    </a>
  );
}

export default function Hacemos() {
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
    <section ref={root} className={s.wrap} id="services" aria-label="Hacemos">
      <div ref={paint} className={s.paint} aria-hidden />
      <p className={s.ghost} aria-hidden>
        Hacemos
      </p>

      <div className={s.copy}>
        <h2>
          Páginas, sistemas y apps.
          También producto en renta
          para tu negocio.
        </h2>

        <p>
          Nos sentamos a hablar. No hace falta que llegues con todo resuelto:
          ponemos las ideas sobre la mesa y no las recortamos. Entregamos
          bocetos para verlo juntos. Lo construimos, se los entregamos y
          lo vemos andar. Se valida con ustedes. Se publica. Y no los
          soltamos ahí: los acompañamos a dar el primer paso.
        </p>

        <aside className={s.slab}>
          <p>
            Si solo quieres un sistema que ya existe, puedes rentar nuestro
            producto. Sin empezar de cero.
          </p>
          <div className={s.actions}>
            <Btn href="#contact" variant="primary" now="Cotiza" next="Empezar" />
            <Btn href="#productos" variant="secondary" now="Ver productos" next="Entrar" />
          </div>
        </aside>
      </div>
    </section>
  );
}
