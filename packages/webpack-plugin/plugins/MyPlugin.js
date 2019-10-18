// https://webpack.docschina.org/contribute/plugin-patterns/

class MyPlugin {
  /* eslint class-methods-use-this: 0 */
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      // 检索每个（构建输出的）chunk：
      compilation.chunks && compilation.chunks.forEach(chunk => {
        // 检索 chunk 中（内置输入的）的每个模块：
        chunk.modules && chunk.modules.forEach(module => {
          // 检索模块中包含的每个源文件路径：
          module.fileDependencies && module.fileDependencies.forEach(filepath => {
            // 我们现在已经对源结构有不少了解……
          })
        })

        // 检索由 chunk 生成的每个资源(asset)文件名：
        chunk.files && chunk.files.forEach(filename => {
          // Get the asset source for each file generated by the chunk:
          const source = compilation.assets[filename].source()
          // console.log(source) // 这里输出源码
        })
      })

      callback()
    })
  }
}

module.exports = MyPlugin
