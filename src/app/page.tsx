// src/app/page.tsx
import Navbar from '@/components/Navbar/Navbar';
import s from './page.module.scss';
import Hero from '@/components/Hero/Hero';
import FeaturesSwitch from '@/components/FeaturesSwitch/FeaturesSwitch';

const services = [
  { t: 'Landing & Branding', d: 'Sitios listos para convertir y verse premium.' },
  { t: 'Sistemas Web', d: 'Dashboards, roles, flujos y tablas avanzadas.' },
  { t: 'UI Kit / Design System', d: 'Tokens, componentes y consistencia total.' },
  { t: 'Optimización', d: 'Performance, SEO técnico y accesibilidad.' },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
        <FeaturesSwitch />


    </>
  );
}
