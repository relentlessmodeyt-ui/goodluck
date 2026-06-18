"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Float,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { inSphere } from "maath/random";
import { useUIStore } from "@/store/useUIStore";
import { lerp } from "@/lib/utils";

type MorphingObjectProps = {
  reduced?: boolean;
  quality?: "high" | "low";
};

/** A drifting swarm of particles that orbits the orb like charged dust. */
function ParticleSwarm({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    inSphere(arr, { radius: 4.2 });
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#9db4ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * The brand's living centerpiece: a glass orb wrapped around a glowing core,
 * continuously morphing, refracting, and reacting to the pointer — then
 * transforming as the page scrolls. Our metaphor for "ideas becoming
 * digital experiences".
 */
export function MorphingObject({ reduced = false, quality = "high" }: MorphingObjectProps) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const high = quality === "high";

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { pointer } = state;
    const scroll = useUIStore.getState().scrollProgress;

    if (group.current) {
      const targetY = reduced ? 0 : pointer.x * 0.5;
      const targetX = reduced ? 0 : -pointer.y * 0.4;
      group.current.rotation.y = lerp(group.current.rotation.y, targetY + t * 0.1, 0.06);
      group.current.rotation.x = lerp(group.current.rotation.x, targetX, 0.06);

      // Scroll transforms the object: shrink + drift away as you leave the hero
      const s = 1 - Math.min(scroll * 2.2, 0.6);
      group.current.scale.setScalar(lerp(group.current.scale.x, s, 0.08));
      group.current.position.y = lerp(group.current.position.y, -scroll * 3, 0.08);
    }

    if (shell.current) {
      shell.current.rotation.y -= delta * 0.14;
      shell.current.rotation.z += delta * 0.05;
    }

    if (core.current && !reduced) {
      // pulsing energy core
      const pulse = 0.58 + Math.sin(t * 1.4) * 0.05;
      core.current.scale.setScalar(pulse);
    }
    if (coreMat.current && !reduced) {
      // intensity flicker the bloom picks up
      const i = 2.2 + Math.sin(t * 2.1) * 0.8 + Math.cos(t * 0.7) * 0.4;
      coreMat.current.color.setRGB((0.36 * i) / 2, (0.49 * i) / 2, i);
    }

    if (light.current && !reduced) {
      light.current.position.x = Math.sin(t * 0.5) * 5;
      light.current.position.z = Math.cos(t * 0.5) * 5;
    }
  });

  return (
    <group ref={group} scale={1.05}>
      <Float
        speed={reduced ? 0 : 1.5}
        rotationIntensity={reduced ? 0 : 0.4}
        floatIntensity={reduced ? 0 : 0.7}
      >
        {/* Glowing energy core — emissive so the bloom pass lights it up */}
        <mesh ref={core} scale={0.58}>
          <icosahedronGeometry args={[1.5, high ? 5 : 3]} />
          <meshBasicMaterial ref={coreMat} color="#5B7CFF" toneMapped={false} />
        </mesh>

        {/* The glass shell — morphs, refracts the core */}
        {high ? (
          <mesh>
            <icosahedronGeometry args={[1.5, 10]} />
            <MeshTransmissionMaterial
              transmission={1}
              thickness={1.4}
              roughness={0.06}
              ior={1.42}
              chromaticAberration={0.9}
              anisotropy={0.3}
              distortion={0.45}
              distortionScale={0.4}
              temporalDistortion={reduced ? 0 : 0.18}
              color="#aebfff"
              background={new THREE.Color("#05060a")}
              resolution={512}
              samples={6}
            />
          </mesh>
        ) : (
          <mesh>
            <icosahedronGeometry args={[1.5, 6]} />
            <MeshDistortMaterial
              color="#4a5fd8"
              roughness={0.08}
              metalness={0.9}
              distort={0.4}
              speed={reduced ? 0 : 1.8}
              envMapIntensity={1.2}
            />
          </mesh>
        )}

        {/* Faceted metallic outer shell */}
        <mesh ref={shell} scale={1.92}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.16}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {high && <ParticleSwarm count={420} reduced={reduced} />}

      {/* Lighting rig */}
      <ambientLight intensity={0.35} />
      <pointLight ref={light} position={[5, 3, 5]} intensity={70} color="#5B7CFF" distance={20} />
      <pointLight position={[-6, -3, -2]} intensity={45} color="#8B5CF6" distance={20} />
      <directionalLight position={[0, 5, 6]} intensity={1.3} color="#ffffff" />

      {/* In-scene environment map for reflections — no external HDR fetch */}
      <Environment resolution={high ? 256 : 128} frames={1}>
        <color attach="background" args={["#05060a"]} />
        <Lightformer intensity={2.4} position={[0, 4, -6]} scale={[10, 10, 1]} color="#5B7CFF" />
        <Lightformer intensity={1.6} position={[-5, -2, 4]} scale={[6, 6, 1]} color="#8B5CF6" />
        <Lightformer intensity={1.2} position={[6, 1, 3]} scale={[5, 5, 1]} color="#ffffff" />
      </Environment>
    </group>
  );
}
