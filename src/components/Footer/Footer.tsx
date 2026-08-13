'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { bindReveal } from '@/motion/reveal';
import s from './Footer.module.scss';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Desarrollo', href: '#projects' },
  { label: 'Hacemos', href: '#services' },
  { label: 'Productos', href: '#productos' },
  { label: 'Socios', href: '#socios' },
  { label: 'Somos', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const home = pathname === '/';
  const to = (href: string) => (home || !href.startsWith('#') ? href : `/${href}`);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    const ctx = gsap.context(() => {
      bindReveal(el, el.querySelectorAll(`.${s.top}, .${s.bottom}`), {
        start: 'top 92%',
        end: 'bottom top',
      });
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <footer ref={root} className={s.wrap}>
      <div className={s.top}>
        <a href={to('#inicio')} className={s.brand}>
          Sintropía
        </a>
        <nav aria-label="Pie">
          <ul className={s.links}>
            {links.map((item) => (
              <li key={item.href}>
                <a href={to(item.href)}>{item.label}</a>
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
