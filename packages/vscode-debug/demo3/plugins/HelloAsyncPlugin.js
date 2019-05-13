class HelloAsyncPlugin {
  apply(compiler) {
    // tapAsync() 基于回调(callback-based)
    compiler.hooks.emit.tapAsync('HelloAsyncPlugin', function(compilation, callback) {
      setTimeout(function() {
        console.log('Done with async work...');
        callback();
      }, 1000);
    });

    // tapPromise() 基于 promise(promise-based)
    compiler.hooks.emit.tapPromise('HelloAsyncPlugin', (compilation) => {
      return doSomethingAsync()
        .then(() => {
          console.log('Done with async work...');
        });
    });

    // 原先基本的 tap() 也在这里列出：
    compiler.hooks.emit.tap('HelloAsyncPlugin', () => {
      // 这里没有异步任务
      console.log('Done with sync work...');
    });
  }
}

module.exports = HelloAsyncPlugin;
