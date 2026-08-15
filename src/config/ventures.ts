/** Flip this when the Ventures call opens or closes. */
export const venturesCall = {
  open: false,
  season: '2026',
  slots: 2,
} as const;

export function callStatus() {
  return venturesCall.open
    ? {
        open: true as const,
        badge: 'Convocatoria abierta',
        lead: `Sintropía Ventures · ${venturesCall.slots} cupos · temporada ${venturesCall.season}`,
        note: `Abrimos cupos por temporada. Solo ${venturesCall.slots} proyectos al año. Ahora hay convocatoria abierta.`,
        cta: { href: '#contacto' as const, now: 'Aplicar', next: 'Escribirnos' },
        apply: { href: '/#contacto' as const, now: 'Aplicar a esta convocatoria', next: 'Escribirnos' },
      }
    : {
        open: false as const,
        badge: 'Convocatoria cerrada',
        lead: `Sintropía Ventures · temporada ${venturesCall.season} · cupos cerrados`,
        note: `Por ahora la convocatoria está cerrada. Déjanos tu WhatsApp o correo y te avisamos cuando abra la siguiente.`,
        cta: { href: '#contacto' as const, now: 'Avisarme', next: 'Escribirnos' },
        apply: { href: '/#contacto' as const, now: 'Avisarme', next: 'Escribirnos' },
      };
}
