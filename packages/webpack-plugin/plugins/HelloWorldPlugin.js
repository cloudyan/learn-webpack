// https://webpack.js.org/contribute/writing-a-plugin/
// https://webpack.docschina.org/contribute/writing-a-plugin/
// https://webpack.docschina.org/contribute/writing-a-plugin/#compiler-%E5%92%8C-compilation
// https://webpack.docschina.org/api/plugins/

class HelloWorldPlugin {
  constructor(options) {
    this.options = options
  }

  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {

    // 指定要附加到的事件钩子函数
    compiler.hooks.emit.tapAsync(
      'ExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!');
        // console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

        // 使用 webpack 提供的 plugin API 操作构建结果
        // compilation.addModule(/* ... */);

        // 做一些异步的事情……
        setTimeout(function() {
          console.log('Done with async work...');
          callback();
        }, 1000);
      }
    );

    // 在 hook 被触及时，会将 stats 作为参数传入
    compiler.hooks.done.tap('HelloWorldPlugin', stats => {
      // stats is passed as argument when done hook is tapped.

      // debugger
      console.log('Hello World!')
      console.log(this.options)
    })

    // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
    compiler.hooks.compilation.tap('HelloCompilationPlugin', compilation => {
      // 现在，通过 compilation 对象，我们可以 tap(触及) 到各种可用的 hooks 了
      compilation.hooks.optimize.tap('HelloCompilationPlugin', () => {
        console.log('正在优化资源。');
      });
    });

    compiler.hooks.emit.tapPromise('HelloAsyncPlugin', compilation => {
      // 返回一个 Promise，在我们的异步任务完成时 resolve……
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          console.log('异步工作完成……');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = HelloWorldPlugin
