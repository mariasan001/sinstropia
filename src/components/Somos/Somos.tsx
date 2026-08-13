'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hide, playIn } from '@/motion/reveal';
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

      const targets = q(`.${s.head}, .${s.leadCol} > *, .${s.story} > *`);
      hide(targets);
      const reveal = () => playIn(targets);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        onEnter: reveal,
        onEnterBack: reveal,
      });
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) reveal();
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
      <div className={s.atmosphere} aria-hidden>
        <span className={s.ring} />
        <span className={s.slash} />
      </div>
      <p className={s.ghost} aria-hidden>
        Somos
      </p>

      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.index}>06</p>
          <div className={s.headCopy}>
            <h2 className={s.title}>Somos</h2>
            <p className={s.kicker}>Agencia digital</p>
          </div>
        </div>

        <div className={s.body}>
          <div className={s.leadCol}>
            <h3 className={s.headline} data-nosplit="1">
              <span>Construimos lo que imaginas</span>
              <span className={s.punch}>como si fuera nuestro.</span>
            </h3>
            <p className={s.lead}>
              Hay ideas que merecen algo más que una entrega rápida. Merecen tiempo,
              atención y personas que crean en ellas tanto como tú.
            </p>
            <div className={s.actions}>
              <Btn href="#contact" variant="primary" now="Escribirnos" next="Empezar" />
              <Btn href="#projects" variant="secondary" now="Ver el trabajo" next="Entrar" />
            </div>
          </div>

          <div className={s.story}>
            <p>
              Nos involucramos desde el primer boceto hasta el último detalle.
              Pensamos, diseñamos, desarrollamos y mejoramos cada producto con la
              misma dedicación con la que construiríamos el nuestro.
            </p>
            <p>
              No buscamos hacer más proyectos. Buscamos crear productos que duren,
              que resuelvan problemas reales y que hagan sentir orgullo a quienes
              los lanzan.
            </p>
            <p>
              Creamos páginas web, aplicaciones y software para personas y empresas
              que quieren construir algo grande.
            </p>
            <p className={s.place}>
              Desde México, desarrollando tecnología para cualquier lugar del mundo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
