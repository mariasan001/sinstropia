'use client';

import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import s from './CotizarBubble.module.scss';

const phones = [{ wa: '527226068056' }] as const;

const kinds = [
  { id: 'pagina', label: 'Página' },
  { id: 'sistema', label: 'Sistema' },
  { id: 'app', label: 'App' },
  { id: 'nose', label: 'Aún no sé qué encaja' },
] as const;

const budgets = [
  { id: 'sin', label: 'Aún no tengo claro' },
  { id: 'bajo', label: 'Hasta 50k' },
  { id: 'medio', label: '50k – 150k' },
  { id: 'alto', label: '150k o más' },
] as const;

type Step = 'kind' | 'idea' | 'budget' | 'datos' | 'done';

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden>
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function CotizarBubble() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('kind');
  const [kind, setKind] = useState('');
  const [budget, setBudget] = useState('');
  const [nombre, setNombre] = useState('');
  const [negocio, setNegocio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [idea, setIdea] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const kindLabel = kinds.find((k) => k.id === kind)?.label ?? '';
  const budgetLabel = budgets.find((b) => b.id === budget)?.label ?? '';
  const stepIndex = step === 'kind' ? 1 : step === 'idea' ? 2 : step === 'budget' ? 3 : 4;

  const buildWaMessage = () => {
    const lines = [
      'Hola Sintropía,',
      '',
      'Quiero cotizar un proyecto desde la web.',
      '',
      `Nombre: ${nombre.trim() || '—'}`,
      `WhatsApp de contacto: ${whatsapp.trim() || '—'}`,
      negocio.trim() ? `Negocio: ${negocio.trim()}` : null,
      `Qué busca: ${kindLabel || '—'}`,
      `Presupuesto: ${budgetLabel || '—'}`,
      '',
      'Idea / necesidad:',
      idea.trim() || '—',
      '',
      'Gracias.',
    ].filter((line): line is string => line !== null);

    return lines.join('\n');
  };

  const waHref = `https://wa.me/${phones[0].wa}?text=${encodeURIComponent(buildWaMessage())}`;

  const openPanel = useCallback(() => {
    setOpen(true);
    if (typeof window !== 'undefined' && window.location.hash !== '#cotizar') {
      window.history.replaceState(null, '', '#cotizar');
    }
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#cotizar') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#cotizar') setOpen(true);
    };
    sync();
    const onHash = () => sync();
    const onOpen = () => openPanel();
    window.addEventListener('hashchange', onHash);
    window.addEventListener('open-cotizar', onOpen);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('open-cotizar', onOpen);
    };
  }, [openPanel]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closePanel]);

  const pickKind = (id: string) => {
    setKind(id);
    setStep('idea');
  };

  const pickBudget = (id: string) => {
    setBudget(id);
    setStep('datos');
  };

  const goIdea = (e: FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setStep('budget');
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !whatsapp.trim() || sending) return;

    setSending(true);
    setError('');

    // Por ahora: la cotización llega por WhatsApp con el resumen completo.
    window.open(waHref, '_blank', 'noopener,noreferrer');
    setStep('done');
    setSending(false);
  };

  const restart = () => {
    setStep('kind');
    setKind('');
    setBudget('');
    setNombre('');
    setNegocio('');
    setWhatsapp('');
    setIdea('');
    setError('');
    setSending(false);
  };

  const goBack = () => {
    setError('');
    if (step === 'idea') {
      setStep('kind');
      return;
    }
    if (step === 'budget') {
      setStep('idea');
      return;
    }
    if (step === 'datos') setStep('budget');
  };

  return (
    <div className={`${s.root} ${open ? s.open : ''}`}>
      {open ? (
        <div
          className={s.panel}
          id="cotizar"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className={s.top}>
            <p id={titleId}>Cotizar</p>
            <span>{step === 'done' ? 'Listo' : `${stepIndex} / 4`}</span>
            <button type="button" className={s.close} onClick={closePanel} aria-label="Cerrar">
              ×
            </button>
          </div>

          {kind && step !== 'kind' && step !== 'done' ? (
            <p className={s.picked}>
              {kindLabel}
              {budget ? ` · ${budgetLabel}` : ''}
            </p>
          ) : null}

          <div className={s.body} key={step}>
            {step === 'kind' ? (
              <>
                <h4>¿Qué quieres cotizar?</h4>
                <div className={s.list}>
                  {kinds.map((opt) => (
                    <button key={opt.id} type="button" className={s.row} onClick={() => pickKind(opt.id)}>
                      <b>{opt.label}</b>
                      <span>Elegir</span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'idea' ? (
              <form onSubmit={goIdea} className={s.stack}>
                <h4>{kind === 'nose' ? 'Cuéntanos qué traes' : `Tu idea de ${kindLabel.toLowerCase()}`}</h4>
                <label className={s.field}>
                  <span>Idea</span>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    rows={3}
                    required
                    autoFocus
                    placeholder="Negocio, problema, para quién…"
                  />
                </label>
                <label className={s.field}>
                  <span>Negocio o marca</span>
                  <input
                    value={negocio}
                    onChange={(e) => setNegocio(e.target.value)}
                    placeholder="Opcional"
                  />
                </label>
                <div className={s.nav}>
                  <button type="button" className={s.back} onClick={goBack}>
                    Regresar
                  </button>
                  <button type="submit" className={s.submit} disabled={!idea.trim()}>
                    Continuar <Arrow />
                  </button>
                </div>
              </form>
            ) : null}

            {step === 'budget' ? (
              <>
                <h4>¿Con qué presupuesto cuentas?</h4>
                <div className={s.list}>
                  {budgets.map((opt) => (
                    <button key={opt.id} type="button" className={s.row} onClick={() => pickBudget(opt.id)}>
                      <b>{opt.label}</b>
                      <span>Elegir</span>
                    </button>
                  ))}
                </div>
                <div className={s.nav}>
                  <button type="button" className={s.back} onClick={goBack}>
                    Regresar
                  </button>
                </div>
              </>
            ) : null}

            {step === 'datos' ? (
              <form onSubmit={send} className={s.stack}>
                <h4>Tus datos</h4>
                <label className={s.field}>
                  <span>Nombre</span>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    autoComplete="name"
                    required
                    autoFocus
                    placeholder="Cómo te llamas"
                  />
                </label>
                <label className={s.field}>
                  <span>WhatsApp o número</span>
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="722…"
                  />
                </label>
                {error ? <p className={s.error}>{error}</p> : null}
                <div className={s.nav}>
                  <button type="button" className={s.back} onClick={goBack}>
                    Regresar
                  </button>
                  <button
                    type="submit"
                    className={s.submit}
                    disabled={!nombre.trim() || !whatsapp.trim() || sending}
                  >
                    {sending ? 'Abriendo…' : 'Enviar por WhatsApp'} <Arrow />
                  </button>
                </div>
              </form>
            ) : null}

            {step === 'done' ? (
              <div className={s.done}>
                <h4>Listo para enviar.</h4>
                <p>Se abrió WhatsApp con tu cotización. Si no se abrió, usa el botón.</p>
                <a className={s.submit} href={waHref} target="_blank" rel="noreferrer">
                  Abrir WhatsApp <Arrow />
                </a>
                <button type="button" className={s.link} onClick={restart}>
                  Otra cotización
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className={s.fab}
        onClick={() => (open ? closePanel() : openPanel())}
        aria-expanded={open}
        aria-controls="cotizar"
      >
        <span className={s.fabDot} aria-hidden />
        <span>{open ? 'Cerrar' : 'Cotizar'}</span>
      </button>
    </div>
  );
}
