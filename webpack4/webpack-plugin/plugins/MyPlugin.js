// https://webpack.docschina.org/contribute/plugin-patterns/
// https://www.cnblogs.com/sampapa/p/6958166.html

const { SyncHook } = require('tapable')

// 关于 chunks modules dependencies files assets
class MyPlugin {
  /* eslint class-methods-use-this: 0 */
  apply(compiler) {

    // https://github.com/jerryOnlyZRJ/webpack-loader/blob/master/docs/webpack-plugin.md
    // 实例化自定义事件
    compiler.hooks.customHook = new SyncHook(['data'])

    compiler.hooks.environment.tap('CustomHook', () => {
      //广播自定义事件
      compiler.hooks.customHook.call(`It's my custom hook.`)
      console.log('@environment');
    })

    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {

      // 检测观察图
      // 在运行webpack中间件时，每个compilation都包含一个fileDependencies数组（正在监视的文件）和一个将观察文件路径映射到时间戳的fileTimestamps哈希。
      // 这些对于检测compilation中哪些文件已更改非常有用：
      // var changedFiles = Object.keys(compilation.fileTimestamps).filter(watchfile => {
      //   return (this.prevTimestamps[watchfile] || this.startTime) < (compilation.fileTimestamps[watchfile] || Infinity);
      // })

      // var changedChunks = compilation.chunks.filter(chunk => {
      //   var oldVersion = this.chunkVersions[chunk.name];
      //   this.chunkVersions[chunk.name] = chunk.hash;
      //   return chunk.hash !== oldVersion;
      // });
      // this.prevTimestamps = compilation.fileTimestamps;

      // Explore each chunk (build output):
      // 检索每个（构建输出的）chunk：compilation.chunks是块的集合（构建后将要输出的文件，即编译之后得到的结果）
      compilation.chunks && compilation.chunks.forEach(chunk => {
        // Explore each module within the chunk (built inputs):
        // 检索 chunk 中（内置输入的）的每个模块：chunk.modules是模块的集合（构建时webpack梳理出的依赖，即import、require的module）
        // 形象一点说：chunk.modules是原材料，下面的chunk.files才是最终的成品

        chunk.modules && chunk.modules.forEach(module => {
          console.log(module)
          // Explore each source file path that was included into the module:
          // 检索模块中包含的每个源文件路径：
          // module.fileDependencies就是具体的文件，最真实的资源【举例，在css中@import("reset.css")，这里的reset.css就是fileDependencie】
          module.fileDependencies && module.fileDependencies.forEach(filepath => {
            // 到这一步，就可以操作源文件了
            // 我们现在已经对源结构有不少了解……
          })
        })

        // Explore each asset filename generated by the chunk:
        // 检索由 chunk 生成的每个资源(asset)文件名：
        // 最终生成的文件的集合
        chunk.files && chunk.files.forEach(filename => {
          // Get the asset source for each file generated by the chunk:
          // source()可以得到每个文件的源码
          const source = compilation.assets[filename].source()
          // console.log(source) // 这里输出源码
        })
      })

      // callback在最后必须调用
      callback()
    })

    // https://github.com/jantimon/html-webpack-plugin
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...');

      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'MyPlugin',
        (data, cb) => {
          data.html += 'The Magic Footer'

          cb(null, data)
        }
      )
    })
  }
}

module.exports = MyPlugin