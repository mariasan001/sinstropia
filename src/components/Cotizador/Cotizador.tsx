'use client';

import Link from 'next/link';
import s from './Cotizador.module.scss';

const capabilities = [
  {
    title: 'Conversación con IA',
    text: 'Ayuda a entender qué quiere el cliente y a acomodar la cotización a su caso, sin pelear con un formulario rígido.',
  },
  {
    title: 'Formatos a tu medida',
    text: 'Genera cotizaciones en el formato que tu giro necesita: documento, reporte o el empaque que ustedes usan.',
  },
  {
    title: 'Sitio y seguimiento',
    text: 'Tus clientes cotizan desde un espacio claro. Tú ves el estatus: enviada, pendiente, cerrada.',
  },
  {
    title: 'Se ajusta al negocio',
    text: 'Se implementa una vez a tu operación —sin importar el giro— y aprende cómo cotizan ustedes.',
  },
];

const audiences = [
  {
    title: 'Negocios que cotizan seguido',
    text: 'Servicios, talleres, agencias, seguros, empaque o lo que sea: volumen de cotizaciones y poco tiempo para armarlas a mano.',
  },
  {
    title: 'Equipos de ventas o atención',
    text: 'Necesitan hablar con el cliente, captar lo que pide y entregar algo profesional sin rehacer plantillas.',
  },
  {
    title: 'Dueños que quieren control',
    text: 'Un lugar para ver qué se cotizó, qué sigue abierto y qué ya cerró —con su marca, no un PDF suelto.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Se integra a tu negocio',
    text: 'Definimos cómo cotizas: conceptos, pesos, ajustes y cómo entregas. La IA se apoya en eso, no en un molde genérico.',
  },
  {
    n: '02',
    title: 'El cliente pide; la IA ayuda',
    text: 'Facilita la conversación sobre lo que necesita. Tú (o tu equipo) afinan; el sistema acomoda la propuesta.',
  },
  {
    n: '03',
    title: 'Formato, sitio y seguimiento',
    text: 'Sale la cotización en tu formato. Queda en el sitio con estatus. Sabes qué pasó con cada una.',
  },
];

const plans = [
  {
    name: 'Arranque',
    note: 'Para empezar',
    points: [
      'Integración a tu forma de cotizar',
      'Formatos base + sitio',
      'Seguimiento esencial',
    ],
  },
  {
    name: 'Operación',
    note: 'El más usado',
    points: [
      'Más volumen y usuarios',
      'Ajustes de IA a tu flujo',
      'Seguimiento completo',
    ],
  },
  {
    name: 'Marca',
    note: 'A medida',
    points: [
      'Reglas y formatos avanzados',
      'Marca y experiencia a tu medida',
      'Acompañamiento cercano',
    ],
  },
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

export default function Cotizador() {
  return (
    <main className={s.wrap}>
      <section className={s.hero} aria-label="Cotizador">
        <p className={s.ghost} aria-hidden>
          Cotiza
        </p>
        <div className={s.heroInner}>
          <p className={s.kicker}>IA · se adapta a tu negocio</p>
          <h1>
            Cotizar no es pelear
            <span> con un formulario.</span>
          </h1>
          <p className={s.lead}>
            El Cotizador se ajusta a tu giro: con IA ayuda a entender qué quiere el cliente,
            genera formatos, da seguimiento y deja un sitio claro para cotizar.
          </p>
          <div className={s.heroActions}>
            <a className={`${s.btn} ${s.primary}`} href="#como-funciona">
              Cómo funciona
              <Arrow />
            </a>
            <a className={`${s.btn} ${s.secondary}`} href="#adquirir">
              Adquirir
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className={s.section} id="que-hace" aria-label="Qué hace">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>01</p>
            <div>
              <h2>Qué hace</h2>
              <p className={s.sub}>Comunicación, formato, sitio y control.</p>
            </div>
          </header>
          <div className={s.features}>
            {capabilities.map((item) => (
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
              <p className={s.sub}>Cualquier giro que cotice y quiera claridad con el cliente.</p>
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
            No es una plantilla Excel con IA encima. Se implementa a cómo trabajan ustedes y a lo
            que sus clientes necesitan cotizar.
          </p>
        </div>
      </section>

      <section className={`${s.section} ${s.how}`} id="como-funciona" aria-label="Cómo funciona">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>03</p>
            <div>
              <h2>Cómo funciona</h2>
              <p className={s.sub}>De la integración al seguimiento.</p>
            </div>
          </header>
          <ol className={s.flow}>
            {steps.map((step) => (
              <li key={step.n}>
                <em>{step.n}</em>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.section} id="planes" aria-label="Planes">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>04</p>
            <div>
              <h2>Planes</h2>
              <p className={s.sub}>El alcance se arma contigo. Aquí el mapa.</p>
            </div>
          </header>
          <div className={s.plans}>
            {plans.map((plan) => (
              <article key={plan.name}>
                <small>{plan.note}</small>
                <h3>{plan.name}</h3>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={s.notFor}>
            Precio y detalle según volumen, usuarios y formatos. Cotizamos el plan que te alcanza
            —sin venderte de más.
          </p>
        </div>
      </section>

      <section className={`${s.section} ${s.acquire}`} id="adquirir" aria-label="Adquirir Cotizador">
        <div className={s.inner}>
          <header className={s.head}>
            <p className={s.index}>05</p>
            <div>
              <h2>Adquirir</h2>
              <p className={s.sub}>Cuéntanos tu giro. Armamos el Cotizador a tu medida.</p>
            </div>
          </header>
          <div className={s.acquireBox}>
            <p>
              ¿Listo para tener cotizaciones con IA, formatos propios, sitio y seguimiento?
              Escríbenos o cotiza: revisamos cómo trabajan hoy y qué necesitan sus clientes.
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
