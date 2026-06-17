import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// `base` is set for GitHub Pages project-site hosting under /goodluck/agency-webgl/.
// Override with `--base=/` for local/other hosting.
export default defineConfig({
  base: './',
  plugins: [glsl()],
  build: { target: 'esnext' },
});
