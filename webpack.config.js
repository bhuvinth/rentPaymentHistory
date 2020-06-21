const webpack = require('webpack');

const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const tsconfig = require('./tsconfig.json');

const parseKey = key => key.match(/(@.*)\/\*$/)[1];
const parsePath = path => resolve('src/', path.replace(/\*$/, ''));
const mapModuleAlias = () => {
  const { paths } = tsconfig.compilerOptions;
  const entries = Object.entries(paths);
  return entries.reduce((results, [key, [path]]) => {
    Object.assign(results, {
      [parseKey(key)]: parsePath(path),
    });
    return results;
  }, {});
};

module.exports = {
  mode: 'production',
  entry: { main: './src/core/infrastructure/server.ts' },
  target: 'node',
  stats: 'errors-only',
  plugins: [new webpack.IgnorePlugin(/pg-native/, /\/pg\//)],
  resolve: {
    alias: mapModuleAlias(),
    extensions: ['.ts', '.mjs', '.js'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  externals: ['utf-8-validate', 'bufferutil', nodeExternals()],
};
