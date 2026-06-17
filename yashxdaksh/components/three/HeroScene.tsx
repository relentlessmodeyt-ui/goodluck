"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { MorphingObject } from "./MorphingObject";
import { useIsMobile } from "@/hooks/useIsMobile";

/** Cinematic camera that drifts gently with the pointer for parallax depth. */
function CameraRig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.current.x * 0.6, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -pointer.current.y * 0.4, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Self-contained studio reflections via lightformers — no external HDR fetch,
 * so it works offline and adds zero network weight.
 */
function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#05060a"]} />
      <Lightformer intensity={3} position={[0, 4, -6]} scale={[10, 4, 1]} color="#5B7CFF" />
      <Lightformer intensity={2} position={[-5, -1, -4]} scale={[6, 6, 1]} color="#8B5CF6" />
      <Lightformer intensity={1.5} position={[5, 2, 3]} scale={[6, 6, 1]} color="#ffffff" />
      <Lightformer intensity={2} form="ring" position={[0, 0, 4]} scale={3} color="#5B7CFF" />
    </Environment>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const isMobile = useIsMobile();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const vh = window.innerHeight;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / vh));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 38 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <MorphingObject pointer={pointer} scroll={scroll} reduced={reduced} lite={isMobile} />
        <StudioEnvironment />
        {!reduced && <CameraRig pointer={pointer} />}
      </Suspense>
    </Canvas>
  );
}
