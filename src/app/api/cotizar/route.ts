import { NextResponse } from 'next/server';

type CotizarPayload = {
  nombre: string;
  whatsapp: string;
  negocio?: string;
  kind: string;
  kindLabel: string;
  budget: string;
  budgetLabel: string;
  idea: string;
};

function clean(value: unknown, max = 2000) {
  return String(value ?? '')
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  let body: Partial<CotizarPayload>;

  try {
    body = (await req.json()) as Partial<CotizarPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const payload: CotizarPayload = {
    nombre: clean(body.nombre, 120),
    whatsapp: clean(body.whatsapp, 40),
    negocio: clean(body.negocio, 160) || undefined,
    kind: clean(body.kind, 40),
    kindLabel: clean(body.kindLabel, 80),
    budget: clean(body.budget, 40),
    budgetLabel: clean(body.budgetLabel, 80),
    idea: clean(body.idea, 4000),
  };

  if (!payload.nombre || !payload.whatsapp || !payload.kind || !payload.budget || !payload.idea) {
    return NextResponse.json({ ok: false, error: 'Faltan campos' }, { status: 400 });
  }

  const lead = {
    source: 'sintropia-web',
    type: 'cotizar',
    createdAt: new Date().toISOString(),
    ...payload,
  };

  const webhook = process.env.COTIZAR_WEBHOOK_URL;

  if (webhook) {
    try {
      const upstream = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.COTIZAR_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.COTIZAR_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(lead),
      });

      if (!upstream.ok) {
        const text = await upstream.text().catch(() => '');
        console.error('[cotizar] webhook failed', upstream.status, text);
        return NextResponse.json(
          { ok: false, error: 'No pudimos registrar la cotización' },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error('[cotizar] webhook error', err);
      return NextResponse.json(
        { ok: false, error: 'No pudimos registrar la cotización' },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === 'development') {
    // Sin sistema aún: en local dejamos constancia para probar el flujo.
    console.info('[cotizar] lead (sin COTIZAR_WEBHOOK_URL)', lead);
  } else {
    console.error('[cotizar] missing COTIZAR_WEBHOOK_URL');
    return NextResponse.json(
      { ok: false, error: 'El sistema de cotizaciones no está configurado' },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
