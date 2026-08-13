'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Hacemos.module.scss';

gsap.registerPlugin(ScrollTrigger);

const beats = [
  {
    id: 'idea',
    word: 'La idea',
    line: 'Llega suelta: en un chat, en un cuaderno, a medias. App, la caja, clientes, un Excel tachado. No hace falta que venga resuelta: nos sentamos con ustedes y la escuchamos completa.',
  },
  {
    id: 'mesa',
    word: 'Propuesta',
    line: 'Ordenamos lo que importa y dejamos fuera lo que no. Página, app, caja, cobro, renta: la lista de lo que vamos a hacer. No es un sello de aprobado, es una propuesta que se lee juntos.',
  },
  {
    id: 'boceto',
    word: 'El boceto',
    line: 'Antes de escribir una línea, la dibujamos. Cabecera, cuerpo, caja, clientes, cobro — para que nadie imagine una cosa distinta. Se ve, se corrige y se decide juntos.',
  },
  {
    id: 'arma',
    word: 'Se arma',
    line: 'El trazo se vuelve código. Páginas, sistemas, apps: se construye, se entrega y se ve andar. No es magia, es el boceto hecho trabajo, con ustedes en cada cierre.',
  },
  {
    id: 'aire',
    word: 'Al aire',
    line: 'Se publica. Sale del cuaderno y llega a la mano: la app que opera, cobra y avisa. Se valida con ustedes, y no los soltamos ahí — los acompañamos a usarla.',
  },
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
  const page = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [exit, setExit] = useState(-1);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const apply = (progress: number) => {
      el.style.setProperty('--p', `${progress}`);
      const i = progress < 0.16 ? 0 : progress < 0.34 ? 1 : progress < 0.62 ? 2 : progress < 0.8 ? 3 : 4;
      setStep((cur) => {
        if (cur !== i) queueMicrotask(() => setExit(cur));
        return i;
      });
    };

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

    if (reduce) {
      apply(1);
      return () => {
        buttons.forEach((btn) => {
          btn.removeEventListener('pointermove', onBtnMove);
          btn.removeEventListener('pointerleave', onBtnLeave);
        });
      };
    }

    const sheet = page.current;
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

      gsap.set(q(`.${s.phone}`), { autoAlpha: 0, y: 24, scale: 0.94 });
      gsap.set(q(`.${s.pBlock}`), { autoAlpha: 0, y: 10 });
      gsap.set(q(`.${s.code}`), { autoAlpha: 0 });
      gsap.set(q(`.${s.code} li`), { autoAlpha: 0, x: 8 });
      gsap.set(q(`.${s.wire}`), { autoAlpha: 0 });
      gsap.set(q(`.${s.wBlock}`), { autoAlpha: 0, y: 10 });
      gsap.set(q(`.${s.wash}`), { autoAlpha: 0 });
      gsap.set(q(`.${s.order}`), { autoAlpha: 0 });
      gsap.set(q(`.${s.order} li`), { autoAlpha: 0, y: 12 });
      gsap.set(q(`.${s.colossus}`), { autoAlpha: 0, y: 24 });
      gsap.set(q(`.${s.chrome}`), { height: 0, autoAlpha: 0 });
      gsap.set(q(`.${s.glow}`), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 6.2)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => apply(self.progress),
        },
      });

      if (sheet) {
        tl.fromTo(sheet, { rotate: -5, y: 20, scale: 0.96 }, { rotate: 0, y: 0, scale: 1, duration: 0.14 }, 0);
        tl.to(sheet, { y: -8, scale: 1.02, duration: 0.1 }, 0.82);
      }

      tl.to(q(`.${s.doodles}`), { autoAlpha: 0, duration: 0.03 }, 0.15);
      tl.to(q(`.${s.loose} span`), { autoAlpha: 0, duration: 0.04 }, 0.15);
      tl.to(q(`.${s.order}`), { autoAlpha: 1, duration: 0.03 }, 0.16);
      tl.to(q(`.${s.order} li`), { autoAlpha: 1, y: 0, stagger: 0.015, duration: 0.05 }, 0.16);
      tl.to(q(`.${s.order}`), { autoAlpha: 0, duration: 0.03 }, 0.33);

      tl.to(q(`.${s.wash}`), { autoAlpha: 1, duration: 0.04 }, 0.33);
      tl.to(q(`.${s.wire}`), { autoAlpha: 1, duration: 0.04 }, 0.34);
      tl.to(q(`.${s.wBlock}`), { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.35);
      tl.to(q(`.${s.wire}`), { autoAlpha: 0, duration: 0.04 }, 0.62);
      tl.to(q(`.${s.wash}`), { autoAlpha: 0, duration: 0.04 }, 0.62);

      if (sheet) tl.to(sheet, { backgroundColor: '#111218', duration: 0.05 }, 0.62);
      tl.to(q(`.${s.sheet}`), { backgroundColor: '#111218', duration: 0.05 }, 0.62);
      tl.to(q(`.${s.code}`), { autoAlpha: 1, duration: 0.04 }, 0.62);
      tl.to(q(`.${s.code} li`), { autoAlpha: 1, x: 0, stagger: 0.018, duration: 0.08 }, 0.63);
      tl.to(q(`.${s.code}`), { autoAlpha: 0, duration: 0.04 }, 0.8);
      if (sheet) tl.to(sheet, { autoAlpha: 0, scale: 0.9, duration: 0.06 }, 0.8);

      tl.to(q(`.${s.phone}`), { autoAlpha: 1, y: 0, scale: 1, duration: 0.07 }, 0.8);
      tl.to(q(`.${s.pBlock}`), { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.81);
      tl.to(q(`.${s.glow}`), { autoAlpha: 1, duration: 0.07 }, 0.82);
    }, el);

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('pointermove', onBtnMove);
        btn.removeEventListener('pointerleave', onBtnLeave);
      });
      ctx.revert();
    };
  }, [reduce]);

  const beat = beats[step];

  return (
    <section
      ref={root}
      className={s.wrap}
      id="services"
      aria-label="Cómo trabajamos"
      data-step={beat.id}
    >
      <div ref={paint} className={s.paint} aria-hidden />
      <div className={s.glow} aria-hidden />

      <div className={s.stage}>
        <div className={s.copy}>
          <div className={s.head}>
            <p className={s.index}>03</p>
            <h2 className={s.title}>Cómo trabajamos</h2>
          </div>
          <h2 className={s.words}>
            {beats.map((item, i) => (
              <span
                key={item.id}
                data-on={i === step ? '1' : '0'}
                data-exit={i === exit && i !== step ? '1' : '0'}
              >
                {item.word}
              </span>
            ))}
          </h2>
          <div className={s.hold}>
            <p className={s.line} key={beat.id}>
              {beat.line}
            </p>
          </div>
          <div className={s.actions}>
            <Btn href="#cotizar" variant="primary" now="Cotizar" next="Empezar" />
            <Btn href="#productos" variant="secondary" now="Ver productos" next="Entrar" />
          </div>
          <p className={s.rent} data-on={beat.id === 'aire' ? '1' : '0'}>
            Si el sistema ya existe, se renta. Sin empezar de cero.
          </p>
        </div>

        <div className={s.frame} aria-hidden>
          <div ref={page} className={s.page}>
            <div className={s.chrome}>
              <i />
              <i />
              <i />
              <b>sintropia.mx</b>
              <em>Al aire</em>
            </div>

            <div className={s.sheet}>
              <span className={s.wash} />
              <p className={s.colossus}>Sintropía</p>

              <div className={s.loose}>
                <svg className={s.doodles} viewBox="0 0 320 420" fill="none">
                  <ellipse cx="248" cy="56" rx="34" ry="16" stroke="currentColor" strokeWidth="1.2" transform="rotate(-12 248 56)" />
                  <path d="M86 78c28 6 48-10 62-4" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                  <path d="M142 76l8-10M148 78l10-4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  <rect x="214" y="118" width="52" height="68" rx="6" stroke="currentColor" strokeWidth="1.2" transform="rotate(8 240 152)" />
                  <path d="M222 132h28M222 142h22M222 152h26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" transform="rotate(8 240 152)" />
                  <rect x="42" y="168" width="46" height="32" stroke="currentColor" strokeWidth="1.15" transform="rotate(-6 65 184)" />
                  <path d="M48 184h34" stroke="currentColor" strokeWidth="1" transform="rotate(-6 65 184)" />
                  <path d="M168 198c22 18 8 36-12 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M58 268c18 14 4 22-8 10 8 2 14-6 8-10z" stroke="currentColor" strokeWidth="1.15" />
                  <path d="M70 252c22 4 18 22-2 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M72 248l4 12M66 256h14" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                  <path d="M52 292c8-2 16 6 6 12-12 2-16-8-6-12z" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M198 286c36-8 40 18 8 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M54 318c18 2 22 0 38-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M56 323c16 3 24 1 36-6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M60 328c12 2 20 0 30-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M230 340c12 16-6 24-14 8 10 2 16-10 14-8z" stroke="currentColor" strokeWidth="1.15" />
                  <path d="M28 88c8 40 4 90 10 140" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />
                  <path d="M268 210c10 8-4 22-12 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M120 350c24 10 40-8 28-16" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                  <circle cx="292" cy="168" r="3" stroke="currentColor" strokeWidth="1" />
                  <circle cx="302" cy="176" r="2" stroke="currentColor" strokeWidth="1" />
                </svg>

                <span>app?</span>
                <span>la caja</span>
                <span>página</span>
                <span>clientes</span>
                <span className={s.out}>excel</span>
                <span>cobro</span>
                <span>¿y si se renta?</span>
                <span>hablar primero</span>
                <span>no recortar</span>
                <span>verlo juntos</span>
                <span>login?</span>
                <span>avisos</span>
                <span>ok</span>
              </div>

              <ol className={s.order}>
                <li>
                  <em>01</em>página
                </li>
                <li>
                  <em>02</em>app
                </li>
                <li>
                  <em>03</em>la caja
                </li>
                <li>
                  <em>04</em>clientes
                </li>
                <li>
                  <em>05</em>cobro
                </li>
                <li>
                  <em>06</em>¿y si se renta?
                </li>
              </ol>

              <div className={s.wire}>
                <header className={s.wBlock}>
                  <i />
                  <b />
                  <b />
                  <em />
                </header>
                <div className={`${s.wBlock} ${s.wHero}`}>
                  <span>cabecera</span>
                  <small />
                  <strong />
                  <strong />
                  <p />
                  <p />
                  <em />
                </div>
                <div className={`${s.wBlock} ${s.wTrio}`}>
                  <i data-n="caja" />
                  <i data-n="clientes" />
                  <i data-n="cobro" />
                </div>
                <div className={`${s.wBlock} ${s.wSplit}`}>
                  <aside data-n="lista" />
                  <ul>
                    <li />
                    <li />
                    <li />
                  </ul>
                </div>
                <footer className={s.wBlock}>
                  <i />
                  <i />
                  <i />
                </footer>
              </div>

              <div className={s.code}>
                <div className={s.codeBar}>
                  <i />
                  <i />
                  <i />
                  <b>pagina.tsx</b>
                </div>
                <ol>
                  {[
                    <>
                      <b>import</b> {'{'} <u>Hero</u>, <u>Caja</u>, <u>Lista</u> {'}'} <b>from</b> <q>&quot;@/ui&quot;</q>
                    </>,
                    <>
                      <b>import</b> {'{'} <u>cobrar</u>, <u>validar</u> {'}'} <b>from</b> <q>&quot;./caja&quot;</q>
                    </>,
                    <></>,
                    <>
                      <b>type</b> <u>Cliente</u> = {'{'} <s>id</s>: <i>string</i>; <s>saldo</s>: <i>number</i> {'}'}
                    </>,
                    <></>,
                    <>
                      <b>export</b> <b>default</b> <i>function</i> <u>Pagina</u>() {'{'}
                    </>,
                    <>
                      {'  '}
                      <b>const</b> <s>hoy</s> = <u>validar</u>()
                    </>,
                    <>
                      {'  '}
                      <b>const</b> <s>entradas</s> = <u>cobrar</u>(<s>hoy</s>)
                    </>,
                    <></>,
                    <>
                      {'  '}
                      <b>return</b> (
                    </>,
                    <>
                      {'    '}
                      &lt;<u>main</u>&gt;
                    </>,
                    <>
                      {'      '}
                      &lt;<u>Hero</u> <s>title</s>=<q>&quot;Sale del cuaderno&quot;</q> /&gt;
                    </>,
                    <>
                      {'      '}
                      &lt;<u>Caja</u> <s>clientes</s> <s>cobro</s>=<s>{'{'}entradas{'}'}</s> /&gt;
                    </>,
                    <>
                      {'      '}
                      &lt;<u>Lista</u> <s>avisos</s> <s>login</s> /&gt;
                    </>,
                    <>
                      {'    '}
                      &lt;/<u>main</u>&gt;
                    </>,
                    <>{'  )'}</>,
                    <>{'}'}</>,
                    <></>,
                    <>
                      <i>// se valida con ustedes. no los soltamos.</i>
                    </>,
                    <>
                      <b>await</b> <u>publicar</u>(<q>&quot;al aire&quot;</q>)
                    </>,
                  ].map((line, i) => (
                    <li key={i}>
                      <em>{i + 1}</em>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className={s.phone}>
            <div className={s.bezel}>
              <div className={s.app}>
                <div className={s.status}>
                  <b>9:41</b>
                  <i className={s.island} />
                  <em />
                </div>
                <header className={s.pBlock}>
                  <span className={s.avatar}>C</span>
                  <div>
                    <small>La caja</small>
                    <b>Hoy</b>
                  </div>
                  <em>Al aire</em>
                </header>
                <div className={`${s.pBlock} ${s.stat}`}>
                  <span>entradas del día</span>
                  <strong>
                    $12,480
                  </strong>
                  <p>+ 4 cobros cerrados</p>
                </div>
                <div className={`${s.pBlock} ${s.pair}`}>
                  <div>
                    <small>pendientes</small>
                    <b>4</b>
                  </div>
                  <div>
                    <small>clientes</small>
                    <b>18</b>
                  </div>
                </div>
                <div className={`${s.pBlock} ${s.pActs}`}>
                  <i>
                    <b />
                    Cobrar
                  </i>
                  <i>
                    <b />
                    Cliente
                  </i>
                  <i>
                    <b />
                    Aviso
                  </i>
                </div>
                <ul className={s.pBlock}>
                  <li>
                    <span>RH</span>
                    <div>
                      <b>Rosa H.</b>
                      <small>cobro cerrado</small>
                    </div>
                    <em>+$2,400</em>
                  </li>
                  <li>
                    <span>JL</span>
                    <div>
                      <b>Juan L.</b>
                      <small>cliente nuevo</small>
                    </div>
                    <em>+$800</em>
                  </li>
                  <li>
                    <span>OK</span>
                    <div>
                      <b>Publicado</b>
                      <small>al aire</small>
                    </div>
                    <em>sí</em>
                  </li>
                </ul>
                <nav className={s.pBlock}>
                  <i>Inicio</i>
                  <i>Caja</i>
                  <i>Más</i>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.rail} aria-hidden />
    </section>
  );
}
