'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindReveal } from '@/motion/reveal';
import s from './Productos.module.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'neurona',
    kind: 'Primer producto',
    title: 'Neurona Digital',
    colossus: 'Neurona',
    text: [
      'Es una capa. Lee lo que ya está: texto escrito, voz y video. No lo adorna. Lo reconoce.',
      'Su cualidad no es verse moderna. Es dejar constancia: que eso se dijo, se escribió o se grabó, y que se puede validar. Validez digital.',
    ],
  },
  {
    id: 'ligas',
    kind: 'App · sistema móvil',
    title: 'Ligas',
    colossus: 'Ligas',
    text: [
      'Una aplicación de fútbol para que las zonas registren sus ligas y las corran desde el teléfono.',
      'Resultados, jornadas, jugadores: lo que pasa en la cancha, a la vista. Un sistema para operar el torneo, no para presumirlo.',
    ],
  },
  {
    id: 'cotizador',
    kind: 'Producto',
    title: 'Cotizador',
    colossus: 'Cotiza',
    text: [
      'Un cotizador que se renta. Armas las reglas de tu negocio: qué se cobra, cómo se arma el precio.',
      'El cliente pide. Sale un número. Sin perseguir cotizaciones en chats ni rehacer la misma cuenta cada vez.',
    ],
  },
];

function Btn() {
  return (
    <a className={`${s.btn} cursor-hover`} href="#contact">
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>Rentar</span>
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
    </a>
  );
}

export default function Productos() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLSpanElement>(null);
  const quote = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    const rail = track.current;
    if (!el || !rail) return;

    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const native = Boolean(reduce) || coarse || window.matchMedia('(max-width: 860px)').matches;
    const panels = Array.from(el.querySelectorAll<HTMLElement>(`.${s.panel}`));
    const size = () => {
      el.style.setProperty('--sw', `${el.clientWidth}px`);
    };
    size();
    window.addEventListener('resize', size);

    const apply = (progress: number) => {
      const last = products.length - 1;
      const i = Math.round(progress * last);
      setActive((cur) => (cur === i ? cur : i));
      ink.current?.style.setProperty('--p', `${progress}`);
      if (quote.current) {
        quote.current.textContent = Math.round(progress * 18420).toLocaleString('es-MX');
      }
      panels.forEach((panel, idx) => {
        const d = idx - progress * last;
        panel.style.setProperty('--d', `${d}`);
        panel.style.setProperty('--abs', `${Math.abs(d)}`);
      });
    };

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

      bindReveal(el, q(`.${s.chrome}, .${s.copy}`));

      if (!native) {
        const shift = () => rail.scrollWidth - el.clientWidth;
        const tween = gsap.to(rail, {
          x: () => -shift(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${shift() * 1.35}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              const spacer = self.pin?.parentElement;
              if (spacer) {
                spacer.style.width = '100%';
                spacer.style.maxWidth = '100%';
                spacer.style.overflow = 'hidden';
              }
            },
            onUpdate: (self) => apply(self.progress),
          },
        });
        trigger.current = tween.scrollTrigger ?? null;
        apply(0);
      }
    }, el);

    let onRailScroll: (() => void) | undefined;
    if (native) {
      el.classList.add(s.swipe);
      onRailScroll = () => {
        const max = Math.max(rail.scrollWidth - rail.clientWidth, 1);
        apply(rail.scrollLeft / max);
      };
      rail.addEventListener('scroll', onRailScroll, { passive: true });
      apply(0);
    }

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
      trigger.current = null;
      window.removeEventListener('resize', size);
      if (onRailScroll) rail.removeEventListener('scroll', onRailScroll);
      buttons.forEach((btn) => {
        btn.removeEventListener('pointermove', onBtnMove);
        btn.removeEventListener('pointerleave', onBtnLeave);
      });
      ctx.revert();
    };
  }, [reduce]);

  const goTo = (i: number) => {
    const el = root.current;
    const rail = track.current;
    if (!el || !rail) return;

    if (el.classList.contains(s.swipe)) {
      rail.scrollTo({ left: i * rail.clientWidth, behavior: 'smooth' });
      return;
    }

    const st = trigger.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (i / (products.length - 1));
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section ref={root} className={s.wrap} id="productos" aria-label="Productos">
      <div ref={paint} className={s.paint} aria-hidden />
      <span ref={ink} className={s.ink} aria-hidden />

      <div className={s.chrome}>
        <div>
          <p className={s.index}>Productos</p>
          <p className={s.line}>Lo que ya existe. Lo rentas.</p>
        </div>
        <div className={s.dots} role="tablist" aria-label="Productos">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`${s.dot} ${active === i ? s.on : ''} cursor-hover`}
              onClick={() => goTo(i)}
            >
              0{i + 1} {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className={s.stage}>
        <div ref={track} className={s.track}>
          {products.map((p) => (
            <article key={p.id} className={s.panel}>
              <p className={s.colossus} aria-hidden>
                {p.colossus}
              </p>

              {p.id === 'neurona' && (
                <div className={s.fx} aria-hidden>
                  <p className={s.validez}>VALIDEZ</p>
                </div>
              )}
              {p.id === 'ligas' && (
                <div className={s.fx} aria-hidden>
                  <p className={s.score}>
                    2<span>—</span>1
                  </p>
                  <p className={s.jornada}>Jornada 14 · Zona norte</p>
                </div>
              )}
              {p.id === 'cotizador' && (
                <div className={s.fx} aria-hidden>
                  <p className={s.quote}>
                    $<span ref={quote}>0</span>
                  </p>
                </div>
              )}

              <div className={s.copy}>
                <p className={s.kind}>{p.kind}</p>
                <h2>{p.title}</h2>
                {p.text.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <Btn />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
