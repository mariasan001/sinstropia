'use client';

import Link from 'next/link';
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
      'Se ajusta a todo tipo de negocio. Con IA facilita la conversación con tus clientes sobre lo que necesitan y acomoda la cotización a su caso.',
      'Cotizas, generas formatos, das seguimiento y tienes un sitio para tus clientes. No es un formato genérico: es el modo en que ustedes trabajan.',
    ],
  },
  {
    id: 'facturado',
    tab: 'Facturado',
    kind: 'Muy pronto · facturación',
    title: 'Facturado fiscal',
    colossus: 'Fiscal',
    text: [
      'Muy pronto podrás tener facturación en tu operación: emitir CFDI, llevar clientes y el control fiscal sin pelear con el portal.',
      'Facturado fiscal es eso —el producto que te ayuda a facturar. Aún no se vende; cuando salga, se instala a tu negocio.',
    ],
  },
] as const;

/** Sitio de Once (externo). Cuando exista, define las URLs en .env */
const ONCE_CONOCER_URL = process.env.NEXT_PUBLIC_ONCE_URL ?? '';
const ONCE_RENTAR_URL = process.env.NEXT_PUBLIC_ONCE_RENT_URL ?? '';

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

function Actions({ id }: { id: (typeof products)[number]['id'] }) {
  if (id === 'neurona') {
    return (
      <div className={s.actions}>
        <Link className={`${s.btn} ${s.ghost} cursor-hover`} href="/neurona">
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Conocer más</span>
            <span>Entrar</span>
          </span>
          <Arrow />
        </Link>
        <Link className={`${s.btn} cursor-hover`} href="/neurona#adquirir">
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Adquirir</span>
            <span>Empezar</span>
          </span>
          <Arrow />
        </Link>
      </div>
    );
  }

  if (id === 'ligas') {
    return (
      <div className={s.actions}>
        <a
          className={`${s.btn} ${s.ghost} cursor-hover`}
          href={ONCE_CONOCER_URL || undefined}
          aria-disabled={!ONCE_CONOCER_URL}
          target={ONCE_CONOCER_URL ? '_blank' : undefined}
          rel={ONCE_CONOCER_URL ? 'noopener noreferrer' : undefined}
          onClick={!ONCE_CONOCER_URL ? (e) => e.preventDefault() : undefined}
        >
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Conocer más</span>
            <span>Entrar</span>
          </span>
          <Arrow />
        </a>
        <a
          className={`${s.btn} cursor-hover`}
          href={ONCE_RENTAR_URL || undefined}
          aria-disabled={!ONCE_RENTAR_URL}
          target={ONCE_RENTAR_URL ? '_blank' : undefined}
          rel={ONCE_RENTAR_URL ? 'noopener noreferrer' : undefined}
          onClick={!ONCE_RENTAR_URL ? (e) => e.preventDefault() : undefined}
        >
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Adquirir</span>
            <span>Empezar</span>
          </span>
          <Arrow />
        </a>
      </div>
    );
  }

  if (id === 'cotizador') {
    return (
      <div className={s.actions}>
        <Link className={`${s.btn} ${s.ghost} cursor-hover`} href="/cotizador">
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Saber más</span>
            <span>Entrar</span>
          </span>
          <Arrow />
        </Link>
        <Link className={`${s.btn} cursor-hover`} href="/cotizador#adquirir">
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Adquirir</span>
            <span>Empezar</span>
          </span>
          <Arrow />
        </Link>
      </div>
    );
  }

  if (id === 'facturado') {
    return (
      <div className={s.actions}>
        <span className={`${s.btn} ${s.soon}`} aria-disabled="true">
          <span className={s.label}>
            <span>Próximamente</span>
            <span>En camino</span>
          </span>
        </span>
        <a className={`${s.btn} ${s.ghost} cursor-hover`} href="#contacto">
          <span className={s.fill} aria-hidden />
          <span className={s.label}>
            <span>Avisarme</span>
            <span>Escribir</span>
          </span>
          <Arrow />
        </a>
      </div>
    );
  }

  return (
    <a className={`${s.btn} cursor-hover`} href="#contacto">
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>Escribirnos</span>
        <span>Empezar</span>
      </span>
      <Arrow />
    </a>
  );
}

function Neurona() {
  return (
    <div className={`${s.object} ${s.neurona}`} aria-hidden>
      <div className={s.nStage}>
        <div className={s.nChip}>
          <span>Reglas</span>
          <b>Ortografía · tono · criterios</b>
        </div>

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
                <em>validando</em>
              </header>

              <div className={s.nKinds}>
                <span data-on="1">Texto</span>
                <span data-on="1">Video</span>
                <span>Audio</span>
              </div>

              <div className={s.nPreview}>
                <div className={s.nDoc}>
                  <i />
                  <i />
                  <i />
                  <b>brief_cliente.txt</b>
                </div>
                <div className={s.nScan}>
                  <span />
                </div>
              </div>

              <p className={s.shotNote}>Criterios · resultado</p>
              <ul>
                <li data-ok="1">
                  <div>
                    <b>Ortografía</b>
                    <p>redacción limpia</p>
                  </div>
                  <span>cumple</span>
                </li>
                <li data-ok="1">
                  <div>
                    <b>Reacción</b>
                    <p>tono de marca</p>
                  </div>
                  <span>cumple</span>
                </li>
                <li data-ok="0">
                  <div>
                    <b>Criterios</b>
                    <p>video · duración</p>
                  </div>
                  <span>revisar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ligas() {
  return (
    <div className={`${s.object} ${s.ligas}`} aria-hidden>
      <div className={s.oStage}>
        <div className={s.oFloat}>
          <small>Jugador</small>
          <b>Rosa H.</b>
          <div>
            <span>12 goles</span>
            <em>Femenil</em>
          </div>
        </div>

        <div className={s.handset}>
          <div className={s.screen}>
            <div className={s.status}>
              <b>9:41</b>
              <i />
              <em />
            </div>

            <header>
              <span>ON</span>
              <div>
                <small>Once</small>
                <b>Zona norte</b>
              </div>
              <em>Varonil</em>
            </header>

            <div className={s.oLive}>
              <div className={s.oLiveTop}>
                <small>En vivo · J14</small>
                <i>45'</i>
              </div>
              <div className={s.oScore}>
                <div>
                  <b>Norte</b>
                  <span>local</span>
                </div>
                <strong>2–1</strong>
                <div>
                  <b>Sur</b>
                  <span>visita</span>
                </div>
              </div>
              <p>Cómo quedó · actualización al minuto</p>
            </div>

            <div className={s.next}>
              <small>próximo</small>
              <div>
                <b>Norte vs Centro</b>
                <span>dom 18:00</span>
              </div>
            </div>

            <div className={s.oTable}>
              <small>tabla</small>
              <ol>
                <li data-on="1">
                  <em>1</em>
                  <b>Norte</b>
                  <span>21</span>
                </li>
                <li>
                  <em>2</em>
                  <b>Sur</b>
                  <span>18</span>
                </li>
                <li>
                  <em>3</em>
                  <b>Centro</b>
                  <span>14</span>
                </li>
              </ol>
            </div>

            <nav>
              <i data-on="1">Inicio</i>
              <i>Tabla</i>
              <i>Stats</i>
              <i>Más</i>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cotiza({ quote }: { quote: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <div className={`${s.object} ${s.cotiza}`} aria-hidden>
      <div className={s.cStage}>
        <div className={s.cFloat}>
          <small>IA</small>
          <b>¿Qué necesita el cliente?</b>
          <p>Ajustando la propuesta…</p>
        </div>

        <div className={s.engine}>
          <header>
            <small>Cotizador</small>
            <em>integrado</em>
          </header>

          <div className={s.cTabs}>
            <span data-on="1">Documento</span>
            <span>Reporte</span>
            <span>Empaque</span>
            <span>Seguro</span>
          </div>

          <div className={s.cChat}>
            <i />
            <div>
              <b>Conversación</b>
              <p>Concepto + ajuste + entrega</p>
            </div>
            <em>IA</em>
          </div>

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

          <div className={s.cTrack}>
            <span data-on="1">Enviada</span>
            <span>Pendiente</span>
            <span>Cerrada</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Facturado() {
  return (
    <div className={`${s.object} ${s.facturado}`} aria-hidden>
      <div className={s.fiscalStage}>
        <div className={s.paper}>
          <div className={s.paperTop}>
            <b>CFDI</b>
            <span>Ingreso</span>
          </div>
          <div className={s.paperGrid}>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={s.paperRows}>
            <span />
            <span />
            <span />
          </div>
          <div className={s.qr} />
        </div>

        <div className={s.fiscalApp}>
          <div className={s.fiscalBar}>
            <small>Facturado</small>
            <em>próximamente</em>
          </div>

          <div className={s.fiscalTabs}>
            <span data-on="1">Emitir</span>
            <span>Clientes</span>
            <span>Control</span>
          </div>

          <div className={s.fiscalHero}>
            <p>Nueva factura</p>
            <b>$14,848.00</b>
            <div className={s.fiscalMeta}>
              <span>IVA 16%</span>
              <span>PUE</span>
              <span>G03</span>
            </div>
          </div>

          <ul className={s.fiscalList}>
            <li>
              <div>
                <b>Servicios digitales</b>
                <p>RFC · SINT801010XXX</p>
              </div>
              <em data-ok="1">Timbrada</em>
            </li>
            <li>
              <div>
                <b>Consultoría</b>
                <p>RFC · DEMO010101XXX</p>
              </div>
              <em>Borrador</em>
            </li>
            <li>
              <div>
                <b>Mantenimiento</b>
                <p>UUID · pendiente</p>
              </div>
              <em data-ok="1">Timbrada</em>
            </li>
          </ul>

          <div className={s.fiscalCta}>
            <span>Emitir CFDI</span>
            <i>Muy pronto</i>
          </div>
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

        const steps = products.length - 1;
        let scrollDir = 1;

        const tween = gsap.to(rail, {
          x: () => -shift(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            // Más recorrido por panel = menos pelea entre snap y el siguiente
            end: () =>
              `+=${Math.max(shift() * 1.9, window.innerHeight * Math.max(2.8, products.length * 0.95))}`,
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            snap: {
              snapTo: (value) => {
                const raw = value * steps;
                const frac = raw - Math.floor(raw);
                // Al ir adelante, pasa al siguiente más temprano; al volver, suelta más tarde
                let idx: number;
                if (scrollDir >= 0) {
                  idx = frac > 0.3 ? Math.ceil(raw) : Math.floor(raw);
                } else {
                  idx = frac < 0.7 ? Math.floor(raw) : Math.ceil(raw);
                }
                return Math.min(steps, Math.max(0, idx)) / steps;
              },
              duration: { min: 0.18, max: 0.45 },
              delay: 0.14,
              ease: 'power1.out',
              inertia: false,
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
            onUpdate: (self) => {
              scrollDir = self.direction;
              apply(self.progress);
            },
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
            <p className={s.lead}>Se venden. Se instalan. Uno viene en camino.</p>
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
                  <Actions id={p.id} />
                </div>

                {p.id === 'neurona' && <Neurona />}
                {p.id === 'ligas' && <Ligas />}
                {p.id === 'cotizador' && <Cotiza quote={quote} />}
                {p.id === 'facturado' && <Facturado />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
