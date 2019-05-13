const path = require('path');

console.log(1111);

class aa {
  constructor(options) {
    console.log(options);
  }
};

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, './'),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: 'https://img1.haoshiqi.net/',
    chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  // loader
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  // 插件
  plugins: [
    // new aa(),
    // new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
