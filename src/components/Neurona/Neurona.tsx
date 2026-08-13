'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import s from './Neurona.module.scss';

type Kind = 'texto' | 'video' | 'audio';
type Rule = 'ortografia' | 'reaccion' | 'criterios';
type Step = 'kind' | 'rules' | 'input' | 'result';

const features = [
  {
    title: 'Tú defines las reglas',
    text: 'Ortografía, tono, reacción, criterios de un video o lo que tu operación necesite. Neurona no inventa el estándar: lo aplica.',
  },
  {
    title: 'Texto, video o audio',
    text: 'Valida lo que entra a tu proceso: un documento, un clip o un audio. Si cumple, pasa. Si no, se ve en claro.',
  },
  {
    title: 'Resultado accionable',
    text: 'No es un “tal vez”. Ves qué pasó, qué falló y qué quedó listo para seguir.',
  },
  {
    title: 'Se renta e instala',
    text: 'Entra a tu operación sin comprar una caja cerrada. Se adapta a cómo trabajan ustedes.',
  },
];

const audiences = [
  {
    title: 'Operaciones y QA de contenido',
    text: 'Revisan textos, clips o audios antes de publicar o entregar. Hoy lo hacen a mano; Neurona aplica el checklist.',
  },
  {
    title: 'Media, marketing y producción',
    text: 'Muchas piezas con criterios claros: duración, tono, lo que el video tiene que cumplir.',
  },
  {
    title: 'Atención, formación o marca',
    text: 'Guiones, respuestas y redacción con ortografía y tono que no pueden fallar.',
  },
  {
    title: 'Calidad o compliance interno',
    text: 'Necesitan un sí/no con evidencia: qué pasó la regla y qué no.',
  },
];

const kinds: { id: Kind; label: string; note: string }[] = [
  { id: 'texto', label: 'Texto', note: 'Documento o redacción' },
  { id: 'video', label: 'Video', note: 'Clip con criterios' },
  { id: 'audio', label: 'Audio', note: 'Claridad y reglas' },
];

const rules: { id: Rule; label: string; hint: string }[] = [
  { id: 'ortografia', label: 'Ortografía', hint: 'Redacción limpia' },
  { id: 'reaccion', label: 'Reacción', hint: 'Tono / respuesta' },
  { id: 'criterios', label: 'Criterios', hint: 'Reglas que tú marques' },
];

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden>
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Neurona() {
  const [step, setStep] = useState<Step>('kind');
  const [kind, setKind] = useState<Kind>('texto');
  const [picked, setPicked] = useState<Rule[]>(['ortografia']);
  const [draft, setDraft] = useState('');
  const [fileName, setFileName] = useState('');

  const result = useMemo(() => {
    const source = draft.trim() || fileName;
    const okBase = source.length > 12;
    return [
      {
        label: kind === 'texto' ? 'Texto recibido' : kind === 'video' ? 'Video recibido' : 'Audio recibido',
        ok: Boolean(source),
        detail: source || 'Sin archivo ni texto',
      },
      ...picked.map((rule) => {
        const meta = rules.find((r) => r.id === rule)!;
        const ok = okBase && !(rule === 'ortografia' && /teh|qeu|porqe/i.test(draft));
        return {
          label: meta.label,
          ok,
          detail: ok ? 'Cumple' : 'Revisar',
        };
      }),
    ];
  }, [draft, fileName, kind, picked]);

  const toggleRule = (id: Rule) => {
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const resetDemo = () => {
    setStep('kind');
    setKind('texto');
    setPicked(['ortografia']);
    setDraft('');
    setFileName('');
  };

  return (
    <main className={s.wrap}>
      <section className={s.hero} aria-label="Neurona">
        <p className={s.ghost} aria-hidden>
          Neurona
        </p>
        <div className={s.heroInner}>
          <p className={s.kicker}>Validador · se renta</p>
          <h1>
            Validar no es adivinar.
            <span> Es aplicar tus reglas.</span>
          </h1>
          <p className={s.lead}>
            Neurona revisa texto, video o audio contra los criterios que tú defines.
            Si cumple, queda. Si no, se ve en claro.
          </p>
          <div className={s.heroActions}>
            <a className={`${s.btn} ${s.primary}`} href="#demo">
              Probar demo
              <Arrow />
            </a>
            <a className={`${s.btn} ${s.secondary}`} href="#adquirir">
              Adquirir
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className={s.section} id="funciones" aria-label="Funcionalidades">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>01</p>
            <div>
              <h2>Qué hace</h2>
              <p className={s.sub}>Funciones claras. Sin teatro.</p>
            </div>
          </header>
          <div className={s.features}>
            {features.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.audience}`} id="para-quien" aria-label="Para quién">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>02</p>
            <div>
              <h2>Para quién va</h2>
              <p className={s.sub}>Donde ya hay reglas y alguien decide sí o no.</p>
            </div>
          </header>
          <div className={s.features}>
            {audiences.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className={s.notFor}>
            No es para quien solo quiere “que la IA escriba bonito” o aún no tiene criterios propios.
            Neurona aplica las reglas que ustedes ya marcan.
          </p>
        </div>
      </section>

      <section className={`${s.section} ${s.demoSection}`} id="demo" aria-label="Demo de prueba">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>03</p>
            <div>
              <h2>Demo de prueba</h2>
              <p className={s.sub}>Simula una validación. No guarda nada.</p>
            </div>
          </header>

          <div className={s.demo}>
            <nav className={s.steps} aria-label="Pasos del demo">
              {(
                [
                  ['kind', 'Qué validar'],
                  ['rules', 'Reglas'],
                  ['input', 'Contenido'],
                  ['result', 'Resultado'],
                ] as const
              ).map(([id, label], i) => (
                <button
                  key={id}
                  type="button"
                  className={step === id ? s.on : ''}
                  onClick={() => setStep(id)}
                >
                  <em>0{i + 1}</em>
                  {label}
                </button>
              ))}
            </nav>

            {step === 'kind' ? (
              <div className={s.panel}>
                <h3>¿Qué quieres validar hoy?</h3>
                <p className={s.hint}>Elige el tipo de contenido.</p>
                <div className={s.choices}>
                  {kinds.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={kind === item.id ? s.choiceOn : ''}
                      onClick={() => setKind(item.id)}
                    >
                      <b>{item.label}</b>
                      <span>{item.note}</span>
                    </button>
                  ))}
                </div>
                <div className={s.panelActions}>
                  <button type="button" className={s.btnPrimary} onClick={() => setStep('rules')}>
                    Siguiente
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'rules' ? (
              <div className={s.panel}>
                <h3>¿Cuáles serían tus reglas?</h3>
                <p className={s.hint}>Puedes marcar más de una. Ejemplos: ortografía, reacción, criterios propios.</p>
                <div className={s.choices}>
                  {rules.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={picked.includes(item.id) ? s.choiceOn : ''}
                      onClick={() => toggleRule(item.id)}
                    >
                      <b>{item.label}</b>
                      <span>{item.hint}</span>
                    </button>
                  ))}
                </div>
                <div className={s.panelActions}>
                  <button type="button" className={s.btnGhost} onClick={() => setStep('kind')}>
                    Atrás
                  </button>
                  <button
                    type="button"
                    className={s.btnPrimary}
                    disabled={picked.length === 0}
                    onClick={() => setStep('input')}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'input' ? (
              <div className={s.panel}>
                <h3>Sube tu documento o escríbelo</h3>
                <p className={s.hint}>
                  {kind === 'texto'
                    ? 'Pega un texto o simula un archivo.'
                    : `Simula un ${kind}: elige un archivo de ejemplo o describe lo que validarías.`}
                </p>
                <label className={s.upload}>
                  <input
                    type="file"
                    accept={kind === 'texto' ? '.txt,.pdf,.doc,.docx' : kind === 'video' ? 'video/*' : 'audio/*'}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFileName(file ? file.name : '');
                    }}
                  />
                  <span>{fileName || 'Elegir archivo (demo local)'}</span>
                </label>
                <textarea
                  className={s.area}
                  rows={7}
                  placeholder={
                    kind === 'texto'
                      ? 'Escribe o pega aquí el texto a validar…'
                      : 'Describe el contenido o pega notas de lo que debe cumplirse…'
                  }
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <div className={s.panelActions}>
                  <button type="button" className={s.btnGhost} onClick={() => setStep('rules')}>
                    Atrás
                  </button>
                  <button
                    type="button"
                    className={s.btnPrimary}
                    disabled={!draft.trim() && !fileName}
                    onClick={() => setStep('result')}
                  >
                    Ver resultado
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'result' ? (
              <div className={s.panel}>
                <h3>Resultado</h3>
                <p className={s.hint}>
                  Demo local: así se vería una validación de {kind} con tus reglas.
                </p>
                <ul className={s.resultList}>
                  {result.map((row) => (
                    <li key={row.label} data-ok={row.ok ? '1' : '0'}>
                      <div>
                        <b>{row.label}</b>
                        <p>{row.detail}</p>
                      </div>
                      <span>{row.ok ? 'cumple' : 'revisar'}</span>
                    </li>
                  ))}
                </ul>
                <div className={s.panelActions}>
                  <button type="button" className={s.btnGhost} onClick={resetDemo}>
                    Otra prueba
                  </button>
                  <a className={s.btnPrimary} href="#adquirir">
                    Quiero adquirir
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={s.section} id="pagos" aria-label="Precios y pagos">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>04</p>
            <div>
              <h2>Precio y cómo se paga</h2>
              <p className={s.sub}>Se renta. No se compra una caja muerta.</p>
            </div>
          </header>

          <div className={s.pricing}>
            <article>
              <small>Modelo</small>
              <h3>Renta mensual</h3>
              <p>
                Pagas por uso instalado en tu operación. El alcance (usuarios, volumen de
                validaciones, tipos de archivo) define el plan.
              </p>
            </article>
            <article>
              <small>Pagos</small>
              <h3>Corte claro</h3>
              <p>
                Facturación periódica, con lo que pediste activo. Si creces, ajustamos el plan —
                sin rehacer todo desde cero.
              </p>
            </article>
            <article>
              <small>Incluye</small>
              <h3>Instalación y reglas</h3>
              <p>
                Armamos contigo los criterios. Neurona entra a validar como ustedes trabajan,
                no al revés.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.acquire}`} id="adquirir" aria-label="Adquirir Neurona">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>05</p>
            <div>
              <h2>Adquirir</h2>
              <p className={s.sub}>Cuéntanos tu operación. Armamos la renta.</p>
            </div>
          </header>
          <div className={s.acquireBox}>
            <p>
              ¿Listo para adquirir Neurona? Escríbenos o cotiza: revisamos qué validas, con qué
              reglas y cómo se instala en tu flujo.
            </p>
            <div className={s.heroActions}>
              <Link className={`${s.btn} ${s.primary}`} href="/#cotizar">
                Cotizar
                <Arrow />
              </Link>
              <Link className={`${s.btn} ${s.secondary}`} href="/#contacto">
                Escribirnos
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
