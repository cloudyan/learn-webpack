const path = require('path');
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin');
const MyPlugin = require('./plugins/MyPlugin');
// const MyExampleWebpackPlugin = require('./plugins/MyExampleWebpackPlugin');
// const HelloCompilationPlugin = require('./plugins/HelloCompilationPlugin');
// const HelloAsyncPlugin = require('./plugins/HelloAsyncPlugin');
// const MyPlugin1 = require('./plugins/plugin-1');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, './'),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: 'https://img1.haoshiqi.net/',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
  },
  // loader
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  // 插件
  plugins: [
    new HelloWorldPlugin({ options: true }),
    new MyPlugin({ options: true }),
    // new MyExampleWebpackPlugin(),
    // new HelloCompilationPlugin(),
    // new HelloAsyncPlugin(),
    // new MyPlugin1(),
    // new HtmlWebpackPlugin({template: './src/index.html'})
  ],
};
