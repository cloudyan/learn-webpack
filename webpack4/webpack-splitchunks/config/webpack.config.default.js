const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports =  {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/entry1.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    // 这里是默认配置
    splitChunks: {
      chunks: 'async',
      minSize: 30000, // 生成块的最小大小（以字节为单位）小于该值并不会被提取

      // maxSizeoptions适用于HTTP / 2和长期缓存。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快重建速度。
      // maxSize 享有比更高的优先权 maxInitialRequest/maxAsyncRequests。
      // 实际优先级为 maxInitialRequest/maxAsyncRequests < maxSize < minSize。
      maxSize: 0, // 大于此值会被再次拆分
      minChunks: 1, // 拆分前必须共享模块的最小块数
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 5, // 通过增加允许的请求数量选择加入HTTP2优化的拆分模式。一般浏览器仅支持6个HTTP1.1并行请求。
      // 入口点的最大并行请求数
      maxInitialRequests: 3, // 可增加以允许请求数量 比如增加到 20
      automaticNameDelimiter: '~', // 定界符,默认情况使用块的来源和名称生成(verdors~main.js)
      // 拆分块的名称。提供true将基于块和缓存组密钥自动生成一个名称。提供字符串或函数将允许您使用自定义名称。如果名称与入口点名称匹配，则入口点将被删除。这会导致 chunks 设置为 all, 产生多个 vendors-xxx 的命名提取
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 同时符合条件时，优先按权重高的规则处理
        },
        default: {
          minChunks: 2, // 将至少有两个chunk引入的模块进行拆分
          priority: -20,
          reuseExistingChunk: true // 这项默认是 true, 父子模块都引入同一模块，则父模块抽取，子模块移除
          // 如果当前块包含已从主捆绑包中拆分出的模块，则将重用它，而不是生成新的模块。这可能会影响块的结果文件名。
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new BundleAnalyzerPlugin(),
  ]
}
