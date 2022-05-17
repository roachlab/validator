import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

const name = pkg.name.replace(/^@[^/]+\//, '');
const dist = (file) => `dist/${file}`;

const bundle = (options) => ({
  ...options,
  input: 'index.ts',
  external: (id) => !/^[./]/.test(id),
});

export default defineConfig([
  bundle({
    plugins: [
      esbuild(),
    ],
    output: [
      { file: dist(`${name}.js`), format: 'cjs', sourcemap: true },
      { file: dist(`${name}.mjs`), format: 'es', sourcemap: true },
    ],
  }),
  bundle({
    plugins: [
      dts(),
    ],
    output: [
      { file: dist(`${name}.d.ts`), format: 'es' },
    ],
  }),
]);
