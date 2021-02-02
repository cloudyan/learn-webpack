const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
// const MyPlugin = require('./plugins/MyPlugin');

module.exports = {
  entry: {
    main: './src/main.js',
    runtime: './src/runtime.js',
  },
  mode: 'production', // 输出模式 默认production，`webpack --mode=production`
  // target: 'web', // 部署目标 默认 web，可选 node webworker async-node ...
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '',
    chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  // loader
  // module: {
  //   rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  // },
  optimization: {
    usedExports: true, // 标注 unused harmony exports
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"production"',
        }
      }
    ),
    new HtmlWebpackPlugin(
      {
        title: 'My App',
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        chunksSortMode: 'dependency',
      }
    ),
    // 依赖提取 manifest 功能，manifest.js 实在是太小了，以至于不值得再为一个小 js 增加资源请求数量
    // new InlineManifestWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/CNAME',
        to: './', // dist 根目录
        ignore: ['.*']
      }
    ]),
    // new MyPlugin(),
  ],
};
