'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { bindReveal } from '@/motion/reveal';
import s from './Work.module.scss';

gsap.registerPlugin(ScrollTrigger);

const pieces = [
  {
    id: '01',
    kind: 'App interna',
    title: 'Credibringe',
    for: 'Empresa que presta dinero',
    does: 'Cartera, cobro y acceso para sus clientes',
    note: 'El equipo opera los préstamos. Quien debe también entra a ver su cuenta.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        text: 'Tenían que controlar los préstamos de la empresa. El dinero se seguía en cuentas sueltas. Pedían un sistema de todos los días, no un Excel más.',
      },
      {
        step: '02',
        title: 'El boceto',
        text: 'Dos puertas: el equipo opera adentro y quien debe entra a ver su cuenta. Cartera, cobro y cierre en el mismo lugar.',
        sketch: 'split',
      },
      {
        step: '03',
        title: 'Cómo se armó',
        text: 'Se construyó a cómo ellos cobran y cierran. Altas, saldos, seguimiento. El cliente consulta lo suyo sin llamar a la oficina.',
        sketch: 'list',
      },
      {
        step: '04',
        title: 'Lo que quedó',
        text: 'Hoy el equipo carga y sigue préstamos. Quien debe ve su cuenta. Hecho para esa operación, no al revés.',
      },
    ],
  },
  {
    id: '02',
    kind: 'Sistema escolar',
    title: 'USYC',
    for: 'Administración de una escuela',
    does: 'Caja, adeudos, reportes y comprobantes',
    note: 'Qué entró, qué se debe y el comprobante para quien pagó.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        text: 'La escuela perseguía colegiaturas en papeles. No veían claro qué había entrado, qué se debía y quién ya había pagado.',
      },
      {
        step: '02',
        title: 'El boceto',
        text: 'Una caja: adeudo, pago, reporte y comprobante. La administración de un lado; quien paga, del otro.',
        sketch: 'sheet',
      },
      {
        step: '03',
        title: 'Cómo se armó',
        text: 'Se armó lo que entra, lo que se debe y lo que ya se liquidó. Reportes para ver. Comprobante para llevarse.',
        sketch: 'list',
      },
      {
        step: '04',
        title: 'Lo que quedó',
        text: 'La administración saca reportes. Quien paga se lleva comprobante. El dinero ya no se busca en papeles sueltos.',
      },
    ],
  },
  {
    id: '03',
    kind: 'Sistema · Sitio',
    title: 'Dabook',
    status: 'Próximo lanzamiento',
    for: 'Artistas que venden su trabajo',
    does: 'Cursos, producto físico y digital en un solo lugar',
    note: 'Venden, cobran y publican de nuevo sin armar otra tienda.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        text: 'Un artista no puede tener una tienda por el curso, otra por lo físico y otra por el archivo. Pedían un solo lugar para vender y volver a publicar.',
      },
      {
        step: '02',
        title: 'El boceto',
        text: 'Vitrina, curso, pedido y publicar. Piezas distintas, un mismo sistema. Sin empezar de cero cada vez.',
        sketch: 'cards',
      },
      {
        step: '03',
        title: 'Cómo se armó',
        text: 'Se juntó físico, digital y curso. El más grande que hemos hecho. Sigue creciendo mientras se termina.',
        sketch: 'split',
      },
      {
        step: '04',
        title: 'Lo que quedó',
        text: 'Está por salir. El artista vende, cobra y republica. Después del lanzamiento el sistema no se abandona: se le siguen sumando piezas.',
      },
    ],
  },
  {
    id: '04',
    kind: 'Sitio · Sistema',
    title: 'Gym',
    status: 'En desarrollo',
    for: 'Gimnasio: recepción y quien entrena',
    does: 'Sitio público, membresías y quién está activo',
    note: 'Afuera se informan. Adentro se cobra y se ve quién entra.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        text: 'El gimnasio necesitaba una cara para quien llega de afuera y un control para recepción: planes, cobro y quién está activo.',
      },
      {
        step: '02',
        title: 'El boceto',
        text: 'Dos caras. Sitio: horarios, planes, cómo inscribirse. Adentro: membresía y quién entra.',
        sketch: 'split',
      },
      {
        step: '03',
        title: 'Cómo se arma',
        text: 'Sitio y operación se están construyendo juntos. No primero la vitrina y después el sistema.',
        sketch: 'sheet',
      },
      {
        step: '04',
        title: 'Dónde va',
        text: 'Sigue en el taller. Afuera se van a informar. Adentro se va a cobrar y a ver quién entra.',
      },
    ],
  },
];

function Go({ onClick, rise }: { onClick: () => void; rise?: boolean }) {
  return (
    <button type="button" className={`${s.btn} ${s.primary} ${rise ? s.rise : ''} cursor-hover`} onClick={onClick}>
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>Ver cómo se formó</span>
        <span>Abrir</span>
      </span>
      <span className={s.arrow} aria-hidden>
        <i>
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
        <b>
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </b>
      </span>
    </button>
  );
}

function Sketch({ kind }: { kind: string }) {
  return (
    <svg className={s.draw} viewBox="0 0 160 200" fill="none" aria-hidden>
      <rect x="8" y="8" width="144" height="184" rx="4" stroke="currentColor" strokeWidth="1.2" />
      {kind === 'list' ? (
        <>
          <rect x="20" y="24" width="72" height="8" rx="1" fill="currentColor" opacity="0.35" />
          <rect x="20" y="48" width="120" height="22" rx="2" stroke="currentColor" strokeWidth="1.1" />
          <rect x="20" y="78" width="120" height="22" rx="2" stroke="currentColor" strokeWidth="1.1" />
          <rect x="20" y="108" width="120" height="22" rx="2" stroke="currentColor" strokeWidth="1.1" />
          <rect x="20" y="138" width="88" height="22" rx="2" stroke="currentColor" strokeWidth="1.1" />
        </>
      ) : null}
      {kind === 'sheet' ? (
        <>
          <rect x="20" y="24" width="54" height="7" rx="1" fill="currentColor" opacity="0.3" />
          <rect x="20" y="44" width="120" height="10" rx="1" stroke="currentColor" />
          <rect x="20" y="64" width="120" height="10" rx="1" stroke="currentColor" />
          <rect x="20" y="84" width="78" height="10" rx="1" stroke="currentColor" />
          <rect x="20" y="114" width="120" height="48" rx="2" stroke="currentColor" />
        </>
      ) : null}
      {kind === 'split' ? (
        <>
          <rect x="20" y="24" width="56" height="152" rx="2" stroke="currentColor" />
          <rect x="84" y="24" width="56" height="70" rx="2" stroke="currentColor" />
          <rect x="84" y="104" width="56" height="72" rx="2" stroke="currentColor" />
        </>
      ) : null}
      {kind === 'cards' ? (
        <>
          <rect x="20" y="24" width="56" height="72" rx="2" stroke="currentColor" />
          <rect x="84" y="24" width="56" height="72" rx="2" stroke="currentColor" />
          <rect x="20" y="106" width="56" height="72" rx="2" stroke="currentColor" />
          <rect x="84" y="106" width="56" height="72" rx="2" stroke="currentColor" />
        </>
      ) : null}
    </svg>
  );
}

export default function Work() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const port = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const pane = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const savedY = useRef(0);
  const locked = useRef(false);
  const lenis = useLenis();
  const [openId, setOpenId] = useState<string | null>(null);

  const openStory = (id: string) => {
    savedY.current = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY;
    locked.current = true;
    lenis?.stop();
    setOpenId(id);
  };

  const closeStory = () => {
    setOpenId(null);
  };
  const [focusId, setFocusId] = useState(pieces[0].id);
  const [beat, setBeat] = useState(0);
  const open = pieces.find((p) => p.id === openId) ?? null;
  const focus = pieces.find((p) => p.id === focusId) ?? pieces[0];
  const focusIndex = pieces.findIndex((p) => p.id === focusId);

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
              start: 'top 92%',
              end: 'top 18%',
              scrub: 0.65,
            },
          },
        );
      }

      bindReveal(el, q(`.${s.head}`), { start: 'top 82%', end: 'top 8%' });

      const feature = pane.current;
      if (feature) {
        bindReveal(feature, feature, { start: 'top 86%', end: 'top 6%' });
      }

      q(`.${s.row}`).forEach((row) => {
        bindReveal(row, row, { start: 'top 90%', end: 'bottom 10%' });
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  useEffect(() => {
    const el = pane.current;
    if (!el) return;
    if (reduce) {
      gsap.set(el.querySelectorAll(`.${s.rise}`), { clearProps: 'all' });
      return;
    }

    const bits = el.querySelectorAll(`.${s.rise}`);
    gsap.fromTo(
      bits,
      { yPercent: 115, autoAlpha: 1 },
      { yPercent: 0, duration: 0.62, stagger: 0.06, ease: 'power3.out', overwrite: 'auto' },
    );
  }, [focusId, reduce]);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    el.style.setProperty('--on', String(focusIndex));
  }, [focusIndex]);

  useEffect(() => {
    document.documentElement.classList.toggle('work-open', Boolean(open));
    setBeat(0);

    if (open) {
      savedY.current = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY;
      locked.current = true;
      lenis?.stop();
    } else if (locked.current) {
      locked.current = false;
      lenis?.scrollTo(savedY.current, { immediate: true });
      lenis?.start();
      window.scrollTo({ top: savedY.current, left: 0, behavior: 'instant' });
    }

    if (!open || !stage.current || !rail.current) return;

    const box = stage.current;
    const track = rail.current;
    const last = open.chapters.length - 1;
    const mobile = window.matchMedia('(max-width: 860px)').matches;
    const native = Boolean(reduce) || mobile;
    progress.current = 0;

    const size = () => {
      box.style.setProperty('--sw', `${box.clientWidth}px`);
    };
    size();

    const apply = (next: number) => {
      progress.current = Math.min(1, Math.max(0, next));
      const i = Math.round(progress.current * last);
      setBeat((cur) => (cur === i ? cur : i));
      ink.current?.style.setProperty('--p', `${progress.current}`);
      gsap.set(track, { x: native ? 0 : -progress.current * last * box.clientWidth });
      Array.from(box.querySelectorAll<HTMLElement>(`.${s.panel}`)).forEach((panel, idx) => {
        const d = idx - progress.current * last;
        panel.style.setProperty('--d', `${d}`);
        panel.style.setProperty('--abs', `${Math.abs(d)}`);
      });
    };

    apply(0);

    if (native) {
      const scroller = port.current;
      const onScroll = () => {
        if (!scroller) return;
        const span = mobile ? scroller.clientHeight : scroller.clientWidth;
        if (!span) return;
        const offset = mobile ? scroller.scrollTop : scroller.scrollLeft;
        const max = span * last;
        const p = max === 0 ? 0 : offset / max;
        progress.current = Math.min(1, Math.max(0, p));
        const i = Math.round(progress.current * last);
        setBeat((cur) => (cur === i ? cur : i));
        ink.current?.style.setProperty('--p', `${progress.current}`);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeStory();
      };
      scroller?.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('keydown', onKey);
      window.addEventListener('resize', size);
      return () => {
        scroller?.removeEventListener('scroll', onScroll);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', size);
        document.documentElement.classList.remove('work-open');
      };
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      apply(progress.current + e.deltaY / 1400);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStory();
      if (e.key === 'ArrowRight') apply(progress.current + 1 / last);
      if (e.key === 'ArrowLeft') apply(progress.current - 1 / last);
    };

    box.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', size);

    return () => {
      box.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', size);
      document.documentElement.classList.remove('work-open');
    };
  }, [open, reduce]);

  const goBeat = (i: number) => {
    if (!open || !stage.current || !rail.current) return;
    const last = open.chapters.length - 1;
    const p = last === 0 ? 0 : i / last;
    progress.current = p;
    ink.current?.style.setProperty('--p', `${p}`);
    setBeat(i);
    if (window.matchMedia('(max-width: 860px)').matches) {
      const panel = rail.current.children[i] as HTMLElement | undefined;
      panel?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      return;
    }
    gsap.to(rail.current, { x: -p * last * stage.current.clientWidth, duration: 0.7, ease: 'power3.out' });
    Array.from(stage.current.querySelectorAll<HTMLElement>(`.${s.panel}`)).forEach((panel, idx) => {
      const d = idx - i;
      panel.style.setProperty('--d', `${d}`);
      panel.style.setProperty('--abs', `${Math.abs(d)}`);
    });
  };

  return (
    <section ref={root} className={s.work} id="projects" aria-label="Desarrollo">
      <div ref={paint} className={s.paint} aria-hidden />
      <div className={s.inner}>
        <header className={s.head}>
          <p className={s.index}>02</p>
          <h2 className={s.title}>Desarrollo</h2>
        </header>

        <div ref={pane} className={s.feature} data-n={focus.id} key={focus.id}>
          <p className={s.featureKind}>
            <span className={s.clip}>
              <span className={s.rise}>
                {focus.kind}
                {focus.status ? <em>{focus.status}</em> : null}
              </span>
            </span>
          </p>
          <p className={s.featureName}>
            <span className={s.clip}>
              <span className={s.rise}>{focus.title}</span>
            </span>
          </p>
          <dl className={s.facts}>
            <div>
              <dt>Para</dt>
              <dd>
                <span className={s.clip}>
                  <span className={s.rise}>{focus.for}</span>
                </span>
              </dd>
            </div>
            <div>
              <dt>Hace</dt>
              <dd>
                <span className={s.clip}>
                  <span className={s.rise}>{focus.does}</span>
                </span>
              </dd>
            </div>
          </dl>
          <p className={s.featureNote}>
            <span className={s.clip}>
              <span className={s.rise}>{focus.note}</span>
            </span>
          </p>
          <span className={s.clip}>
            <Go rise onClick={() => openStory(focus.id)} />
          </span>
        </div>

        <div ref={list} className={s.list}>
          <i className={s.mark} aria-hidden />
          {pieces.map((item) => (
            <article key={item.id} className={`${s.row} ${focusId === item.id ? s.rowOn : ''}`}>
              <button type="button" className={`${s.pick} cursor-hover`} onClick={() => setFocusId(item.id)}>
                <span className={s.num}>{item.id}</span>
                <span className={s.name}>{item.title}</span>
                <span className={s.hint}>{item.does}</span>
              </button>
              <div className={s.more}>
                <p className={s.featureKind}>
                  {item.kind}
                  {item.status ? <em>{item.status}</em> : null}
                </p>
                <dl className={s.facts}>
                  <div>
                    <dt>Para</dt>
                    <dd>{item.for}</dd>
                  </div>
                  <div>
                    <dt>Hace</dt>
                    <dd>{item.does}</dd>
                  </div>
                </dl>
                <p className={s.featureNote}>{item.note}</p>
                <Go onClick={() => openStory(item.id)} />
              </div>
            </article>
          ))}
        </div>
      </div>

      {open ? (
        <div ref={stage} className={s.stage} role="dialog" aria-modal="true" aria-label={`${open.title}, cómo se formó`}>
          <div className={s.chrome}>
            <div className={s.brand}>
              <p className={s.chromeK}>Cómo se formó</p>
              <p className={s.chromeT}>{open.title}</p>
            </div>
            <div className={s.dots}>
              {open.chapters.map((ch, i) => (
                <button
                  key={ch.step}
                  type="button"
                  className={`${s.dot} ${beat === i ? s.dotOn : ''} cursor-hover`}
                  onClick={() => goBeat(i)}
                >
                  <span className={s.dotN}>{ch.step}</span>
                  <span className={s.dotL}>{ch.title}</span>
                </button>
              ))}
            </div>
            <button type="button" className={`${s.close} cursor-hover`} onClick={closeStory}>
              Cerrar
            </button>
          </div>

          <div ref={port} className={s.viewport}>
            <div ref={rail} className={s.track}>
              {open.chapters.map((ch) => (
                <article key={ch.step} className={s.panel}>
                  <p className={s.colossus} aria-hidden>
                    {ch.step}
                  </p>
                  <div className={s.panelCopy}>
                    <p className={s.panelStep}>
                      {ch.step} · {ch.title}
                    </p>
                    <h3>{ch.title}</h3>
                    <p>{ch.text}</p>
                  </div>
                  {ch.sketch ? (
                    <figure className={s.paper}>
                      <Sketch kind={ch.sketch} />
                    </figure>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
          <span ref={ink} className={s.ink} aria-hidden />
        </div>
      ) : null}
    </section>
  );
}
