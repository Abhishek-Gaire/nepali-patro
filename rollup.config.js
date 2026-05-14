import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const external = ['react', 'react-native'];

const plugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.build.json',
  }),
];

export default [
  // Web build (UMD)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'BarshikNepaliPatro',
      globals: {
        react: 'React',
      },
      sourcemap: true,
    },
    external,
    plugins,
  },

  // Web build (ESM)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },

  // Native build (UMD)
  {
    input: 'native.ts',
    output: {
      file: 'dist/native.js',
      format: 'umd',
      name: 'BarshikNepaliPatroNative',
      globals: {
        react: 'React',
        'react-native': 'ReactNative',
      },
      sourcemap: true,
    },
    external,
    plugins,
  },

  // Native build (ESM)
  {
    input: 'native.ts',
    output: {
      file: 'dist/native.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },

  // Core build (UMD)
  {
    input: 'core.ts',
    output: {
      file: 'dist/core.js',
      format: 'umd',
      name: 'BarshikNepaliPatroCore',
      sourcemap: true,
    },
    external: [],
    plugins,
  },

  // Core build (ESM)
  {
    input: 'core.ts',
    output: {
      file: 'dist/core.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external: [],
    plugins,
  },

  // Type definitions - Web
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },

  // Type definitions - Native
  {
    input: 'native.ts',
    output: [{ file: 'dist/native.d.ts', format: 'esm' }],
    plugins: [dts()],
  },

  // Type definitions - Core
  {
    input: 'core.ts',
    output: [{ file: 'dist/core.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
