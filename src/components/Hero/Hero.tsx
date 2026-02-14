// src/components/Hero/Hero.tsx
import s from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={s.hero} id="start" aria-label="Hero Sintropía">
      <div className={s.inner}>
        {/* Top pill */}
        <div className={s.topPill}>
          <span className={s.newTag}>SINTRO</span>
          <span className={s.topText}>
            Tu idea nace en blanco. Nosotros la volvemos producto: diseño, desarrollo y lanzamiento.
          </span>
          <span className={s.chev} aria-hidden="true">›</span>
        </div>

        {/* Title */}
        <h1 className={s.title}>
          Convertimos visión
          <br />
          en <span className={s.highlight}>sistemas reales</span>
        </h1>

        {/* Subtitle */}
        <p className={s.subtitle}>
          Creamos sistemas web y aplicaciones móviles con intención: experiencia clara, estructura sólida
          y despliegue sin caos. 
        </p>

        {/* CTAs */}
        <div className={s.actions}>
          <a className={s.primaryBtn} href="#contact">
            <span className={s.btnIcon} aria-hidden="true">✦</span>
            Contactar
          </a>

          <a className={s.secondaryBtn} href="#projects">
            <span className={s.btnIcon} aria-hidden="true">⌁</span>
            Ver proyectos
          </a>
        </div>
      </div>
    </section>
  );
}
