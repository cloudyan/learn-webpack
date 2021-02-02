const merge = require('webpack-merge')
const common = require('./webpack.config.default')

module.exports = merge(common, {
  optimization: {
    splitChunks: {
      chunks: 'all', // async initial all

      // chunks(chunk): {
      //   // exclude `my-excluded-chunk`
      //   return chunk.name !== 'my-excluded-chunk';
      // },
    }
  }
})

// chunks的含义是拆分模块的范围，它有三个值async、initial和all。

// - async 表示只从异步加载的模块（动态加载import()）里面进行拆分
// - initial 表示只从入口模块进行拆分
// - all 表示以上两者都包括




