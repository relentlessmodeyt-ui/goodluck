"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

interface MorphingObjectProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  reduced?: boolean;
  lite?: boolean;
}

/**
 * The hero centerpiece — a glass-and-metal orb that breathes, distorts and
 * reacts to the pointer, wrapped in an orbiting wireframe shell and a field of
 * light particles. As the user scrolls it recedes and spins down, guiding the
 * eye into the next section.
 */
export function MorphingObject({
  pointer,
  scroll,
  reduced = false,
  lite = false,
}: MorphingObjectProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current; // 0..1 hero scroll progress
    const px = reduced ? 0 : pointer.current.x;
    const py = reduced ? 0 : pointer.current.y;

    if (group.current) {
      // Pointer-led tilt with smooth damping.
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        px * 0.6 + t * 0.05,
        3,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -py * 0.4,
        3,
        delta
      );
      // Recede + drift as the hero scrolls away.
      const target = 1 - s * 0.55;
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, target, 3, delta));
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, -s * 1.6, 3, delta);
    }

    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12;
      shell.current.rotation.z += delta * 0.04;
    }
    if (core.current) {
      core.current.rotation.x += delta * 0.05;
    }

    // Volumetric-feeling lights chase the pointer.
    if (lightA.current) {
      lightA.current.position.x = THREE.MathUtils.damp(lightA.current.position.x, px * 4, 2, delta);
      lightA.current.position.y = THREE.MathUtils.damp(lightA.current.position.y, -py * 4 + 1, 2, delta);
    }
    if (lightB.current) {
      lightB.current.position.x = THREE.MathUtils.damp(lightB.current.position.x, -px * 4, 2, delta);
      lightB.current.position.y = THREE.MathUtils.damp(lightB.current.position.y, py * 4 - 1, 2, delta);
    }
  });

  return (
    <group ref={group}>
      {/* Reactive accent lighting */}
      <pointLight ref={lightA} color="#5B7CFF" intensity={45} distance={12} position={[3, 2, 4]} />
      <pointLight ref={lightB} color="#8B5CF6" intensity={40} distance={12} position={[-3, -2, 4]} />
      <ambientLight intensity={0.25} />

      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.4}
        floatIntensity={reduced ? 0 : 0.6}
      >
        {/* Morphing core */}
        <Icosahedron ref={core} args={[1.15, lite ? 8 : 16]}>
          <MeshDistortMaterial
            color="#0d1326"
            distort={reduced ? 0.12 : 0.4}
            speed={reduced ? 0 : 1.8}
            roughness={0.08}
            metalness={0.92}
            envMapIntensity={2}
          />
        </Icosahedron>

        {/* Orbiting wireframe shell */}
        <Icosahedron ref={shell} args={[1.9, 1]}>
          <meshBasicMaterial color="#5B7CFF" wireframe transparent opacity={0.16} />
        </Icosahedron>

        {!lite && (
          <Sparkles
            count={60}
            scale={6}
            size={2.2}
            speed={reduced ? 0 : 0.3}
            color="#8B5CF6"
            opacity={0.7}
          />
        )}
      </Float>
    </group>
  );
}
