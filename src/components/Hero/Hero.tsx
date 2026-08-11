'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger);

type Props = { ready?: boolean };

const LINES = [
  { text: 'Tus ideas no se quedan', hot: false },
  { text: 'en el cuaderno:', hot: false },
  { text: 'salen al mundo', hot: true },
];

export default function Hero({ ready = true }: Props) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const giant = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;

    const q = gsap.utils.selector(el);
    const chars = q(`.${s.char}`);
    const bars = q(`.${s.bar}`);
    const rest = q(`.${s.meta}, .${s.lead}`);
    const buttons = q(`.${s.btn}`);

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const mobile = window.matchMedia('(max-width: 860px)').matches;

    if (reduce) {
      gsap.set([chars, rest, bars, buttons, giant.current], { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 130, rotateZ: mobile ? 0 : 8, autoAlpha: 0 });
      gsap.set(bars, { scaleX: 0 });
      gsap.set(rest, { autoAlpha: 0, y: 18 });
      gsap.set(buttons, { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.set(giant.current, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to(giant.current, { autoAlpha: 1, y: 0, duration: mobile ? 1.05 : 1.2, ease: 'power3.out' }, 0);
      tl.to(
        chars,
        {
          yPercent: 0,
          rotateZ: 0,
          autoAlpha: 1,
          duration: mobile ? 0.75 : 0.95,
          stagger: mobile ? 0.012 : 0.018,
          ease: 'power4.out',
        },
        0.1,
      );
      tl.to(bars, { scaleX: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, 0.08);
      tl.to(rest, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.35');
      tl.to(
        buttons,
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.6)' },
        '-=0.35',
      );

      gsap.to(giant.current, {
        y: 48,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to(q(`.${s.copy}`), {
        y: -56,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      });
    }, el);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      pointer.tx = (e.clientX - box.left) / box.width - 0.5;
      pointer.ty = (e.clientY - box.top) / box.height - 0.5;
    };

    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      raf = requestAnimationFrame(tick);
    };

    const onBtnMove = (e: PointerEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const box = btn.getBoundingClientRect();
      const x = ((e.clientX - box.left) / box.width - 0.5) * 18;
      const y = ((e.clientY - box.top) / box.height - 0.5) * 18;
      btn.style.setProperty('--mx', `${x}px`);
      btn.style.setProperty('--my', `${y}px`);
    };
    const onBtnLeave = (e: PointerEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    };

    if (!coarse) {
      el.addEventListener('pointermove', onMove, { passive: true });
      raf = requestAnimationFrame(tick);
      buttons.forEach((btn) => {
        btn.addEventListener('pointermove', onBtnMove);
        btn.addEventListener('pointerleave', onBtnLeave);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      buttons.forEach((btn) => {
        btn.removeEventListener('pointermove', onBtnMove);
        btn.removeEventListener('pointerleave', onBtnLeave);
      });
      ctx.revert();
    };
  }, [ready, reduce]);

  return (
    <section ref={root} className={s.hero} id="inicio" aria-label="Hero Sintropía">
      <p ref={giant} className={s.giant} aria-hidden>
        Sintropía
      </p>

      <div className={s.copy}>
        <div className={s.meta}>
          <span className={s.swatch} aria-hidden>
            <i className={s.bar} />
            <i className={s.bar} />
            <i className={s.bar} />
            <i className={s.bar} />
          </span>
          <span>Agencia digital</span>
        </div>

        <h1 className={s.title}>
          {LINES.map((line) => (
            <span className={s.line} key={line.text}>
              <span className={s.lineIn}>
                <span className={`${s.word} ${line.hot ? s.hot : ''}`}>
                  {line.text.split('').map((char, i) => (
                    <span className={s.char} key={`${line.text}-${i}`}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          ))}
        </h1>

        <p className={s.lead}>
          Diseño, arquitectura, desarrollo y lanzamiento. Nos sentamos con lo
          que traes, encontramos su fortaleza y lo construimos como si fuera
          nuestro: web, app o un producto propio. Sin plantillas. Sin recortar
          la imaginación.
        </p>

        <div className={s.actions}>
          <a className={`${s.btn} ${s.primary}`} href="#contact">
            <span className={s.fill} aria-hidden />
            <span className={s.label}>
              <span>Escribirnos</span>
              <span>Empezar</span>
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
          <a className={`${s.btn} ${s.secondary}`} href="#projects">
            <span className={s.fill} aria-hidden />
            <span className={s.label}>
              <span>Ver el trabajo</span>
              <span>Entrar</span>
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
        </div>
      </div>
    </section>
  );
}
