# learn-webpack

以前的内容，非常零碎，重新整理了下

- output-analysis 输出代码分析
- vscode-debug 如何使用 vscode 调试 webpack
- tapable 源码学习
- webpack-plugin 手写一个 plugin
- webpack-splitchunks 深入理解 splitChunks

这里有个资料不错，推荐下，浅显易懂，是极客时间《玩转 webpack》的课程。[课程源码](https://github.com/cpselvis/geektime-webpack-course)，全量提供了，感谢**程柳锋**

正如其名，可以让你实现从 0 到 1 玩转 webpack。

这里将 webpack 知识点结合《玩转 webpack》系统化重新整理下文档

我们可以带着问题来学习

1. webpack 是做什么的，为什么选择 webpack？
2. webpack 的 entry 和 output 都能配置什么？
3. 常见的 loaders 有哪些？做什么用的？执行顺序？为什么？
4. 常见的 plugins 有哪些？有什么用？
5. webpack 的热更新原理？
6. 文件指纹怎么配置？什么区别？什么是 HTTP 缓存失效？
7. sourceMap 都有哪些配置？应该怎么用？
8. 项目持续集成怎么做？都包含什么哪些检查项，整个过程怎么流转？
9. webpack 构建速度和体积优化策略？
   1. 怎么分析？怎么优化？为什么？
10. splitChunks 怎么配置的？分包策略有哪些？为什么？
11. webpack 的本质？打包原理是什么？tapable 是什么？
12. 如何手写 loader？loader 中怎么处理异步逻辑？
13. 如何手写 plugin？参数有哪些？整个 webpack 的流程是怎样的？涉及哪些 hooks？
14. webpack5 做了哪些优化？
15. 都说 vite bundleless 快？是快在哪里？vite 是如何实现这些支持的？

## 概念术语

webpack 中的所涉及的以下名词，都是指什么？官网解释[概念术语](https://webpack.docschina.org/glossary)，下面是总结介绍

- file: 最终打包生成的文件
- module: 是离散功能块[模块](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)，
  - 就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
  - webpack 中要加载的一切css img js和所有的依赖，每一个都可以看作是一个Module
- chunk: webpack 内部用来管理 building 过程。
  - 每一个打包落地的输出文件其实都是一个 chunk，每个 chunk 都包含很多 module
  - 默认的 chunk 数量实际上是由你的入口文件的数量决定的，但是如果你配置动态加载或者提取公共包的话，也会生成新的 chunk。
  - entry chunk: 入口代码块，包含了 webpack 运行时需要的一些函数，如 webpackJsonp, `__webpack_require__` 等以及依赖的一系列模块
  - normal chunk: 普通代码块没有包含运行时需要的代码，只包含模块代码，其结构由加载方式决定
  - initial chunk: 与入口代码块对应的一个概念是入口模块（module 0），如果入口代码块中包含了入口模块 webpack 会立即执行这个模块，否则会等待包含入口模块的代码块，**包含入口模块的代码块其实就是 initial chunk**。
- separate chunk 块hash
- assets: 就是那些将要被 webpack 输出的文件。它们可以是任何类型的文件，比如样式、图片或者 html 文件
- bundle: bundle 由 chunk 组成。是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。
  - 其中有几种类型（例如，入口 chunk(entry chunk) 和子 chunk(child chunk)）。
  - 通常 chunk 会直接对应所输出的 bundle，但是有一些配置并不会产生一对一的关系。
- Bundle Splitting: Bundle 分离，
- Code Splitting: 代码分割，指将代码分离到不同的 bundles/chunks 包/块里面，然后可以按需加载，而不是加载一个包含全部内容的单独包 bundle。
- Tree Shaking: 移除未使用/多余的代码，或者更准确地说，只导入引用的代码。
- plugin 一个含有 `apply` 属性的 JavaScript 对象。该 apply 属性会在 webpack 编译时被调用，并能在整个编译生命周期访问。
  - compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
  - compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
- [bundle 分析](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
- Dependency Graph: 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 依赖关系 。从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块。
- Manifest: 当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。
  - 了解如何提取 manifest
- 关于各种 hash 的区别
  - [hash] is a "unique hash generated for every build"
    - 每次构建的生成唯一的一个hash，且所有的文件hash串是一样的。
  - [chunkhash] is "based on each chunks' content"
    - 每一个文件最后的hash根据它引入的chunk决定（模块的 id 值为索引，如果变更，会导致不稳定性）
    - 可使用 new webpack.HashedModuleIdsPlugin() 来解决（将默认的数字 id 命名规则换成路径的方式）
    - umi使用了 HashedModuleIdsPlugin 来进行稳定的hash构建
  - [contenthash] is "generated for extracted content"
    - 根据抽取到的内容来生成hash，推荐

## 关于打包，拆包，为什么

分析参看 webpack4-splitChunks

## 其他分析

- [打包产物分析](https://github.com/cloudyan/learn-webpack/tree/master/packages/output-analysis#webpack-%E6%89%93%E5%8C%85%E4%BA%A7%E7%89%A9%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90)
- [关于模块加载](https://github.com/cloudyan/learn-webpack/tree/master/packages/output-analysis#%E5%85%B3%E4%BA%8E%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD)

## 关于调试 vscode or devtool

调试可以参见 [debugging](https://github.com/cloudyan/debugging)

也可以查看此项目中的各种用法

### 方法一

示例参见 [webpack4/demo1](https://github.com/cloudyan/learn-webpack/tree/master/packages/vscode-debug/demo1)

使用当前项目添加 `.vscode/launch.json` 以下配置，添加断点调用 `debug webpack` 调试 webpack

```js
// .vscode/launch.json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    // https://github.com/jerryni/blog/issues/32
    {
      "type": "node",
      "request": "launch",
      "name": "debug Webpack",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run-script",
        "debug"
      ],
      "port": 9229
    },

    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${file}"
    }
  ]
}

// package.json
// 这里注意不能简单的写webpack xxxx，要写上具体路径（./node_modules/webpack/bin/webpack.js）
  "scripts": {
    "debug": "node --nolazy --inspect-brk=9229 ./node_modules/webpack/bin/webpack.js --mode development --watch --config ./webpack.config.js",
  },
```

参考：

- https://github.com/jerryni/blog/issues/32
- https://stackoverflow.com/questions/47199993/debug-node-js-code-in-vs-code-bundled-with-webpack/47907413#47907413


### 方法二

参见 [webpack4/demo2](https://github.com/cloudyan/learn-webpack/tree/master/packages/vscode-debug/demo2)

vscode 全局设置 `setting.json` 配置以下项目，添加断点调用 `Launch Webpack` 调试 webpack

全局配置对每个项目都起效，但仍然建议使用项目内模式，配置更加灵活

```js
// setting.json
  "launch": {
    // https://medium.com/@jsilvax/debugging-webpack-with-vs-code-b14694db4f8e
    "configurations": [{
      "type": "node",
      "request": "launch",
      "name": "Launch Webpack",
      "program": "${workspaceFolder}/node_modules/webpack/bin/webpack.js"
      // "args": [
      //   默认为 `./webpack.config.js`
      //   "--config", "./webpack.config.js"
      // ],
      "env" : { "NODE_ENV" : "production" },
      // "envFile": "${workspaceFolder}/xxx.env",
    }]
  },

// package.json
  "scripts": {
    "dev": "webpack --config ./webpack.config.js",
  },
```

参考： https://medium.com/@jsilvax/debugging-webpack-with-vs-code-b14694db4f8e

### 方法三

使用 devtool 调试

```bash
node --inspect-brk ./node_modules/.bin/webpack

# 然后在浏览器里打开 chrome://inspect/#devices 进行 inspect 和断点。
# 上述命令会在第一行断点，不好的地方是，没有资源列表
```

参考资料：

- https://www.webpackjs.com/concepts/
- https://github.com/ruanyf/webpack-demos
- https://github.com/Microsoft/vscode-recipes
- https://github.com/liangklfangl/webpack-core-usage
- https://www.cnblogs.com/dashnowords/category/1284284.html
- [理解webpack4.splitChunks](https://www.cnblogs.com/kwzm/p/10314438.html)

常见 plugins

- copy-webpack-plugin
- vconsole-webpack-plugin
- vue-cli-plugin-vConsole
