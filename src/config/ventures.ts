/** Flip this when the Ventures call opens or closes. */
export const venturesCall = {
  open: true,
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
        cta: { href: '#contact' as const, now: 'Aplicar', next: 'Escribirnos' },
        apply: { href: '/#contact' as const, now: 'Aplicar a esta convocatoria', next: 'Escribirnos' },
      }
    : {
        open: false as const,
        badge: 'Convocatoria cerrada',
        lead: `Sintropía Ventures · ${venturesCall.slots} cupos / año · temporada ${venturesCall.season}`,
        note: `Los cupos de esta temporada ya están tomados. Déjanos tu correo y te avisamos cuando abra la siguiente.`,
        cta: { href: '#contact' as const, now: 'Avisarme', next: 'Escribirnos' },
        apply: { href: '/#contact' as const, now: 'Avisarme cuando abra', next: 'Escribirnos' },
      };
}
