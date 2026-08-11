'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion/reveal';
import s from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger);

type Props = { ready?: boolean };

const SETUP = ['Tus ideas no se quedan', 'en el cuaderno:'];
const PUNCH = ['salen', 'al mundo'];

export default function Hero({ ready = true }: Props) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;

    const q = gsap.utils.selector(el);
    const chars = q(`.${s.char}`);
    const rest = q(`.${s.lead}`);
    const buttons = q(`.${s.btn}`);
    const mark = q(`.${s.mark}`);

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const mobile = window.matchMedia('(max-width: 860px)').matches;

    if (reduce) {
      gsap.set([chars, rest, buttons, mark], { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 120, autoAlpha: 0 });
      gsap.set(rest, { autoAlpha: 0, y: 20 });
      gsap.set(buttons, { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.set(mark, { y: 40 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to(mark, { y: 0, duration: mobile ? 1 : 1.25, ease: 'power3.out' }, 0);
      tl.to(
        chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: mobile ? 0.7 : 0.88,
          stagger: mobile ? 0.014 : 0.02,
          ease: 'power4.out',
        },
        0.1,
      );
      tl.to(rest, { autoAlpha: 1, y: 0, duration: MOTION.duration }, '-=0.28');
      tl.to(
        buttons,
        { autoAlpha: 1, y: 0, scale: 1, duration: MOTION.duration, stagger: MOTION.stagger, ease: 'back.out(1.6)' },
        '-=0.28',
      );

      tl.add(() => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
          animation: gsap
            .timeline({ defaults: { ease: 'none' } })
            .to(chars, { yPercent: -100, autoAlpha: 0, stagger: 0.008, duration: 0.5 }, 0)
            .to(rest, { y: -20, autoAlpha: 0, duration: 0.35 }, 0.08)
            .to(buttons, { y: -16, autoAlpha: 0, duration: 0.35 }, 0.12)
            .to(mark, { y: 48, duration: 0.4 }, 0),
        });
      });
    }, el);

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
  }, [ready, reduce]);

  return (
    <section ref={root} className={s.hero} id="inicio" aria-label="Hero Sintropía">
      <p className={s.mark} aria-hidden>
        Sintropía
      </p>

      <h1 className={s.title}>
        <span className={s.setup}>
          {SETUP.map((line) => (
            <span className={s.line} key={line}>
              <span className={s.lineIn}>
                {line.split('').map((char, i) => (
                  <span className={s.char} key={`${line}-${i}`}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
        <span className={s.punch}>
          {PUNCH.map((line) => (
            <span className={s.line} key={line}>
              <span className={s.lineIn}>
                {line.split('').map((char, i) => (
                  <span className={s.char} key={`${line}-${i}`}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <div className={s.dock}>
        <p className={s.lead}>
          Nos sentamos con lo que traes, encontramos su fortaleza y lo
          construimos como si fuera nuestro. Web, app o un producto propio:
          sale del cuaderno y llega al mundo.
        </p>
        <div className={s.actions}>
          <a className={`${s.btn} ${s.primary}`} href="#contact">
            <span className={s.fill} aria-hidden />
            <span className={s.label}>
              <span>Escribirnos</span>
              <span>Empezar</span>
            </span>
            <Arrow />
          </a>
          <a className={`${s.btn} ${s.secondary}`} href="#projects">
            <span className={s.fill} aria-hidden />
            <span className={s.label}>
              <span>Ver el trabajo</span>
              <span>Entrar</span>
            </span>
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

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
