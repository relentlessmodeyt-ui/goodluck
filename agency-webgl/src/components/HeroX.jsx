import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '../state/useScroll.js';

import vertexShader from '../shaders/heroX.vert.glsl';
import fragmentShader from '../shaders/heroX.frag.glsl';

// drei's shaderMaterial gives us a typed, declarative material with uniforms.
const HeroXMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uVelocity: 0,
    uMouse: new THREE.Vector3(),
    uMouseForce: 0,
    uColor: new THREE.Color('#0a0a0b'),
    uAccent: new THREE.Color('#ccff00'),
  },
  vertexShader,
  fragmentShader,
);
extend({ HeroXMaterial });

/**
 * The "x". A TorusKnot stands in for the real extruded glyph geometry
 * (swap in a GLTF of the typographic "x" from Blender for production).
 * Everything animates from the scroll store inside useFrame — zero React
 * re-renders per frame.
 */
export function HeroX(props) {
  const matRef = useRef();
  const meshRef = useRef();

  // High-segment geometry so vertex displacement reads smoothly.
  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(0.9, 0.32, 220, 36),
    [],
  );

  useFrame((state, delta) => {
    const { progress, velocity } = useScroll.getState();
    const m = matRef.current;
    if (!m) return;

    m.uniforms.uTime.value += delta;
    // lerp uniforms toward targets for buttery, non-jumpy motion
    m.uniforms.uProgress.value = THREE.MathUtils.lerp(m.uniforms.uProgress.value, progress, 0.1);
    m.uniforms.uVelocity.value = THREE.MathUtils.lerp(m.uniforms.uVelocity.value, velocity, 0.15);

    // mesh spins faster the harder you scroll (velocity-reactive)
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (0.2 + Math.abs(velocity) * 4.0);
      meshRef.current.rotation.x += delta * 0.05;
    }

    // map normalized pointer into object space for the cursor field
    m.uniforms.uMouse.value.set(state.pointer.x * 1.6, state.pointer.y * 1.6, 0.4);
    m.uniforms.uMouseForce.value = THREE.MathUtils.lerp(
      m.uniforms.uMouseForce.value,
      state.pointer.length() > 0 ? 1 : 0,
      0.08,
    );
  });

  return (
    <mesh ref={meshRef} geometry={geometry} {...props}>
      <heroXMaterial ref={matRef} key={HeroXMaterial.key} />
    </mesh>
  );
}
