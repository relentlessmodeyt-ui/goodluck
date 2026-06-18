"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { MorphingObject } from "./MorphingObject";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * The R3F canvas hosting the hero centerpiece, wrapped in a cinematic
 * post-processing stack (bloom glow + subtle chromatic aberration + vignette).
 * Loaded via dynamic import with ssr:false so the three.js bundle never ships
 * in the server payload, and it only mounts on the client after the preloader.
 */
export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const high = !isMobile;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 38 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <MorphingObject reduced={reduced} quality={high ? "high" : "low"} />

        {/* Cinematic grade. Full stack on desktop; a lean bloom + vignette on mobile. */}
        {high ? (
          <EffectComposer enableNormalPass={false} multisampling={4}>
            <Bloom intensity={0.9} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new Vector2(0.0006, 0.0009)}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.2} darkness={0.85} />
            <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.32} />
          </EffectComposer>
        ) : (
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <Bloom intensity={0.5} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur radius={0.6} />
            <Vignette eskil={false} offset={0.2} darkness={0.85} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
