import s from './Footer.module.scss';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Trabajo', href: '#projects' },
  { label: 'Hacemos', href: '#services' },
  { label: 'Productos', href: '#productos' },
  { label: 'Socios', href: '#socios' },
  { label: 'Somos', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className={s.wrap}>
      <div className={s.top}>
        <a href="#inicio" className={s.brand}>
          Sintropía
        </a>
        <nav aria-label="Pie">
          <ul className={s.links}>
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={s.bottom}>
        <p>México</p>
        <p>© {new Date().getFullYear()} Sintropía</p>
        <a href="mailto:hola@sintropia.mx">hola@sintropia.mx</a>
      </div>
    </footer>
  );
}
