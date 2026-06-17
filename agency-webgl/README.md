# YashxDaksh — WebGL / R3F Creative-Engineering Build

A scroll-driven, shader-powered single-page experience built on **React Three
Fiber**. This is a real Vite project scaffold (the three core systems you asked
for are implemented; physics/audio/route-transitions are stubbed with clear
extension points).

> ⚠️ Not yet `npm install`-ed or built in CI — it's source you run locally.
> See **Deploy** below for how it coexists with the existing no-build GitHub
> Pages site.

## Run it

```bash
cd agency-webgl
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Architecture (data flow)

```
DOM scroll ──► Lenis (inertia) ──► gsap.ticker (single rAF)
                                        │
                                        ▼
                              ScrollTrigger.onUpdate
                          (progress + getVelocity, smoothed)
                                        │
                                        ▼
                         zustand store  useScroll  ◄─── read with getState()
                                        │                (NO react re-render)
                                        ▼
                            R3F useFrame in components
              ┌──────────────┬───────────────┬─────────────────┐
              ▼              ▼               ▼                 ▼
        HeroX shader   camera rig     Effects (CA/bloom)   physics world
        (uProgress,    (dolly by      (offset by           (impulses by
         uVelocity)     progress)      velocity)            velocity/tilt)
```

The golden rule: **scroll state never flows through React render** — it lives in
a zustand store read inside `useFrame`, so we stay at 60fps regardless of DOM.

## What's implemented

| System | File | Status |
| --- | --- | --- |
| Full-screen R3F canvas + perf guards | `src/App.jsx` | ✅ |
| Lenis + GSAP ScrollTrigger sync + velocity | `src/hooks/useLenisGsap.js` | ✅ |
| Scroll store bridge | `src/state/useScroll.js` | ✅ |
| Hero "x" vertex shader (velocity jitter + progress twist + cursor field) | `src/shaders/heroX.*.glsl` + `src/components/HeroX.jsx` | ✅ |
| Post-processing (chromatic aberration / bloom / noise) driven by velocity | `src/components/Effects.jsx` | ✅ |

## Roadmap for the remaining "tour de force" systems

**1. Custom GLSL page transitions (liquid distortion).**
Render the outgoing and incoming scenes to two `WebGLRenderTarget`s, then a
full-screen `ShaderPass` mixes them with a dudv/noise displacement map driven by
a 0→1 `uTransition` uniform you tween with GSAP. Hook it to a router
(`@tanstack/router` or a simple state machine) so navigation never reloads —
that's your "zero-loading SPA."

**2. Interactive 3D cursor particle system.**
`THREE.Points` (or drei `<Instances>`) following the pointer with spring lerp.
Feed the cursor world-position into a GPGPU/FBO sim (or a cheap per-particle
curl-noise + radial force) so particles push/attract. The `uMouse`/`uMouseForce`
uniforms in `HeroX` already accept the cursor field — extend the same vec3 to
DOM-projected elements.

**3. Physics (Rapier).**
Wrap the scene in `@react-three/rapier`'s `<Physics>`. Make headline letters
`<RigidBody>` colliders. On `deviceorientation`, set
`world.gravity = f(beta, gamma)` so elements fall/slide with device tilt; map
scroll velocity to impulses for the "flick to scatter" effect.

**4. Variable-font typography reacting to scroll speed.**
Use a variable font (e.g. *Roboto Flex* — has `wght` + `wdth` + `slnt` axes).
Subscribe a DOM/`troika-three-text` layer to `useScroll`, set
`fontVariationSettings` (or troika uniforms) from velocity:
`wght = lerp(300, 900, |v|)`, `wdth` widens on fast scroll.

**5. Ambient audio mapped to visuals.**
`THREE.AudioListener` + `AudioAnalyser`; or Web Audio `AnalyserNode`. Read the
frequency bins each frame and feed bass→bloom intensity, treble→CA offset.
Persistent **mute** toggle (start muted — autoplay policies + jury etiquette).

## Performance budget (the part that wins/loses the award)

- DPR clamped (`[1,2]` desktop, `[1,1.5]` mobile) + drei `<AdaptiveDpr>` to drop
  resolution under load.
- One rAF (gsap.ticker drives Lenis) — never two competing loops.
- Geometry instancing for particles; `disableNormalPass` on the composer.
- Lazy/`Suspense` + `<Preload all />`; compress GLTF with Draco/Meshopt, textures as KTX2.
- Target: **60fps desktop, ≥30fps mid mobile, <1.5s LCP, total payload < 3MB gz.**

## Mobile = adaptive, not responsive

`isMobile` already disables the post-processing stack. Go further: behind a
capability check (`navigator.deviceMemory`, GPU tier via `detect-gpu`), swap the
live shader scene for a **pre-rendered high-fidelity video loop** that reacts to
the gyroscope — same art direction, a fraction of the cost.

## Deploy

The repo's existing GitHub Pages workflow uploads the repo root **with no build
step** (and serves the current live site). This R3F app needs `npm run build`.
Two safe options that don't break the existing deploy:

- **A — Separate build job:** add a workflow that builds `agency-webgl/` and
  publishes `dist/` to a separate target (e.g. Netlify/Vercel, or a `gh-pages`
  branch / a `/webgl` path artifact). Keeps the static site untouched.
- **B — Commit `dist/`:** run `npm run build` and commit the output so the
  existing root-upload workflow serves it at `/agency-webgl/dist/`. Simplest,
  but you check in build artifacts.

I did **not** modify `deploy-pages.yml` — say which option you want and I'll wire it up.
