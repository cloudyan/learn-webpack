const merge = require('webpack-merge')
const common = require('./webpack.config.default')

module.exports = merge(common, {
  optimization: {
    splitChunks: {
      chunks: 'async', // async initial all

      // 自定义
      // test，priority并且reuseExistingChunk只能在高速缓存组级别配置
      // 要禁用任何默认缓存组，请将它们设置为false。
      cacheGroups: {
        vendors: {
          // 如果name 是和默认的 vendors 同名，且优先级与默认相同，将不起作用，先注册的先起作用
          // 默认的 vendors 使用的chunks 是?
          // name: false, // 提供true将基于块和缓存组密钥自动生成一个名称
          name: 'vendors',
          // name (module, chunks, cacheGroupKey) {
          //   // generate a chunk name...
          //   return; // ...
          // }

          test: /[\\/]node_modules[\\/]/,

          // test(module, chunks) {
          //   //...
          //   return module.type === 'javascript/auto';
          // }

          // filename: '[name].bundle.js', // 仅在初始块 `chunks: 'initial'` 时才允许覆盖文件名
          priority: 1,

          // enforce: false, // 默认为 false
          // 开启将忽略splitChunks.minSize，splitChunks.minChunks，splitChunks.maxAsyncRequests和splitChunks.maxInitialRequests选项，只为这个高速缓存组创建块。
        },
        default: false,
      }
    }
  }
})

// 可以自定义 cacheGroups
