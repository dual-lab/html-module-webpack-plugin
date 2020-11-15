import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

import {main, module, dependencies, peerDependencies} from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];
const pkgExternal = [/@babel\/runtime/]
  .concat(Object.keys(dependencies))
  .concat(Object.keys(peerDependencies));

export default {
  input: 'src/public_api.ts',
  external: [...pkgExternal],
  output: [
    {file: main, format: 'cjs'},
    {file: module, format: 'es'}
  ],
  plugins: [
    json(),
    resolve({extensions}),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: ['@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime'],
      exclude: ['node_modules/**'],
      extensions
    })
  ]
};
