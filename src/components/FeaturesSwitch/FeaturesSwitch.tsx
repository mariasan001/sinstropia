import s from './FeaturesSwitch.module.scss';

const BRAND = {
  title: 'DA BOOK',
  subtitle:
    'El espacio donde artistas y creadores publican cursos, artículos, venden y definen sus propias reglas. Todo en un solo lugar, listo para escalar.',
  href: 'https://dabook.sintropia-dev.com/',
  cta: 'Explorar DaBook',
};

export default function FeaturesSwitch() {
  return (
    <section className={s.section} id="benefits" aria-label="DaBook highlight">
      <div className="container">
        <div className={s.wrap}>
          <h2 className={s.title}>{BRAND.title}</h2>
          <p className={s.subtitle}>{BRAND.subtitle}</p>

          <a
            href={BRAND.href}
            className={s.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            {BRAND.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
