'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import s from './Navbar.module.scss';

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Servicios', href: '#services' },
  { label: 'Somos', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // mock activo (luego hacemos scrollspy real)
  const activeHref = '#inico';

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        const goingDown = delta > 6;
        const goingUp = delta < -6;

        if (y < 60) setCompact(false);
        else if (goingDown) setCompact(true);
        else if (goingUp) setCompact(false);

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={s.wrap}>
      <nav className={`${s.nav} ${compact ? s.compact : ''}`}>
        {/* LOGO (siempre visible) */}
        <Link href="/" className={s.logo} aria-label="Sintropía">
          {compact ? (
            <span className={s.logoIcon}>
              <Image
               
                src="/img/fav-icon.png"
                alt="Sintropía"
                fill
                priority
                className={s.markImg}
                sizes="14px"
              />
            </span>
          ) : (
            <span className={s.logoText}>
              <Image
                 src="/img/logo_1.png"
                alt="SintroPIA"
                width={100}
                height={1}
                priority
                className={s.wordmarkImg}
              />
            </span>
          )}
        </Link>

        {/* ✅ En compacto NO renderizamos links ni CTA */}
        {!compact && (
          <>
            <ul className={s.links}>
              {nav.map((item) => {
                const isActive = item.href === activeHref;
                return (
                  <li key={item.href} className={s.linkItem}>
                    <a href={item.href} className={`${s.link} ${isActive ? s.active : ''}`}>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <a href="#contact" className={s.cta}>
contactar
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
