// https://webpack.docschina.org/contribute/writing-a-plugin/#compiler-%E5%92%8C-compilation

class FileListPlugin {
  /* eslint class-methods-use-this: 0 */
  apply(compiler) {
    // emit 是异步 hook，使用 tapAsync 触及它，还可以使用 tapPromise/tap(同步)
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      // 在生成文件中，创建一个头部字符串：
      let filelist = 'In this build:\n\n'

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      const { assets } = compilation
      for (const filename in assets) {
        if ({}.hasOwnProperty.call(assets, filename)) {
          filelist += `- ${filename}\n`
        }
      }

      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets['filelist.md'] = {
        source() {
          return filelist
        },
        size() {
          return filelist.length
        },
      }

      callback()
    })
  }
}

module.exports = FileListPlugin
