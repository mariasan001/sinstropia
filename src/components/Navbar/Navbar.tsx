'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { HOME_SECTIONS, MAIN_NAV } from '@/config/nav';
import s from './Navbar.module.scss';

function Cta({
  className,
  href = `#${HOME_SECTIONS.cotizar.id}`,
  onClick,
}: {
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <a className={`${s.btn} ${className ?? ''} cursor-hover`} href={href} onClick={onClick}>
      <span className={s.fill} aria-hidden />
      <span className={s.label}>
        <span>Cotizar</span>
        <span>Empezar</span>
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
    </a>
  );
}

const nav = MAIN_NAV;

export default function Navbar() {
  const pathname = usePathname();
  const home = pathname === '/';
  const to = (href: string) => (home || !href.startsWith('#') ? href : `/${href}`);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  const activeHref = home ? `#${HOME_SECTIONS.inicio.id}` : '';

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

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;
    const btns = Array.from(document.querySelectorAll<HTMLElement>(`.${s.btn}`));
    const onMove = (e: PointerEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const box = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${((e.clientX - box.left) / box.width - 0.5) * 12}px`);
      btn.style.setProperty('--my', `${((e.clientY - box.top) / box.height - 0.5) * 12}px`);
    };
    const onLeave = (e: PointerEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    };
    btns.forEach((btn) => {
      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerleave', onLeave);
    });
    return () => {
      btns.forEach((btn) => {
        btn.removeEventListener('pointermove', onMove);
        btn.removeEventListener('pointerleave', onLeave);
      });
    };
  }, [open, compact]);

  return (
    <header className={s.wrap}>
      <nav className={`${s.nav} ${compact && !open ? s.compact : ''} ${open ? s.navOpen : ''}`}>
        <Link href="/" className={s.logo} aria-label="Sintropía" onClick={close}>
          {compact && !open ? (
            <span className={s.logoIcon}>
              <Image
                src="/img/fav-icon.webp"
                alt="Sintropía"
                fill
                className={s.markImg}
                sizes="14px"
              />
            </span>
          ) : (
            <span className={s.logoText}>
              <Image
                src="/img/logo_1.webp"
                alt="Sintropía"
                width={120}
                height={28}
                className={s.wordmarkImg}
                sizes="120px"
              />
            </span>
          )}
        </Link>

        {!compact && (
          <>
            <ul className={s.links}>
              {nav.map((item) => {
                const href = to(item.href);
                const isActive = item.href === activeHref;
                return (
                  <li key={item.href} className={s.linkItem}>
                    <a href={href} className={`${s.link} ${isActive ? s.active : ''}`}>
                      {item.label}
                      {item.tag ? <em className={s.tag}>{item.tag}</em> : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            <Cta className={s.cta} href={to(`#${HOME_SECTIONS.cotizar.id}`)} />
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
                  href={to(item.href)}
                  className={item.href === activeHref ? s.sheetActive : ''}
                  onClick={close}
                >
                  {item.label}
                  {item.tag ? <em className={s.tag}>{item.tag}</em> : null}
                </a>
              </li>
            ))}
          </ul>
          <Cta className={s.sheetCta} href={to(`#${HOME_SECTIONS.cotizar.id}`)} onClick={close} />
        </div>
      </div>
    </header>
  );
}
