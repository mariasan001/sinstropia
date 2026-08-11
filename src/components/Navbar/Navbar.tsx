'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import s from './Navbar.module.scss';

type NavItem = { label: string; href: string; tag?: string };

const nav: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Trabajo', href: '#projects' },
  { label: 'Hacemos', href: '#services' },
  { label: 'Productos', href: '#productos' },
  { label: 'Socios', href: '#socios', tag: 'Nuevo' },
  { label: 'Somos', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  const activeHref = '#inicio';

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        const mobile = window.matchMedia('(max-width: 860px)').matches;

        if (open || mobile) {
          setCompact(false);
        } else if (y < 60) {
          setCompact(false);
        } else if (delta > 6) {
          setCompact(true);
        } else if (delta < -6) {
          setCompact(false);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', open);
    return () => document.documentElement.classList.remove('nav-open');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={s.wrap}>
      <nav className={`${s.nav} ${compact && !open ? s.compact : ''} ${open ? s.navOpen : ''}`}>
        <Link href="/" className={s.logo} aria-label="Sintropía" onClick={close}>
          {compact && !open ? (
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

        {!compact && (
          <>
            <ul className={s.links}>
              {nav.map((item) => {
                const isActive = item.href === activeHref;
                return (
                  <li key={item.href} className={s.linkItem}>
                    <a href={item.href} className={`${s.link} ${isActive ? s.active : ''}`}>
                      {item.label}
                      {item.tag ? <em className={s.tag}>{item.tag}</em> : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            <a href="#contact" className={s.cta}>
              cotizar
            </a>
          </>
        )}

        <button
          type="button"
          className={`${s.burger} ${open ? s.burgerOpen : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>
      </nav>

      <div className={`${s.sheet} ${open ? s.sheetOpen : ''}`} aria-hidden={!open}>
        <div className={s.sheetInner}>
          <p className={s.sheetMeta}>
            <span className={s.swatch} aria-hidden>
              <i />
              <i />
              <i />
              <i />
            </span>
            Agencia digital
          </p>
          <ul className={s.sheetLinks}>
            {nav.map((item, i) => (
              <li key={item.href} style={{ '--i': i } as CSSProperties}>
                <a
                  href={item.href}
                  className={item.href === activeHref ? s.sheetActive : ''}
                  onClick={close}
                >
                  {item.label}
                  {item.tag ? <em className={s.tag}>{item.tag}</em> : null}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={s.sheetCta} onClick={close}>
            Escribirnos
          </a>
        </div>
      </div>
    </header>
  );
}
