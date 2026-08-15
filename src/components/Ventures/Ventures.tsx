'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hide, playIn } from '@/motion/reveal';
import { callStatus, venturesCall } from '@/config/ventures';
import s from './Ventures.module.scss';

gsap.registerPlugin(ScrollTrigger);

const equity = [
  { level: 'Desarrollo + mentoría puntual', range: '10% – 15%' },
  { level: 'Desarrollo + estrategia + acompañamiento constante', range: '15% – 20%' },
  { level: 'Rol de socio operativo (casi co-founder técnico)', range: '20% – 25%+' },
] as const;

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
    <Link className={`${s.btn} ${s[variant]} cursor-hover`} href={href}>
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

export default function Ventures() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const status = callStatus();

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const heroBits = q(`.${s.heroCopy} > *`);
      hide(heroBits);
      playIn(heroBits);

      q(`.${s.block}`).forEach((block: Element) => {
        hide(block);
        ScrollTrigger.create({
          trigger: block,
          start: 'top 82%',
          onEnter: () => playIn(block),
          onEnterBack: () => playIn(block),
        });
      });
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
    <main ref={root} className={s.wrap}>
      <section className={s.hero} aria-label="Sintropía Ventures">
        <p className={s.ghost} aria-hidden>
          Ventures
        </p>
        <div className={s.heroInner}>
          <div className={s.heroCopy}>
            <p className={`${s.kicker} ${status.open ? s.open : s.closed}`}>{status.badge}</p>
            <h1>
              Escuchamos tu idea.
              Apostamos por ella.
            </h1>
            <p>
              Hay proyectos con un potencial enorme que no llegan a nacer por una sola
              razón: no hay presupuesto para construirlos. Sintropía Ventures es nuestra
              forma de cambiar eso.
            </p>
            <div className={s.actions}>
              <Btn
                href={status.apply.href}
                variant="primary"
                now={status.apply.now}
                next={status.apply.next}
              />
              {status.open ? (
                <Btn href="/#socios" variant="secondary" now="Volver" next="Socios" />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className={s.room}>
        <div className={s.inner}>
          <article className={s.block}>
            <p>
              Cuando encontramos un proyecto que realmente nos convence, nos volvemos parte
              de él. No como proveedores, como socios. Ponemos desarrollo, diseño, estrategia
              y mentoría —todo lo que normalmente costaría contratar a un equipo completo—
              a cambio de un porcentaje de equity en el proyecto.
            </p>
            <p>
              Tú traes la idea, la visión y las ganas de construirla. Nosotros traemos la
              capacidad de convertirla en un producto real.
            </p>
          </article>

          <article className={s.block}>
            <h2>¿Qué ponemos sobre la mesa?</h2>
            <ul>
              <li>
                <b>Desarrollo</b> completo de tu producto (apps, sistemas, plataformas web)
              </li>
              <li>
                <b>Diseño</b> de producto y experiencia
              </li>
              <li>
                <b>Estrategia</b> para darle forma y dirección al proyecto
              </li>
              <li>
                <b>Mentoría</b> continua a lo largo del camino
              </li>
            </ul>
            <p>
              No es una consultoría. No es un servicio que se paga y se olvida. Es un equipo
              que se juega el resultado contigo.
            </p>
          </article>

          <article className={s.block}>
            <h2>¿Y tú qué pones?</h2>
            <p>Este modelo funciona porque ambas partes arriesgan algo. De tu lado, buscamos:</p>
            <ul>
              <li>
                <b>Conocimiento del mercado o industria</b> donde va tu proyecto —que entiendas
                a quién le vendes y por qué
              </li>
              <li>
                <b>Contactos o acceso al mercado</b> —algún camino real hacia tus primeros
                clientes o usuarios, no partir de cero absoluto
              </li>
              <li>
                <b>Algo de inversión propia</b>, aunque sea mínima —no buscamos que financies
                todo el desarrollo, pero sí que también tengas algo en juego
              </li>
            </ul>
            <p>
              No buscamos solo una idea. Buscamos a alguien que ya esté parado en el terreno
              donde quiere construir.
            </p>
            <p>
              <b>¿Y qué tanto te vas a involucrar tú en el día a día?</b> Eso lo definimos caso
              por caso, según el proyecto y tu disponibilidad. Hay founders que llevan el
              negocio de cerca desde el día uno, y otros que se enfocan en la visión mientras
              nosotros llevamos más peso operativo. Lo hablamos en la evaluación inicial.
            </p>
          </article>

          <article className={s.block}>
            <h2>¿Cuánto equity pedimos?</h2>
            <p>
              El porcentaje depende de cuánto nos involucramos. Mientras más peso operativo
              llevemos, mayor es la participación:
            </p>
            <div className={s.table} role="table" aria-label="Niveles de equity">
              <div className={s.row} role="row">
                <span role="columnheader">Nivel de involucramiento</span>
                <span role="columnheader">Equity</span>
              </div>
              {equity.map((row) => (
                <div key={row.range} className={s.row} role="row">
                  <span role="cell">{row.level}</span>
                  <b role="cell">{row.range}</b>
                </div>
              ))}
            </div>
            <p>
              El número exacto se define en la evaluación inicial, junto contigo, según el
              alcance del proyecto y el nivel de compromiso de ambas partes.
            </p>
          </article>

          <article className={s.block}>
            <h2>¿Y si el proyecto no despega?</h2>
            <p>
              No todos los proyectos funcionan, y eso hay que tenerlo claro desde el inicio
              —de eso se trata apostar.
            </p>
            <p>
              <b>¿Cuándo se rompe la sociedad?</b> Si el proyecto lleva 6 meses sin avances
              reales o sin generar ingresos, nos sentamos a evaluar qué sigue: ajustar el
              rumbo, pausar, o cerrar la sociedad. No es una fecha límite rígida —es un punto
              de revisión honesta.
            </p>
            <p>
              <b>¿Qué pasa con el equity de Sintropía si se rompe?</b> El founder tiene la
              opción de recomprar el equity de Sintropía a un valor que se acuerda desde el
              inicio. Así puedes recuperar el control completo sin quedar atado
              indefinidamente.
            </p>
            <p>
              <b>¿Hay un periodo de prueba?</b> Depende del proyecto. En algunos casos
              empezamos con una etapa inicial corta para validar que la sociedad funciona
              para ambas partes, antes de firmar los términos definitivos de equity.
            </p>
          </article>

          <article className={s.block}>
            <h2>Reglas del acuerdo</h2>
            <ul>
              <li>
                <b>Exclusividad.</b> Mientras dure la sociedad, el proyecto trabaja
                exclusivamente con Sintropía para desarrollo, diseño y estrategia de producto.
                Si esto no se respeta, Sintropía puede terminar la sociedad.
              </li>
              <li>
                <b>El equity se gana con el tiempo (vesting).</b> Ni el % de Sintropía ni el
                compromiso del founder se dan por hecho desde el día uno —se van ganando
                conforme el trabajo avanza.
              </li>
              <li>
                <b>Si el founder deja de cumplir su parte</b> (mercado, contactos, inversión
                acordada), pierde parte del equity que había ganado hasta ese punto,
                proporcional a lo que dejó de aportar.
              </li>
              <li>
                <b>Si Sintropía deja de cumplir su parte</b> (desarrollo, diseño, mentoría),
                el vesting se detiene y deja de ganar el porcentaje que aún no se había
                consolidado.
              </li>
              <li>
                <b>Propiedad intelectual del código.</b> El código y el producto pertenecen al
                proyecto/empresa que se forma entre ambas partes —un activo compartido, en la
                misma línea que el equity.
              </li>
              <li>
                <b>Si el proyecto se vende,</b> Sintropía cobra su porcentaje correspondiente
                sobre el valor de la venta.
              </li>
            </ul>
            <p className={s.note}>
              Estas reglas son la base del acuerdo. La versión final y legalmente vinculante
              debe formalizarse con un abogado antes de firmar con cualquier proyecto.
            </p>
          </article>

          <article className={s.block}>
            <h2>¿Cómo funciona?</h2>
            <ol className={s.flow}>
              <li>
                <b>Aplicas.</b> Nos cuentas tu proyecto: qué problema resuelve, para quién, y
                por qué crees que tiene potencial.
              </li>
              <li>
                <b>Evaluamos.</b> Buscamos un problema real, espacio para crecer, un founder
                que conozca el mercado, acceso a primeros clientes, viabilidad técnica y una
                forma identificable de generar ingresos.
              </li>
              <li>
                <b>Construimos juntos.</b> Si tu proyecto entra, nos volvemos socios.
                Definimos el porcentaje de equity, armamos el plan de trabajo, y nos ponemos
                a construir.
              </li>
            </ol>
          </article>

          <article className={`${s.block} ${s.close}`}>
            <h2>Sintropía Ventures no es para todos</h2>
            <p>
              Abrimos cupos por temporada, no de forma permanente. Elegimos pocos proyectos a
              la vez para poder meterle el nivel de compromiso que este modelo requiere.
            </p>
            <p>
              <b>Aceptamos solo {venturesCall.slots} proyectos al año.</b> Así podemos
              meterle el tiempo, la atención y los recursos que un proyecto de este nivel
              realmente necesita.
            </p>
            <div className={s.cta}>
              <p>
                {status.open
                  ? '¿Tienes un proyecto ambicioso y crees que puede ser el siguiente?'
                  : 'La convocatoria de esta temporada está cerrada. Te avisamos cuando abra la siguiente.'}
              </p>
              <Btn
                href={status.apply.href}
                variant="primary"
                now={status.apply.now}
                next={status.apply.next}
              />
              <p className={s.foot}>
                Sintropía Ventures es una iniciativa de Sintropía, agencia de desarrollo de
                aplicaciones móviles, sistemas y plataformas web.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
