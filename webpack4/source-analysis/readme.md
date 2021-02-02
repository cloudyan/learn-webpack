

compile的内部实现

```js
class Compiler extends Tapable {
  constructor(context) {
    super();
    this.hooks = {
      /** @type {SyncBailHook<Compilation>} */
      shouldEmit: new SyncBailHook(["compilation"]),
      /** @type {AsyncSeriesHook<Stats>} */
      done: new AsyncSeriesHook(["stats"]),
      /** @type {AsyncSeriesHook<>} */
      additionalPass: new AsyncSeriesHook([]),
      /** @type {AsyncSeriesHook<Compiler>} */
      ......
      ......
      some code
    };
    ......
    ......
    some code
}
```

如此就可以如下使用

```js
compiler.hooks.compile.tapAsync(
  'afterCompile',
  (compilation, callback) => {
    console.log('This is an example plugin!');
    console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

    // 使用 webpack 提供的 plugin API 操作构建结果
    compilation.addModule(/* ... */);

    callback();
  }
);
```

compilation的实现

```js
class Compilation extends Tapable {
  /**
   * Creates an instance of Compilation.
   * @param {Compiler} compiler the compiler which created the compilation
   */
  constructor(compiler) {
    super();
    this.hooks = {
      /** @type {SyncHook<Module>} */
      buildModule: new SyncHook(["module"]),
      /** @type {SyncHook<Module>} */
      rebuildModule: new SyncHook(["module"]),
      /** @type {SyncHook<Module, Error>} */
      failedModule: new SyncHook(["module", "error"]),
      /** @type {SyncHook<Module>} */
      succeedModule: new SyncHook(["module"]),

      /** @type {SyncHook<Dependency, string>} */
      addEntry: new SyncHook(["entry", "name"]),
      /** @type {SyncHook<Dependency, string, Error>} */
    }
  }
}
```

compiler和compilation一些比较重要的事件钩子

[compier](https://webpack.docschina.org/api/compiler-hooks/#failed)

| 事件钩子 | 触发时机 | 得到的内容 | 类型 |
| ------ | ----- | ------- | ------ |
| entry-option | 初始化 option | - | SyncBailHook |
| run | 开始编译 | compiler | AsyncSeriesHook |
| compile | 真正开始的编译，在创建 compilation 对象之前 | compilation 参数 | SyncHook |
| compilation | 生成好了 compilation 对象，可以操作这个对象啦 | compilation | SyncHook |
| make | 从 entry 开始递归分析依赖，准备对每个模块进行 build | compilation | AsyncParallelHook |
| after-compile | 编译 build 过程结束 | compilation | AsyncSeriesHook |
| emit | 在将内存中 assets 内容写到磁盘文件夹之前 | compilation | AsyncSeriesHook |
| after-emit | 在将内存中 assets 内容写到磁盘文件夹之后 | compilation | AsyncSeriesHook |
| done | 完成所有的编译过程 | stats | AsyncSeriesHook |
| failed | 编译失败的时候 | error | SyncHook |

[compilation](https://webpack.docschina.org/api/compilation-hooks/)

| 事件钩子 | 触发时机 | 得到的内容 | 类型 |
| ------ | ----- | ------- | ------ |
| normal-module-loader | 普通模块 loader，真正（一个接一个地）加载模块图(graph)中所有模块的函数。 | loaderContext, module | SyncHook |
| seal | 编译(compilation)停止接收新模块时触发。| - | SyncHook |
| optimize | 优化阶段开始时触发。| - | SyncHook |
| optimize-modules | 模块的优化| modules | SyncBailHook |
| optimize-chunks | 优化 chunk| chunks | SyncBailHook |
| additional-assets | 为编译(compilation)创建附加资源(asset)。| - | AsyncSeriesHook |
| optimize-chunk-assets | 优化所有 chunk 资源(asset)。| chunks | AsyncSeriesHook |
| optimize-assets | 优化存储在 compilation.assets 中的所有资源(asset)| assets | AsyncSeriesHook |

参考:

- https://zoumiaojiang.com/article/what-is-real-webpack-plugin/
- https://juejin.im/post/5c7d15bf6fb9a049ac79e536
- https://juejin.im/post/5c84a331e51d453a47623447
- https://segmentfault.com/a/1190000015917768
- https://lihuanghe.github.io/2016/05/30/webpack-source-analyse.html
