'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import Image from 'next/image';
import gsap from 'gsap';
import s from './Preloader.module.scss';

type Props = { onDone: () => void };

export default function Preloader({ onDone }: Props) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    document.documentElement.classList.add('booting');

    const finish = () => {
      if (done.current) return;
      done.current = true;
      document.documentElement.classList.remove('booting');
      onDone();
    };

    if (reduce) {
      const t = window.setTimeout(() => {
        gsap.set(rootEl, { autoAlpha: 0, pointerEvents: 'none' });
        finish();
      }, 120);
      return () => window.clearTimeout(t);
    }

    const l = left.current;
    const r = right.current;
    const m = mark.current;
    const w = word.current;

    if (!l || !r || !m || !w) {
      finish();
      return;
    }

    const draw = { a: 0, b: 0 };

    const paint = () => {
      const pa = Math.round(draw.a * 100);
      const pb = Math.round(draw.b * 100);
      l.style.webkitMaskImage = `linear-gradient(to top, #000 ${pa}%, transparent ${pa}%)`;
      l.style.maskImage = `linear-gradient(to top, #000 ${pa}%, transparent ${pa}%)`;
      r.style.webkitMaskImage = `linear-gradient(to bottom, #000 ${pb}%, transparent ${pb}%)`;
      r.style.maskImage = `linear-gradient(to bottom, #000 ${pb}%, transparent ${pb}%)`;
    };

    gsap.set(m, { scale: 0.9, autoAlpha: 1 });
    gsap.set(w, { autoAlpha: 0, y: 28 });
    paint();

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: finish,
    });

    tl.to(m, { scale: 1, duration: 1.15, ease: 'power2.out' }, 0.08);
    tl.to(draw, { a: 1, duration: 1.05, ease: 'power2.inOut', onUpdate: paint }, 0.1);
    tl.to(draw, { b: 1, duration: 1.05, ease: 'power2.inOut', onUpdate: paint }, 0.22);

    tl.to(w, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.15');
    tl.to({}, { duration: 0.45 });

    tl.to([w, m], { autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, '+=0.05');
    tl.to(rootEl, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' }, '-=0.15');
    tl.set(rootEl, { pointerEvents: 'none' });

    return () => {
      tl.kill();
      document.documentElement.classList.remove('booting');
    };
  }, [onDone, reduce]);

  return (
    <div ref={root} className={s.root} aria-busy="true" aria-label="Cargando Sintropía">
      <div className={s.stage}>
        <div ref={mark} className={s.mark}>
          <div ref={left} className={`${s.half} ${s.halfLeft}`}>
            <Image
              src="/img/brand/mark-white.png"
              alt=""
              width={240}
              height={300}
              priority
              className={s.markImg}
            />
          </div>
          <div ref={right} className={`${s.half} ${s.halfRight}`}>
            <Image
              src="/img/brand/mark-white.png"
              alt=""
              width={240}
              height={300}
              priority
              className={s.markImg}
            />
          </div>
        </div>

        <div ref={word} className={s.word}>
          <Image
            src="/img/brand/wordmark-white.png"
            alt="Sintropía"
            width={320}
            height={54}
            priority
            className={s.wordmark}
          />
        </div>
      </div>
    </div>
  );
}
