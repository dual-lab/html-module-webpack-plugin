# html-module-webpack-plugin

Github action release| Github action wrap-up
:---: | :---: |
![Rel](https://github.com/dual-lab/html-module-webpack-plugin/workflows/html-module-webpack-plugin-ci/badge.svg)| ![main/master](https://github.com/dual-lab/html-module-webpack-plugin/workflows/html-module-webpack-plugin-main/badge.svg?branch=main%2Fmaster&event=push)|

## About this Repo


This repo contains a webpack plugin, that add the ```type='module'``` to 
html script tags.

## Install

User yout favorite package manager to install the latest version

```shell
yarn add @dual-lab/html--module-webpack-plugin --dev

```

or

```shell
npm i @dual-lab/html--module-webpack-plugin --save-dev

```

## Usage

Add this plugin after the _HtmlWebpackPlugin_

```js
{
  ...other options,
    plugin: [
      new HtmlWebpackPlugin(options),
      new HtmlModuleWebpackPlugin(options)
    ]
}

```

Plugin options :

- **exclude**: array of glob pattern exclude.
