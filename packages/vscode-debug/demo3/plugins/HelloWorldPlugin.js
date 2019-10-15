// https://webpack.js.org/contribute/writing-a-plugin/
// https://webpack.docschina.org/contribute/writing-a-plugin/
// https://webpack.docschina.org/api/plugins/

class HelloWorldPlugin {
  constructor(options) {
    this.options = options;
  }

  // apply 方法是必须要有
  // apply 方法会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问
  apply(compiler) {
    console.log(compiler);

    // compiler.plugin('run', function(compiler, callback) {
    //   console.log('webpack 构建过程开始！！！');

    //   callback();
    // });

    debugger;

    compiler.hooks.entryOption.tap('HelloWorldPlugin2', xx => {
      console.log(xx);
      console.log('entryOption');
    });

    // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
    compiler.hooks.compilation.tap('HelloCompilationPlugin', compilation => {
      // 现在，通过 compilation 对象，我们可以 tap(触及) 到各种可用的 hooks 了
      compilation.hooks.optimize.tap('HelloCompilationPlugin', () => {
        console.log('正在优化资源。');
      });
    });

    compiler.hooks.done.tap('HelloWorldPlugin', stats => {
      // 在 hook 被触及时，会将 stats 作为参数传入
      // stats is passed as argument when done hook is tapped.
      console.log('Hello World!');
      console.log(this.options);
    });

    // compiler.hooks.compile.tap('MyPlugin', params => {
    //   console.log('以同步方式触及 compile 钩子。');
    // });

    // compiler.hooks.run.tapAsync(
    //   'MyPlugin',
    //   (source, target, routesList, callback) => {
    //     console.log('以异步方式触及 run 钩子。');
    //     typeof callback === 'function' && callback();
    //   }
    // );

    // compiler.hooks.run.tapPromise('MyPlugin', (source, target, routesList) => {
    //   return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
    //     console.log('以具有延迟的异步方式触及 run 钩子。');
    //   });
    // });

    // compiler.hooks.run.tapPromise(
    //   'MyPlugin',
    //   async (source, target, routesList) => {
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     console.log('以具有延迟的异步方式触及 run 钩子。');
    //   }
    // );
  }
}

module.exports = HelloWorldPlugin;
