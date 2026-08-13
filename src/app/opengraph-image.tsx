import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/config/seo';

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#17181C',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: '#7753F5',
            }}
          />
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Sistemas, apps y páginas web en México
          </div>
          <div
            style={{
              color: '#D9D9D9',
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 760,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              color: '#C1FF72',
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            sintropia.mx
          </span>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 14,
              backgroundColor: '#7753F5',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
