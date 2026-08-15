'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hide, playIn } from '@/motion/reveal';
import s from './Contacto.module.scss';

gsap.registerPlugin(ScrollTrigger);

const MAIL = 'hola@sintropia-dev.com';

const phones = [
  { label: '722 606 8056', tel: '+527226068056', wa: '527226068056' },
  { label: '729 232 4754', tel: '+527292324754', wa: '527292324754' },
] as const;

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
  variant: 'void' | 'white';
  now: string;
  next: string;
}) {
  return (
    <a
      className={`${s.btn} ${s[variant]} cursor-hover`}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>{now}</span>
        <span>{next}</span>
      </span>
      <Arrow />
    </a>
  );
}

export default function Contacto() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);

  const waHref = `https://wa.me/${phones[0].wa}?text=${encodeURIComponent(
    'Hola Sintropía, quiero platicar de un proyecto.',
  )}`;

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
              end: 'top 18%',
              scrub: 0.55,
            },
          },
        );
      }

      const bits = q(`.${s.head}, .${s.headline}, .${s.lead}, .${s.hit}, .${s.actions}`);
      hide(bits);
      const reveal = () => playIn(bits);
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
    <section ref={root} className={s.wrap} id="contacto" aria-label="Contacto">
      <div ref={paint} className={s.paint} aria-hidden />
      <p className={s.ghost} aria-hidden>
        Hola
      </p>

      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.index}>08</p>
          <div className={s.headCopy}>
            <h2 className={s.title}>Contacto</h2>
            <p className={s.meta}>WhatsApp · correo</p>
          </div>
        </div>

        <div className={s.body}>
          <div className={s.dial}>
            {phones.map((phone, i) => (
              <a
                key={phone.wa}
                className={`${s.hit} cursor-hover`}
                href={`https://wa.me/${phone.wa}?text=${encodeURIComponent(
                  'Hola Sintropía, quiero platicar de un proyecto.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>0{i + 1}</span>
                <div>
                  <b>{phone.label}</b>
                  <em>WhatsApp</em>
                </div>
              </a>
            ))}
            <a className={`${s.hit} cursor-hover`} href={`mailto:${MAIL}`}>
              <span>Mail</span>
              <div>
                <b>{MAIL}</b>
                <em>Escribir</em>
              </div>
            </a>
          </div>

          <div className={s.copy}>
            <h3 className={s.headline} data-nosplit="1">
              <span>Cuéntanos qué traes.</span>
              <span className={s.punch}>Nos sentamos.</span>
            </h3>
            <p className={s.lead}>
              Escríbenos o mándanos un WhatsApp. Si quieres cotizar, el botón Cotizar
              está siempre a la mano.
            </p>
            <div className={s.actions}>
              <Btn href={waHref} variant="void" now="WhatsApp" next="Abrir chat" />
              <Btn href={`mailto:${MAIL}`} variant="white" now="Correo" next="Escribir" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
