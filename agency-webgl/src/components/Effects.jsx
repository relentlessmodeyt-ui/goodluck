import { EffectComposer, ChromaticAberration, Noise, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from '../state/useScroll.js';

/**
 * Post-processing stack. Chromatic aberration offset is driven by scroll
 * velocity so the whole frame "smears" on fast scrolls — the cheap, reliable
 * way to get the liquid/RGB-split transition feel without a full-screen
 * custom pass between routes. (For true page-to-page liquid distortion,
 * add a custom ShaderPass that mixes two render targets via a noise/dudv map.)
 */
export function Effects() {
  const caRef = useRef();

  useFrame(() => {
    const { velocity } = useScroll.getState();
    if (caRef.current) {
      const o = 0.0008 + Math.abs(velocity) * 0.004;
      caRef.current.offset = new THREE.Vector2(o, o);
    }
  });

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom intensity={0.35} luminanceThreshold={0.6} mipmapBlur />
      <ChromaticAberration ref={caRef} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.2} darkness={0.85} />
    </EffectComposer>
  );
}
