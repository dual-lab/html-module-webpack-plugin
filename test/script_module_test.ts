import test from 'ava';
import {join} from 'path';
import {readFile} from 'fs/promises';
import {Configuration, webpack} from 'webpack';
import {HtmlModuleWebpackPlugin} from '../src/public_api';
const rimraf = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const FIXTURE_DIR = join(__dirname, '__fixture__');
const OUTPUT_DIR = join(__dirname, 'test_dist');
const HTML_PLUGIN_OPTION = {
  filename: 'index.html',
  inject: 'body',
  hash: false,
  showErrors: true,
  template: join(FIXTURE_DIR, 'index.html')
};
const WEBPACK_CONFIGURATION: Configuration = {
  mode: 'development',
  entry: {
    app: join(FIXTURE_DIR, 'entry.js'),
    polyfill: join(FIXTURE_DIR, 'polyfill.js'),
  },
  devtool: false,
  output: {
    filename: '[name].[contenthash].js',
    path: OUTPUT_DIR,
    module: true,
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  },
};

test('Add module attr to script tag', async (t) => {
  await webpackCompilationAsync();
  const html = await readOutput();
  t.regex(html, /script\s+.*?src\s*=\s*"(\/)?app\.[0-9a-z]*\.js"\s+type\s*=\s*"module"/i, 'app.js is loaded as module script');
  t.regex(html, /script\s+.*?src\s*=\s*"(\/)?polyfill\.[0-9a-z]*\.js">/i, 'app.js is loaded as module script');
});

test.after.always((t) => {
  rimraf.sync(OUTPUT_DIR);
})

async function webpackCompilationAsync() {
  return new Promise((res, rej) => {
    webpack({
      ...WEBPACK_CONFIGURATION,
      plugins: [
        new HtmlWebpackPlugin(HTML_PLUGIN_OPTION),
        new HtmlModuleWebpackPlugin({
          exclude: ['polyfill.*.js']
        })
      ]
    }, (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    })

  });
}

async function readOutput() {
  return readFile(join(OUTPUT_DIR, 'index.html'), 'utf8');
}
