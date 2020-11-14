require('@dual-lab/bast').install({
  extensions: ['.ts'],
  babelrc: false,
  sourceMaps: false,
  presets: [['@babel/preset-env', {targets: {node: true}}], '@babel/preset-typescript']
});
