
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = {
  entry: {
    dll: [
      'react',
      'react-dom'
    ],
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, 'build/dll'),
    dll: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'build/dll/[name].json')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./build/dll/dll.json')
    }),
  ]
};
