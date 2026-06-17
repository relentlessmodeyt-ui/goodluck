import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, Preload } from '@react-three/drei';
import { HeroX } from './components/HeroX.jsx';
import { Effects } from './components/Effects.jsx';
import { useLenisGsap } from './hooks/useLenisGsap.js';

const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

export default function App() {
  // Smooth scroll + ScrollTrigger + store bridge live at the app root.
  useLenisGsap();

  return (
    <>
      {/* Fixed, full-viewport canvas — the entire UI renders here. */}
      <Canvas
        className="webgl"
        // perf: clamp DPR, cap it harder on mobile; AdaptiveDpr drops it under load
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <color attach="background" args={['#0a0a0b']} />
        <AdaptiveDpr pixelated />

        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <Environment preset="city" />

          <HeroX position={[0, 0, 0]} />

          <Preload all />
        </Suspense>

        {!isMobile && <Effects />}
      </Canvas>

      {/* DOM scroll spacer + accessible content ScrollTrigger reads from.
          Keep real, crawlable text here for SEO + a11y; the canvas is the show. */}
      <main aria-label="YashxDaksh">
        <section style={{ height: '100vh' }} aria-label="Hero">
          <h1 className="sr-only">YashxDaksh — Creative Engineering Studio</h1>
        </section>
        <section style={{ height: '100vh' }} aria-label="Work" />
        <section style={{ height: '100vh' }} aria-label="Approach" />
        <section style={{ height: '100vh' }} aria-label="Contact" />
      </main>
    </>
  );
}
