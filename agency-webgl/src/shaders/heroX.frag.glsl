// Fresnel-lit accent material. Displacement (vDisplace) glows toward the
// accent colour so flick-scrolls "charge up" the glyph visually.
precision highp float;

uniform vec3  uColor;     // base ink
uniform vec3  uAccent;    // electric lime
uniform float uVelocity;

varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisplace;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPos);
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.5);

  // energy = static fresnel rim + dynamic displacement charge
  float energy = fresnel + vDisplace * 1.5 + abs(uVelocity) * 0.4;
  vec3 col = mix(uColor, uAccent, clamp(energy, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
