/* =========================================================
   APEX SKYLINE · JHUNJHUNU — animated shader background
   Vanilla WebGL port of the ShaderBackground React component.
   Drives two canvases:
     #shader-bg    -> full-window backdrop behind the whole site
     #hero-shader  -> scoped to the hero (glows in the space the
                      heart/brain used to occupy), screen-blended
   Degrades gracefully: no WebGL -> no-op; reduced-motion -> single frame.
   ========================================================= */
(function () {
  'use strict';

  var vsSource = [
    'attribute vec4 aVertexPosition;',
    'void main() { gl_Position = aVertexPosition; }'
  ].join('\n');

  var fsSource = [
    'precision highp float;',
    'uniform vec2 iResolution;',
    'uniform float iTime;',
    '',
    'const float overallSpeed = 0.2;',
    'const float gridSmoothWidth = 0.015;',
    'const float axisWidth = 0.05;',
    'const float majorLineWidth = 0.025;',
    'const float minorLineWidth = 0.0125;',
    'const float majorLineFrequency = 5.0;',
    'const float minorLineFrequency = 1.0;',
    'const vec4 gridColor = vec4(0.5);',
    'const float scale = 5.0;',
    'const vec4 lineColor = vec4(0.4, 0.2, 0.8, 1.0);',
    'const float minLineWidth = 0.01;',
    'const float maxLineWidth = 0.2;',
    'const float lineSpeed = 1.0 * overallSpeed;',
    'const float lineAmplitude = 1.0;',
    'const float lineFrequency = 0.2;',
    'const float warpSpeed = 0.2 * overallSpeed;',
    'const float warpFrequency = 0.5;',
    'const float warpAmplitude = 1.0;',
    'const float offsetFrequency = 0.5;',
    'const float offsetSpeed = 1.33 * overallSpeed;',
    'const float minOffsetSpread = 0.6;',
    'const float maxOffsetSpread = 2.0;',
    'const int linesPerGroup = 16;',
    '',
    '#define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))',
    '#define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))',
    '#define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))',
    '#define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))',
    '',
    'float drawGridLines(float axis) {',
    '  return drawCrispLine(0.0, axisWidth, axis)',
    '        + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)',
    '        + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);',
    '}',
    '',
    'float drawGrid(vec2 space) {',
    '  return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));',
    '}',
    '',
    'float random(float t) {',
    '  return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;',
    '}',
    '',
    'float getPlasmaY(float x, float horizontalFade, float offset) {',
    '  return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;',
    '}',
    '',
    'void main() {',
    '  vec2 fragCoord = gl_FragCoord.xy;',
    '  vec4 fragColor;',
    '  vec2 uv = fragCoord.xy / iResolution.xy;',
    '  vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;',
    '',
    '  float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);',
    '  float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);',
    '',
    '  space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);',
    '  space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;',
    '',
    '  vec4 lines = vec4(0.0);',
    '  vec4 bgColor1 = vec4(0.1, 0.1, 0.3, 1.0);',
    '  vec4 bgColor2 = vec4(0.3, 0.1, 0.5, 1.0);',
    '',
    '  for(int l = 0; l < linesPerGroup; l++) {',
    '    float normalizedLineIndex = float(l) / float(linesPerGroup);',
    '    float offsetTime = iTime * offsetSpeed;',
    '    float offsetPosition = float(l) + space.x * offsetFrequency;',
    '    float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;',
    '    float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;',
    '    float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);',
    '    float linePosition = getPlasmaY(space.x, horizontalFade, offset);',
    '    float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);',
    '',
    '    float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;',
    '    vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));',
    '    float circle = drawCircle(circlePosition, 0.01, space) * 4.0;',
    '',
    '    line = line + circle;',
    '    lines += line * lineColor * rand;',
    '  }',
    '',
    '  fragColor = mix(bgColor1, bgColor2, uv.x);',
    '  fragColor *= verticalFade;',
    '  fragColor.a = 1.0;',
    '  fragColor += lines;',
    '',
    '  gl_FragColor = fragColor;',
    '}'
  ].join('\n');

  function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error: ', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function initProgram(gl) {
    var vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    var fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Shader program link error: ', gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // sizeFn returns {w, h} in device pixels for this canvas
  function startShader(canvas, sizeFn) {
    if (!canvas) return;
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { console.warn('WebGL not supported — shader disabled.'); return; }

    var program = initProgram(gl);
    if (!program) return;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    var loc = {
      pos: gl.getAttribLocation(program, 'aVertexPosition'),
      res: gl.getUniformLocation(program, 'iResolution'),
      time: gl.getUniformLocation(program, 'iTime')
    };

    function resize() {
      var s = sizeFn();
      var w = Math.max(1, Math.round(s.w));
      var h = Math.max(1, Math.round(s.h));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('load', resize); // hero size needs the image laid out
    resize();

    function draw(t) {
      resize();
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform1f(loc.time, t);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(loc.pos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    if (reduce) { draw(8.0); return; }
    var start = Date.now();
    (function render() {
      draw((Date.now() - start) / 1000);
      requestAnimationFrame(render);
    })();
  }

  // full-window backdrop
  startShader(document.getElementById('shader-bg'), function () {
    return { w: window.innerWidth, h: window.innerHeight };
  });

  // hero-scoped layer (fills the space where the heart/brain were)
  var hero = document.getElementById('hero-shader');
  startShader(hero, function () {
    var r = hero.getBoundingClientRect();
    return { w: r.width || window.innerWidth, h: r.height || (window.innerWidth * 0.546) };
  });
})();
