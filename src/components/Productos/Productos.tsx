'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { hide, playIn } from '@/motion/reveal';
import s from './Productos.module.scss';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'neurona',
    tab: 'Neurona',
    kind: 'Validador · Neurona Digital',
    title: 'Neurona',
    colossus: 'Neurona',
    text: [
      'Se instala para validar información: redacción, lenguaje de un texto o los criterios que un video tiene que cumplir. Tú los defines.',
      'Neurona revisa cada archivo contra esos criterios y te muestra el resultado: si cumple, queda. Si no, se ve en claro.',
    ],
  },
  {
    id: 'ligas',
    tab: 'Once',
    kind: 'App · ligas deportivas',
    title: 'Once',
    colossus: 'Once',
    text: [
      'Una app para seguir ligas. Registras la tuya —femenil, varonil o la que sea—; no está limitada a un deporte.',
      'Tabla de posiciones, próximos partidos, cómo quedó el juego, noticias, ficha del jugador y estadísticas. Todo el seguimiento, en el teléfono.',
    ],
  },
  {
    id: 'cotizador',
    tab: 'Cotizador',
    kind: 'IA · se adapta a tu negocio',
    title: 'Cotizador',
    colossus: 'Cotiza',
    text: [
      'Se integra una vez a tu negocio, sin importar el giro. Con inteligencia artificial, aprende cómo cotizas tú: qué concepto pesa más, cómo ajustas, cómo entregas. No es un formato genérico con campos de más.',
      'De ahí el usuario genera sus cotizaciones. Las invoca como reporte, documento, empaque o seguro: el modo que necesita, no el que le tocó.',
    ],
  },
] as const;

function Btn() {
  return (
    <a className={`${s.btn} cursor-hover`} href="#contacto">
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>Comprar</span>
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

function Neurona() {
  return (
    <div className={`${s.object} ${s.neurona}`} aria-hidden>
      <div className={s.pad}>
        <div className={s.padFace}>
          <div className={s.padStatus}>
            <b>9:41</b>
            <i />
            <em />
          </div>
          <div className={s.nApp}>
            <header>
              <small>Neurona</small>
              <em>configurado</em>
            </header>
            <div className={s.shots}>
              <span data-on="1" className={s.wave}>
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span data-on="1" className={s.clip} />
              <span>Aa</span>
            </div>
            <p className={s.shotNote}>Criterios · resultado</p>
            <ul>
              <li data-ok="1">
                <div>
                  <b>Texto</b>
                  <p>redacción · lenguaje</p>
                </div>
                <span>cumple</span>
              </li>
              <li data-ok="1">
                <div>
                  <b>Video</b>
                  <p>criterios definidos</p>
                </div>
                <span>cumple</span>
              </li>
              <li data-ok="0">
                <div>
                  <b>Audio</b>
                  <p>calidad · claridad</p>
                </div>
                <span>revisar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ligas() {
  return (
    <div className={`${s.object} ${s.ligas}`} aria-hidden>
      <div className={s.handset}>
        <div className={s.screen}>
          <div className={s.status}>
            <b>9:41</b>
            <i />
            <em />
          </div>
          <header>
            <span>ZN</span>
            <div>
              <small>Inicio</small>
              <b>Zona norte</b>
            </div>
            <em>Varonil</em>
          </header>
          <div className={s.last}>
            <small>último partido</small>
            <div>
              <b>Norte</b>
              <strong>2–1</strong>
              <b>Sur</b>
            </div>
            <p>Cómo quedó · jornada 14</p>
          </div>
          <div className={s.next}>
            <small>próximo</small>
            <b>Norte vs Centro</b>
            <p>domingo 18:00</p>
          </div>
          <ol>
            <li>
              <em>1</em>
              Norte
              <span>21</span>
            </li>
            <li>
              <em>2</em>
              Sur
              <span>18</span>
            </li>
            <li>
              <em>3</em>
              Centro
              <span>14</span>
            </li>
          </ol>
          <div className={s.news}>
            <small>noticias</small>
            <p>Rosa H. encabeza goleo de la femenil</p>
          </div>
          <nav>
            <i>Inicio</i>
            <i>Tabla</i>
            <i>Jugador</i>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Cotiza({ quote }: { quote: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <div className={`${s.object} ${s.cotiza}`} aria-hidden>
      <div className={s.engine}>
        <header>
          <small>Cotizador</small>
          <em>integrado</em>
        </header>
        <p className={s.once}>Una vez a tu negocio. Luego se invoca.</p>
        <ul className={s.modes}>
          <li data-on="1">Documento</li>
          <li>Reporte</li>
          <li>Empaque</li>
          <li>Seguro</li>
        </ul>
        <div className={s.doc}>
          <small>cotización · documento</small>
          <ul>
            <li>
              <span>Concepto</span>
              <b>$8,400</b>
            </li>
            <li>
              <span>Ajuste</span>
              <b>$4,200</b>
            </li>
            <li>
              <span>Entrega</span>
              <b>$5,820</b>
            </li>
          </ul>
          <p className={s.total}>
            $<span ref={quote}>0</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Productos() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
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
    const panels = Array.from(el.querySelectorAll<HTMLElement>(`.${s.panel}`));

    const size = () => {
      // Prefer viewport width: pin can make el.clientWidth collapse/wrong.
      const w = Math.max(1, Math.round(window.innerWidth));
      el.style.setProperty('--sw', `${w}px`);
      return w;
    };

    const apply = (progress: number) => {
      const last = products.length - 1;
      const clamped = Math.min(1, Math.max(0, progress));
      const i = Math.round(clamped * last);
      setActive((cur) => (cur === i ? cur : i));
      ink.current?.style.setProperty('--p', `${clamped}`);
      if (quote.current) {
        quote.current.textContent = Math.round(8400 + clamped * 10020).toLocaleString('es-MX');
      }
      panels.forEach((panel, idx) => {
        const d = idx - clamped * last;
        const abs = Math.abs(d);
        panel.style.setProperty('--d', `${d}`);
        panel.style.setProperty('--abs', `${abs}`);
        panel.toggleAttribute('data-active', idx === i);
        panel.setAttribute('aria-hidden', idx === i ? 'false' : 'true');
      });
    };

    size();
    let resizeTimer = 0;
    const onResize = () => {
      size();
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        const st = trigger.current;
        if (st) apply(st.progress);
      }, 120);
    };
    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);

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

      if (!reduce) {
        const targets = q(`.${s.chrome}, .${s.copy}`);
        hide(targets);
        const reveal = () => playIn(targets);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          onEnter: reveal,
          onEnterBack: reveal,
        });
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) reveal();
      }

      if (!reduce) {
        const shift = () => {
          size();
          return Math.max(rail.scrollWidth - window.innerWidth, 0);
        };

        const tween = gsap.to(rail, {
          x: () => -shift(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${Math.max(shift() * 1.45, window.innerHeight * 2.2)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            snap: {
              snapTo: 1 / (products.length - 1),
              duration: { min: 0.12, max: 0.35 },
              ease: 'power1.inOut',
              delay: 0.02,
            },
            onRefreshInit: () => {
              size();
              gsap.set(rail, { x: 0 });
            },
            onRefresh: (self) => {
              size();
              const spacer = self.pin?.parentElement;
              if (spacer) {
                spacer.style.width = '100%';
                spacer.style.maxWidth = '100%';
                spacer.style.overflow = 'hidden';
              }
              if (self.pin) {
                (self.pin as HTMLElement).style.width = '100%';
                (self.pin as HTMLElement).style.maxWidth = '100%';
                (self.pin as HTMLElement).style.left = '0';
              }
              apply(self.progress);
            },
            onUpdate: (self) => apply(self.progress),
            onEnter: (self) => {
              size();
              apply(self.progress);
            },
            onEnterBack: (self) => {
              size();
              apply(self.progress);
            },
          },
        });
        trigger.current = tween.scrollTrigger ?? null;
        apply(0);
        requestAnimationFrame(() => {
          size();
          ScrollTrigger.refresh();
        });
      } else {
        apply(0);
      }
    }, el);

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
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      buttons.forEach((btn) => {
        btn.removeEventListener('pointermove', onBtnMove);
        btn.removeEventListener('pointerleave', onBtnLeave);
      });
      gsap.set(rail, { clearProps: 'transform' });
      ctx.revert();
    };
  }, [reduce]);

  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (i / (products.length - 1));
    if (lenis) lenis.scrollTo(y, { duration: 1.05 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section ref={root} className={s.wrap} id="productos" aria-label="Productos">
      <div ref={paint} className={s.paint} aria-hidden />
      <span ref={ink} className={s.ink} aria-hidden />

      <div className={s.chrome}>
        <div className={s.head}>
          <p className={s.index}>05</p>
          <div>
            <h2 className={s.title}>Productos</h2>
            <p className={s.lead}>Tres productos. Se venden. Se instalan.</p>
          </div>
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
              0{i + 1} {p.tab}
            </button>
          ))}
        </div>
      </div>

      <div className={s.stage}>
        <div ref={track} className={s.track}>
          {products.map((p) => (
            <article key={p.id} className={s.panel} data-id={p.id}>
              <p className={s.colossus} aria-hidden>
                {p.colossus}
              </p>

              <div className={s.body}>
                <div className={s.copy}>
                  <p className={s.kind}>{p.kind}</p>
                  <h3>{p.title}</h3>
                  {p.text.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <Btn />
                </div>

                {p.id === 'neurona' && <Neurona />}
                {p.id === 'ligas' && <Ligas />}
                {p.id === 'cotizador' && <Cotiza quote={quote} />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
