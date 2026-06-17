// ── YashxDaksh hero "x" vertex shader ───────────────────────────────
// Drives three behaviours from a single mesh:
//   1. uVelocity  -> high-frequency noise jitter (the "x" reacts to flick scrolls)
//   2. uProgress  -> a twist + morph as the page scrolls (rotates/stretches the form)
//   3. uMouse     -> local push/attract from the 3D cursor particle field
// Easing/feel is tuned to stay snappy; keep displacement small for legibility.

uniform float uTime;
uniform float uProgress;   // 0..1 page progress
uniform float uVelocity;   // -1..1 smoothed scroll velocity
uniform vec3  uMouse;      // cursor position in object space
uniform float uMouseForce; // 0..1 attract(-)/push(+) strength

varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisplace;

// ── Ashima simplex noise 3D (standard, GPL-compatible snoise) ────────
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// twist around the Y axis: more progress = more torsion
vec3 twist(vec3 p, float amount){
  float a = p.y * amount;
  float c = cos(a), s = sin(a);
  return vec3(c*p.x - s*p.z, p.y, s*p.x + c*p.z);
}

void main() {
  vec3 pos = position;

  // 1) scroll-velocity jitter — fast, high-freq, dies down when still
  float vmag = abs(uVelocity);
  float n = snoise(pos * 2.4 + uTime * (0.4 + vmag * 4.0));
  float jitter = n * (0.04 + vmag * 0.35);

  // 2) progress morph — twist the whole glyph as you scroll the page
  pos = twist(pos, uProgress * 3.14159);
  pos += normal * jitter;

  // 3) cursor field — radial push/attract, soft falloff
  vec3 toMouse = pos - uMouse;
  float d = length(toMouse);
  float influence = smoothstep(1.2, 0.0, d) * uMouseForce;
  pos += normalize(toMouse + 1e-4) * influence * 0.25;

  vDisplace = jitter + influence;
  vNormal = normalize(normalMatrix * normal);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
