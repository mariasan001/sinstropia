'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { bindReveal } from '@/motion/reveal';
import s from './Work.module.scss';

gsap.registerPlugin(ScrollTrigger);

type ChapterVisual =
  | 'credi-ask'
  | 'credi-split'
  | 'credi-ops'
  | 'credi-done'
  | 'usyc-ask'
  | 'usyc-split'
  | 'usyc-ops'
  | 'usyc-done'
  | 'dabook-ask'
  | 'dabook-split'
  | 'dabook-ops'
  | 'dabook-done'
  | 'gym-ask'
  | 'gym-split'
  | 'gym-ops'
  | 'gym-done';

type Chapter = {
  step: string;
  title: string;
  kind?: string;
  text: string | readonly string[];
  sketch?: string;
  visual?: ChapterVisual;
};

type Piece = {
  id: string;
  kind: string;
  title: string;
  for: string;
  does: string;
  note: string;
  status?: string;
  chapters: Chapter[];
};

const pieces: Piece[] = [
  {
    id: '01',
    kind: 'App · Sistema',
    title: 'Credibringe',
    for: 'Empresa con convenios de préstamos a tasa preferencial',
    does: 'App móvil para clientes y gestión interna web',
    note: 'Nació del descontrol: préstamos en Excel, sin saber quién prestó a quién, si la nómina descontó bien o si un pago se duplicó. Armamos app móvil para el cliente y un sistema web interno — Java y Next, desde cero — para controlar toda la cartera.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        kind: 'El problema',
        text: [
          'La empresa tiene convenios con asociaciones de préstamos: sus clientes obtienen tasa preferencial. El problema no era prestar; era no tener control.',
          'Quién le prestó a quién, si la nómina se descontó bien, si un pago se duplicó o nunca se reflejó: todo vivía en Excel. No había una sola fuente de verdad.',
        ],
        visual: 'credi-ask',
      },
      {
        step: '02',
        title: 'El boceto',
        kind: 'Dos caras',
        text: [
          'Se propuso una app móvil (y web móvil) para el cliente, y un sistema web de gestión interna con todo el proceso de punta a punta.',
          'En el web: iniciar un préstamo, problemas, documentación y cálculos. En la app: el empleado ve en qué va su préstamo, cómo está pagando y en qué etapa está — todo a la mano.',
        ],
        visual: 'credi-split',
      },
      {
        step: '03',
        title: 'Cómo se armó',
        kind: 'Java · Next',
        text: [
          'Se construyó con Java y Next: sin plantillas genéricas. Cada pieza salió de las necesidades reales del cliente, no de un paquete listo.',
          'Gestión interna en web para operar la cartera; app móvil para que quien debe consulte su proceso sin llamar a la oficina.',
        ],
        visual: 'credi-ops',
      },
      {
        step: '04',
        title: 'Lo que quedó',
        kind: 'En el aire',
        text: [
          'Quedó una app móvil para los clientes y un sistema integrado que ordena el ciclo completo del préstamo.',
          'Una central controlada de toda la cartera: cada préstamo, cada descuento, cada pago — visible y rastreable.',
        ],
        visual: 'credi-done',
      },
    ],
  },
  {
    id: '02',
    kind: 'Sistema escolar',
    title: 'USYC',
    for: 'Dueño de varias universidades',
    does: 'Caja, comprobantes, reportes y proyección de pagos',
    note: 'Sin control correcto de la caja en varias universidades: difícil saber qué entraba y en qué iba cada alumno. Sistematizamos alta, cobro, comprobante, reportes y la hoja de proyección de pagos que se entrega al estudiante.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        kind: 'El problema',
        text: [
          'El dueño de varias universidades no tenía un control correcto de la caja. Era difícil saber qué se generaba y en qué punto financiero estaba cada alumno.',
          'Nos buscó para sistematizarlo: dejar de perseguir el dinero a ciegas y tener una sola operación clara por escuela.',
        ],
        visual: 'usyc-ask',
      },
      {
        step: '02',
        title: 'El boceto',
        kind: 'La caja',
        text: [
          'Se propuso una caja para emitir pagos de inscripción, cursos inscritos o cualquier otro servicio que ofrecieran.',
          'Flujo: alta → cobro → imprimir comprobante → guardar. Además, reportes del estado de todo y una hoja de proyección de pagos para entregar al alumno.',
        ],
        visual: 'usyc-split',
      },
      {
        step: '03',
        title: 'Cómo se armó',
        kind: 'Operación',
        text: [
          'Se armó el proceso completo alrededor de la caja: conceptos, adeudos, cortes por escuela y comprobantes listos al momento.',
          'Los reportes y la proyección de pagos salieron del mismo núcleo — no como hojas sueltas al margen.',
        ],
        visual: 'usyc-ops',
      },
      {
        step: '04',
        title: 'Lo que quedó',
        kind: 'En el aire',
        text: [
          'Quedó un sistema de caja controlada: cada pago queda registrado, con comprobante y rastro claro.',
          'Reportes del estado general y la proyección de pagos en mano del alumno. Varias universidades, una operación ordenada.',
        ],
        visual: 'usyc-done',
      },
    ],
  },
  {
    id: '03',
    kind: 'E‑commerce · comunidad',
    title: 'Dabook',
    status: 'Próximo lanzamiento',
    for: 'Artistas emergentes que quieren crecer',
    does: 'Membresía, CV, cursos, artículos y pedidos',
    note: 'Nació del sueño de un cliente: ayudar a artistas emergentes a crecer en la industria. Dabook es un e‑commerce con membresía gratuita — CV, cursos a su precio, artículos, físico y digital, y seguimiento de pedidos — aún incorporando funciones hacia el primer lanzamiento.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        kind: 'El sueño',
        text: [
          'Llegó como el sueño de un cliente: ayudar a artistas emergentes a crecer en la industria — visibilidad, venta y comunidad en un solo lugar.',
          'No pedían “un sistema” más. Querían un e‑commerce donde el artista pudiera mostrarse, vender y ser encontrado.',
        ],
        visual: 'dabook-ask',
      },
      {
        step: '02',
        title: 'El boceto',
        kind: 'La membresía',
        text: [
          'Con membresía gratuita: subir CV para que otros puedan contactarlos; publicar cursos a su propio precio; escribir artículos si les gusta la escritura.',
          'Vender productos físicos o digitales, y dar seguimiento a pedidos cuando hay envío. Una plaza hecha a la medida del creador.',
        ],
        visual: 'dabook-split',
      },
      {
        step: '03',
        title: 'Cómo se arma',
        kind: 'En construcción',
        text: [
          'El proyecto nació de esa idea y sigue creciendo: se incorporan funciones nuevas mientras se cierra lo esencial para salir.',
          'No es un paquete cerrado. Es un e‑commerce vivo que se va armando con lo que el artista realmente necesita.',
        ],
        visual: 'dabook-ops',
      },
      {
        step: '04',
        title: 'Dónde va',
        kind: 'Primer lanzamiento',
        text: [
          'Se prepara el primer lanzamiento: vitrina, membresía, cursos, artículos y pedidos en una misma casa.',
          'Después del debut el proyecto no se queda quieto — hay mucho más por crecer, pieza por pieza.',
        ],
        visual: 'dabook-done',
      },
    ],
  },
  {
    id: '04',
    kind: 'Sitio · gestión',
    title: 'Gym',
    status: 'En desarrollo',
    for: 'Emprendimiento de gimnasio que arranca con control',
    does: 'Página pública, membresías, cobros y reportes',
    note: 'Nació de la necesidad de iniciar un emprendimiento nuevo con todo desde el día uno: página de presentación, gestión y control de clientes — no esperar al caos operativo para poner orden.',
    chapters: [
      {
        step: '01',
        title: 'Lo que pedían',
        kind: 'Desde el día uno',
        text: [
          'Un emprendimiento nuevo que no quería crecer a ciegas: necesitaba página de presentación, gestión y control de clientes desde el inicio.',
          'La meta era clara — arrancar ordenados, no esperar a que la operación ya fuera un caos para poner sistema.',
        ],
        visual: 'gym-ask',
      },
      {
        step: '02',
        title: 'El boceto',
        kind: 'Dos caras',
        text: [
          'Afuera: sitio con cómo está el gym, promociones, comentarios de la gente y una vía clara a pagos / inscripción.',
          'Adentro: membresías, corte de pagos, próximo pago, recomendaciones, seguimiento, reportes de clientes, quejas y soluciones.',
        ],
        visual: 'gym-split',
      },
      {
        step: '03',
        title: 'Cómo se arma',
        kind: 'En construcción',
        text: [
          'Sitio y operación se construyen juntos: la vitrina y el control nacen del mismo núcleo.',
          'Membresía, cobro y reportes no se dejan “para después” — van con el emprendimiento desde el primer tramo.',
        ],
        visual: 'gym-ops',
      },
      {
        step: '04',
        title: 'Dónde va',
        kind: 'Control temprano',
        text: [
          'Un sistema naciendo con el negocio: página viva + gestión interna con rastro de cada cliente.',
          'Control desde el inicio — para no corregir el desorden cuando ya pesa.',
        ],
        visual: 'gym-done',
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

function CrediAsk() {
  return (
    <div className={`${s.object} ${s.crediAsk}`} aria-hidden>
      <div className={s.floatWarn}>
        <i />
        <span>3 conflictos</span>
      </div>
      <div className={s.sheetBack} />
      <div className={s.sheetMid} />
      <div className={s.sheet}>
        <div className={s.sheetChrome}>
          <span />
          <span />
          <span />
          <b>cartera_final_v7.xlsx</b>
        </div>
        <div className={s.sheetGrid}>
          <div className={s.sheetHead}>
            <em>#</em>
            <em>Cliente</em>
            <em>Monto</em>
            <em>Nómina</em>
            <em>Estado</em>
          </div>
          <div>
            <i>01</i>
            <b>A. Reyes</b>
            <span>$12,400</span>
            <span data-bad="1">¿?</span>
            <u data-tone="warn">duda</u>
          </div>
          <div>
            <i>02</i>
            <b>L. Mora</b>
            <span>$4,800</span>
            <span data-bad="1">x2</span>
            <u data-tone="bad">duplicado</u>
          </div>
          <div>
            <i>03</i>
            <b>S. Peña</b>
            <span>$9,150</span>
            <span>—</span>
            <u data-tone="mute">otra hoja</u>
          </div>
          <div>
            <i>04</i>
            <b>D. Vega</b>
            <span>$2,300</span>
            <span data-bad="1">no</span>
            <u data-tone="bad">sin reflejo</u>
          </div>
        </div>
        <footer>
          <span>Sin dueño claro</span>
          <strong>0 fuentes de verdad</strong>
        </footer>
      </div>
    </div>
  );
}

function CrediSplit() {
  return (
    <div className={`${s.object} ${s.crediSplit}`} aria-hidden>
      <div className={s.protoBoard}>
        <div className={s.protoCode}>
          <header>
            <span />
            <span />
            <span />
            <b>prestamo.service.java</b>
          </header>
          <pre>
            <code>
              <i>class</i> PrestamoService {'{'}
              {'\n'}  <em>crear</em>(dto) {'{'}
              {'\n'}    validar(dto);
              {'\n'}    calcular(dto);
              {'\n'}    <em>save</em>(entity);
              {'\n'}  {'}'}
              {'\n'}
              {'}'}
            </code>
          </pre>
        </div>

        <div className={s.protoDb}>
          <small>Base de datos</small>
          <div className={s.dbTable}>
            <b>prestamos</b>
            <ul>
              <li>id</li>
              <li>cliente_id</li>
              <li>monto</li>
              <li>saldo</li>
              <li>nomina_ok</li>
            </ul>
          </div>
          <div className={s.dbTable} data-alt="1">
            <b>pagos</b>
            <ul>
              <li>id</li>
              <li>prestamo_id</li>
              <li>fecha</li>
              <li>monto</li>
            </ul>
          </div>
          <i className={s.dbLink} />
        </div>

        <div className={s.protoFlow}>
          <small>Diagrama de flujo</small>
          <ol>
            <li>Alta</li>
            <li>Docs</li>
            <li>Cálculo</li>
            <li>App</li>
            <li>Cobro</li>
          </ol>
        </div>

        <div className={s.protoNote}>
          <em>Prototipo</em>
          <p>Web gestión + app cliente · sin plantillas</p>
        </div>
      </div>
    </div>
  );
}

function CrediOps() {
  return (
    <div className={`${s.object} ${s.crediOps}`} aria-hidden>
      <div className={s.buildBoard}>
        <div className={s.buildTop}>
          <div className={s.stackCard} data-tone="java">
            <small>Backend</small>
            <b>Java</b>
            <p>Reglas · nómina · cartera</p>
          </div>
          <div className={s.stackCard} data-tone="next">
            <small>Web</small>
            <b>Next</b>
            <p>Gestión interna</p>
          </div>
          <div className={s.stackCard} data-tone="app">
            <small>Cliente</small>
            <b>App</b>
            <p>Consulta en vivo</p>
          </div>
        </div>
        <div className={s.buildPipe}>
          <span>Necesidad</span>
          <i />
          <span>Diseño</span>
          <i />
          <span>Código</span>
          <i />
          <span data-on="1">En aire</span>
        </div>
        <div className={s.buildLog}>
          <div data-ok="1">
            <b>Sin plantillas</b>
            <span>a medida</span>
          </div>
          <div data-ok="1">
            <b>Proceso completo</b>
            <span>alta → cobro</span>
          </div>
          <div data-ok="1">
            <b>App + web</b>
            <span>mismo núcleo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrediDone() {
  return (
    <div className={`${s.object} ${s.crediDone}`} aria-hidden>
      <div className={s.summary}>
        <div className={s.monitor}>
          <div className={s.monitorBezel}>
            <div className={s.monitorChrome}>
              <span />
              <span />
              <span />
              <b>Credibringe · central</b>
            </div>
            <div className={s.monitorBody}>
              <aside>
                <i data-on="1" />
                <i />
                <i />
                <i />
              </aside>
              <div className={s.monitorMain}>
                <header>
                  <div>
                    <small>Cartera controlada</small>
                    <b>128 activos</b>
                  </div>
                  <em>En vivo</em>
                </header>
                <div className={s.monitorStats}>
                  <div>
                    <small>Nómina ok</small>
                    <b>100%</b>
                  </div>
                  <div>
                    <small>Duplicados</small>
                    <b>0</b>
                  </div>
                  <div>
                    <small>Hoy</small>
                    <b>$38k</b>
                  </div>
                </div>
                <div className={s.monitorRows}>
                  <div>
                    <b>A. Reyes</b>
                    <span>al día</span>
                  </div>
                  <div>
                    <b>L. Mora</b>
                    <span>al día</span>
                  </div>
                  <div>
                    <b>S. Peña</b>
                    <span>sigue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.monitorStand} />
          <div className={s.monitorBase} />
        </div>

        <div className={s.phone}>
          <div className={s.phoneFace}>
            <div className={s.phoneStatus}>
              <b>9:41</b>
              <i />
              <em />
            </div>
            <header>
              <div>
                <small>Credibringe</small>
                <b>Tu préstamo</b>
              </div>
              <span>Al día</span>
            </header>
            <p className={s.balance}>
              <small>Saldo restante</small>
              <strong>$4,800</strong>
            </p>
            <div className={s.bar}>
              <span />
            </div>
            <div className={s.phoneMeta}>
              <div>
                <small>Pagado</small>
                <b>$7,200</b>
              </div>
              <div>
                <small>Próximo</small>
                <b>15 mar</b>
              </div>
            </div>
            <div className={s.phoneFeed}>
              <div>
                <i />
                <div>
                  <b>Descuento nómina</b>
                  <p>Reflejado hoy</p>
                </div>
                <em>-$400</em>
              </div>
              <div>
                <i data-ok="1" />
                <div>
                  <b>Sin duplicados</b>
                  <p>Cuenta limpia</p>
                </div>
                <em>ok</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsycAsk() {
  return (
    <div className={`${s.object} ${s.usycAsk}`} aria-hidden>
      <div className={s.usycWarn}>
        <i />
        <span>Sin corte claro</span>
      </div>
      <div className={s.usycCampuses}>
        <div>
          <small>Campus A</small>
          <b>¿$</b>
          <em>caja suelta</em>
        </div>
        <div>
          <small>Campus B</small>
          <b>¿$</b>
          <em>otra libreta</em>
        </div>
        <div>
          <small>Campus C</small>
          <b>¿$</b>
          <em>sin rastro</em>
        </div>
      </div>
      <div className={s.usycChaos}>
        <header>
          <small>Alumnos · adeudos</small>
          <em>descontrol</em>
        </header>
        <ul>
          <li data-bad="1">
            <b>M. López</b>
            <span>inscripción</span>
            <i>¿pagó?</i>
          </li>
          <li data-bad="1">
            <b>R. Díaz</b>
            <span>curso</span>
            <i>otra hoja</i>
          </li>
          <li>
            <b>A. Ruiz</b>
            <span>servicio</span>
            <i>sin punto</i>
          </li>
        </ul>
        <footer>Varias universidades · cero control de caja</footer>
      </div>
    </div>
  );
}

function UsycSplit() {
  return (
    <div className={`${s.object} ${s.usycSplit}`} aria-hidden>
      <div className={s.usycProto}>
        <div className={s.usycFlow}>
          <small>Flujo de caja</small>
          <ol>
            <li>Alta</li>
            <li>Cobro</li>
            <li>Comprobante</li>
            <li>Guardar</li>
            <li>Reporte</li>
          </ol>
        </div>
        <div className={s.usycConcepts}>
          <small>Conceptos</small>
          <ul>
            <li>Inscripción</li>
            <li>Cursos</li>
            <li>Otros servicios</li>
          </ul>
        </div>
        <div className={s.usycSheet}>
          <small>Proyección de pagos</small>
          <b>Hoja al alumno</b>
          <div>
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>…</span>
          </div>
          <p>Borrador · prototipo</p>
        </div>
        <div className={s.usycProtoNote}>
          <em>Prototipo</em>
          <p>Caja + comprobante + reportes + proyección</p>
        </div>
      </div>
    </div>
  );
}

function UsycOps() {
  return (
    <div className={`${s.object} ${s.usycOps}`} aria-hidden>
      <div className={s.usycBuild}>
        <header>
          <small>USYC · armado</small>
          <em>en construcción</em>
        </header>
        <div className={s.usycBuildGrid}>
          <div data-on="1">
            <small>Caja</small>
            <b>Cobro</b>
            <p>Inscripción · cursos · servicios</p>
          </div>
          <div data-on="1">
            <small>Ticket</small>
            <b>Print</b>
            <p>Comprobante al momento</p>
          </div>
          <div data-on="1">
            <small>Data</small>
            <b>Save</b>
            <p>Queda registrado</p>
          </div>
        </div>
        <div className={s.usycBuildPipe}>
          <span>Escuela</span>
          <i />
          <span>Caja</span>
          <i />
          <span>Corte</span>
          <i />
          <span data-on="1">Reportes</span>
        </div>
        <ul>
          <li>
            <b>Proyección de pagos</b>
            <span>lista</span>
          </li>
          <li>
            <b>Corte por campus</b>
            <span>lista</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function UsycDone() {
  return (
    <div className={`${s.object} ${s.usycDone}`} aria-hidden>
      <div className={s.usycSummary}>
        <div className={s.usycMonitor}>
          <div className={s.usycBezel}>
            <div className={s.usycChrome}>
              <span />
              <span />
              <span />
              <b>USYC · caja</b>
            </div>
            <div className={s.usycBody}>
              <header>
                <div>
                  <small>Campus norte</small>
                  <b>Caja en vivo</b>
                </div>
                <em>Corte ok</em>
              </header>
              <div className={s.usycStats}>
                <div>
                  <small>Hoy</small>
                  <b>$86k</b>
                </div>
                <div>
                  <small>Tickets</small>
                  <b>42</b>
                </div>
                <div>
                  <small>Adeudos</small>
                  <b>11</b>
                </div>
              </div>
              <div className={s.usycRows}>
                <div>
                  <b>Inscripción</b>
                  <span>$12,400</span>
                </div>
                <div>
                  <b>Curso · diseño</b>
                  <span>$3,200</span>
                </div>
                <div>
                  <b>Servicio</b>
                  <span>$850</span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.usycStand} />
          <div className={s.usycBase} />
        </div>

        <div className={s.usycPaper}>
          <small>Proyección de pagos</small>
          <b>M. López</b>
          <ul>
            <li>
              <span>Sem 1</span>
              <strong>$2,400</strong>
            </li>
            <li>
              <span>Sem 2</span>
              <strong>$2,400</strong>
            </li>
            <li>
              <span>Sem 3</span>
              <strong>$2,400</strong>
            </li>
          </ul>
          <em>Entregada al alumno</em>
        </div>
      </div>
    </div>
  );
}

function DabookAsk() {
  return (
    <div className={`${s.object} ${s.dabookAsk}`} aria-hidden>
      <div className={s.dabookDream}>
        <small>El sueño</small>
        <b>Artistas emergentes</b>
        <p>Crecer en la industria · ser vistos · vender · conectar</p>
      </div>
      <div className={s.dabookScatter}>
        <div>CV suelto</div>
        <div>Curso en otra web</div>
        <div>Tienda aparte</div>
        <div>Pedidos a mano</div>
      </div>
      <footer className={s.dabookAskFoot}>
        <em>No un “sistema”</em>
        <span>Un e‑commerce para creadores</span>
      </footer>
    </div>
  );
}

function DabookSplit() {
  return (
    <div className={`${s.object} ${s.dabookSplit}`} aria-hidden>
      <div className={s.dabookProto}>
        <div className={s.dabookMember}>
          <small>Membresía</small>
          <b>Gratis</b>
          <ul>
            <li>Subir CV</li>
            <li>Ser contactado</li>
            <li>Perfil visible</li>
          </ul>
        </div>
        <div className={s.dabookSell}>
          <small>Vender</small>
          <ul>
            <li>Cursos · tu precio</li>
            <li>Artículos · escritura</li>
            <li>Físico o digital</li>
            <li>Seguimiento de pedidos</li>
          </ul>
        </div>
        <div className={s.dabookFlow}>
          <small>Flujo</small>
          <ol>
            <li>Perfil</li>
            <li>Publicar</li>
            <li>Vender</li>
            <li>Pedido</li>
            <li>Entrega</li>
          </ol>
        </div>
        <div className={s.dabookProtoNote}>
          <em>Prototipo</em>
          <p>Comunidad + e‑commerce · una sola plaza</p>
        </div>
      </div>
    </div>
  );
}

function DabookOps() {
  return (
    <div className={`${s.object} ${s.dabookOps}`} aria-hidden>
      <div className={s.dabookBuild}>
        <header>
          <small>Dabook · armado</small>
          <em>creciendo</em>
        </header>
        <div className={s.dabookBuildGrid}>
          <div data-on="1">
            <small>01</small>
            <b>CV</b>
            <p>Perfil y contacto</p>
          </div>
          <div data-on="1">
            <small>02</small>
            <b>Cursos</b>
            <p>Precio propio</p>
          </div>
          <div>
            <small>03</small>
            <b>Shop</b>
            <p>Físico · digital</p>
          </div>
        </div>
        <div className={s.dabookBuildPipe}>
          <span>Idea</span>
          <i />
          <span>Piezas</span>
          <i />
          <span data-on="1">Nuevas funciones</span>
          <i />
          <span>Lanzamiento</span>
        </div>
        <ul>
          <li>
            <b>Artículos / escritura</b>
            <span>en curso</span>
          </li>
          <li>
            <b>Seguimiento de pedidos</b>
            <span>en curso</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DabookDone() {
  return (
    <div className={`${s.object} ${s.dabookDone}`} aria-hidden>
      <div className={s.dabookSummary}>
        <div className={s.dabookMonitor}>
          <div className={s.dabookBezel}>
            <div className={s.dabookChrome}>
              <span />
              <span />
              <span />
              <b>Dabook · vitrina</b>
            </div>
            <div className={s.dabookBody}>
              <header>
                <div>
                  <small>Primer lanzamiento</small>
                  <b>Plaza del artista</b>
                </div>
                <em>Pronto</em>
              </header>
              <div className={s.dabookTiles}>
                <div>
                  <small>CV</small>
                  <b>Visible</b>
                </div>
                <div>
                  <small>Cursos</small>
                  <b>A la venta</b>
                </div>
                <div>
                  <small>Shop</small>
                  <b>Físico · digital</b>
                </div>
              </div>
              <div className={s.dabookRows}>
                <div>
                  <b>Membresía gratis</b>
                  <span>activa</span>
                </div>
                <div>
                  <b>Pedidos con seguimiento</b>
                  <span>lista</span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.dabookStand} />
          <div className={s.dabookBase} />
        </div>

        <div className={s.dabookCard}>
          <small>Artista</small>
          <b>Perfil · CV</b>
          <ul>
            <li>Cursos</li>
            <li>Artículos</li>
            <li>Contactar</li>
          </ul>
          <em>Creciendo pieza a pieza</em>
        </div>
      </div>
    </div>
  );
}

function GymAsk() {
  return (
    <div className={`${s.object} ${s.gymAsk}`} aria-hidden>
      <div className={s.gymSeed}>
        <small>Emprendimiento nuevo</small>
        <b>Empezar con control</b>
        <p>Página · gestión · clientes — desde el día uno</p>
      </div>
      <div className={s.gymFork}>
        <div data-bad="1">
          <small>Camino A</small>
          <b>Caos después</b>
          <em>arreglar tarde</em>
        </div>
        <div data-ok="1">
          <small>Camino B</small>
          <b>Orden ya</b>
          <em>elegido</em>
        </div>
      </div>
    </div>
  );
}

function GymSplit() {
  return (
    <div className={`${s.object} ${s.gymSplit}`} aria-hidden>
      <div className={s.gymProto}>
        <div className={s.gymPublic}>
          <small>Página pública</small>
          <ul>
            <li>Cómo está</li>
            <li>Promociones</li>
            <li>Comentarios</li>
            <li>Pagos / alta</li>
          </ul>
        </div>
        <div className={s.gymAdmin}>
          <small>Gestión interna</small>
          <ul>
            <li>Membresías</li>
            <li>Corte · próximo pago</li>
            <li>Seguimiento</li>
            <li>Quejas · soluciones</li>
            <li>Reportes</li>
          </ul>
        </div>
        <div className={s.gymFlow}>
          <small>Flujo</small>
          <ol>
            <li>Cliente</li>
            <li>Membresía</li>
            <li>Cobro</li>
            <li>Seguimiento</li>
            <li>Reporte</li>
          </ol>
        </div>
        <div className={s.gymProtoNote}>
          <em>Prototipo</em>
          <p>Vitrina + control · mismo núcleo</p>
        </div>
      </div>
    </div>
  );
}

function GymOps() {
  return (
    <div className={`${s.object} ${s.gymOps}`} aria-hidden>
      <div className={s.gymBuild}>
        <header>
          <small>Gym · armado</small>
          <em>en desarrollo</em>
        </header>
        <div className={s.gymBuildGrid}>
          <div data-on="1">
            <small>Sitio</small>
            <b>Vitrina</b>
            <p>Promos · comentarios</p>
          </div>
          <div data-on="1">
            <small>Ops</small>
            <b>Caja</b>
            <p>Membresía · cobro</p>
          </div>
          <div>
            <small>Data</small>
            <b>Reportes</b>
            <p>Clientes · quejas</p>
          </div>
        </div>
        <div className={s.gymBuildPipe}>
          <span>Idea</span>
          <i />
          <span>Página</span>
          <i />
          <span data-on="1">Gestión</span>
          <i />
          <span>Control</span>
        </div>
        <ul>
          <li>
            <b>Próximo pago · recomendaciones</b>
            <span>en curso</span>
          </li>
          <li>
            <b>Quejas y soluciones</b>
            <span>en curso</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function GymDone() {
  return (
    <div className={`${s.object} ${s.gymDone}`} aria-hidden>
      <div className={s.gymSummary}>
        <div className={s.gymMonitor}>
          <div className={s.gymBezel}>
            <div className={s.gymChrome}>
              <span />
              <span />
              <span />
              <b>Gym · gestión</b>
            </div>
            <div className={s.gymBody}>
              <header>
                <div>
                  <small>Control desde el inicio</small>
                  <b>Clientes activos</b>
                </div>
                <em>En vivo</em>
              </header>
              <div className={s.gymStats}>
                <div>
                  <small>Membresías</small>
                  <b>64</b>
                </div>
                <div>
                  <small>Por cobrar</small>
                  <b>7</b>
                </div>
                <div>
                  <small>Hoy</small>
                  <b>$18k</b>
                </div>
              </div>
              <div className={s.gymRows}>
                <div>
                  <b>A. Núñez</b>
                  <span>próximo 12</span>
                </div>
                <div>
                  <b>L. Soto</b>
                  <span>al día</span>
                </div>
                <div>
                  <b>Queja #04</b>
                  <span>resuelta</span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.gymStand} />
          <div className={s.gymBase} />
        </div>

        <div className={s.gymSite}>
          <small>Página pública</small>
          <b>Promos · voz</b>
          <ul>
            <li>Planes</li>
            <li>Comentarios</li>
            <li>Inscribirse</li>
          </ul>
          <em>Sin caos operativo</em>
        </div>
      </div>
    </div>
  );
}

function ChapterVisual({ kind }: { kind: ChapterVisual }) {
  if (kind === 'credi-ask') return <CrediAsk />;
  if (kind === 'credi-split') return <CrediSplit />;
  if (kind === 'credi-ops') return <CrediOps />;
  if (kind === 'credi-done') return <CrediDone />;
  if (kind === 'usyc-ask') return <UsycAsk />;
  if (kind === 'usyc-split') return <UsycSplit />;
  if (kind === 'usyc-ops') return <UsycOps />;
  if (kind === 'usyc-done') return <UsycDone />;
  if (kind === 'dabook-ask') return <DabookAsk />;
  if (kind === 'dabook-split') return <DabookSplit />;
  if (kind === 'dabook-ops') return <DabookOps />;
  if (kind === 'dabook-done') return <DabookDone />;
  if (kind === 'gym-ask') return <GymAsk />;
  if (kind === 'gym-split') return <GymSplit />;
  if (kind === 'gym-ops') return <GymOps />;
  return <GymDone />;
}

function chapterLines(text: Chapter['text']) {
  return typeof text === 'string' ? [text] : [...text];
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
    <section ref={root} className={s.work} id="desarrollo" aria-label="Desarrollo">
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
              {open.chapters.map((ch) => {
                const chapter = ch as Chapter;
                const lines = chapterLines(chapter.text);
                const copy = (
                  <div className={s.panelCopy}>
                    <p className={s.panelStep}>
                      {chapter.kind ?? `${chapter.step} · ${chapter.title}`}
                    </p>
                    <h3>{chapter.title}</h3>
                    {lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                );

                if (chapter.visual) {
                  return (
                    <article key={chapter.step} className={s.panel} data-rich="1">
                      <p className={s.colossus} aria-hidden>
                        {chapter.step}
                      </p>
                      <div className={s.body}>
                        {copy}
                        <ChapterVisual kind={chapter.visual} />
                      </div>
                    </article>
                  );
                }

                return (
                  <article key={chapter.step} className={s.panel}>
                    <p className={s.colossus} aria-hidden>
                      {chapter.step}
                    </p>
                    {copy}
                    {chapter.sketch ? (
                      <figure className={s.paper}>
                        <Sketch kind={chapter.sketch} />
                      </figure>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
          <span ref={ink} className={s.ink} aria-hidden />
        </div>
      ) : null}
    </section>
  );
}
