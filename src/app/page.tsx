// src/app/page.tsx
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import FeaturesSwitch from '@/components/FeaturesSwitch/FeaturesSwitch';
export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSwitch />
    </>
  );
}
