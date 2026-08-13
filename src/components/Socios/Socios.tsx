'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hide, playIn } from '@/motion/reveal';
import { callStatus } from '@/config/ventures';
import { rememberReturn } from '@/components/providers/ScrollToHash';
import s from './Socios.module.scss';

gsap.registerPlugin(ScrollTrigger);

function Btn({
  href,
  variant,
  now,
  next,
  onClick,
}: {
  href: string;
  variant: 'primary' | 'secondary';
  now: string;
  next: string;
  onClick?: () => void;
}) {
  return (
    <Link className={`${s.btn} ${s[variant]} cursor-hover`} href={href} onClick={onClick}>
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
    </Link>
  );
}

export default function Socios() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const status = callStatus();

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

      const targets = q(`.${s.head}, .${s.copy} > *, .${s.step}`);
      hide(targets);
      const reveal = () => playIn(targets);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        onEnter: reveal,
        onEnterBack: reveal,
      });
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) reveal();

      const spine = q(`.${s.spine}`);
      if (spine.length) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: q(`.${s.stepsWrap}`)[0] as Element,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 0.5,
            },
          },
        );
      }
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
        <div className={s.head}>
          <p className={s.index}>06</p>
          <div className={s.headCopy}>
            <h2 className={s.title}>Socios</h2>
            <p className={s.lead}>{status.lead}</p>
          </div>
        </div>

        <div className={s.body}>
          <div className={s.copy}>
            <p className={`${s.badge} ${status.open ? s.open : s.closed}`}>{status.badge}</p>
            <h3 className={s.headline} data-nosplit="1">
              <span>Escuchamos tu idea.</span>
              <span className={s.punch}>Apostamos por ella.</span>
            </h3>
            <p>
              Cuando un proyecto nos convence, entramos como socios: desarrollo, diseño,
              estrategia y mentoría a cambio de equity. No es un servicio que se cotiza.
            </p>
            <p>{status.note}</p>
            <div className={s.actions}>
              <Btn
                href="/ventures"
                variant="primary"
                now="Saber más"
                next="Conocer más"
                onClick={() => rememberReturn('#socios')}
              />
              <Btn
                href={status.cta.href}
                variant="secondary"
                now={status.cta.now}
                next={status.cta.next}
              />
            </div>
          </div>

          <div className={s.stepsWrap}>
            <span className={s.spine} aria-hidden />
            <ol className={s.steps}>
              <li className={s.step}>
                <span className={s.num}>01</span>
                <div>
                  <h4>Aplicas</h4>
                  <p>Nos cuentas el problema, para quién y por qué tiene potencial.</p>
                </div>
              </li>
              <li className={s.step}>
                <span className={s.num}>02</span>
                <div>
                  <h4>Evaluamos</h4>
                  <p>Mercado, acceso a clientes, viabilidad y forma de generar ingresos.</p>
                </div>
              </li>
              <li className={s.step}>
                <span className={s.num}>03</span>
                <div>
                  <h4>Construimos</h4>
                  <p>Si entra, definimos equity, armamos el plan y nos ponemos a construir.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
