# learn-webpack

学习 webpack4

- config-usage 配置使用，关键配置，如何配置，如何优化
  - demo1
- output-analysis 输出代码分析
- vscode-debug 如何使用 vscode 调试
- plugins 插件开发，实现什么功能
  - 转码（如es6 转 es5，多态支持）
  - 输出
  - vue code 转小程序code
- src 源码学习
  - tabable

**概念术语**

webpack 中的所涉及的以下名词，都是指什么？官网解释[概念术语](https://webpack.docschina.org/glossary)，下面是总结介绍

- file: 最终打包生成的文件
- module: [模块](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)，
  - 就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
  - webpack 中要加载的一切css img js和所有的依赖都是Module
- chunk: webpack 内部用来管理 building 过程。
  - entry chunk: 入口代码块，包含了 webpack 运行时需要的一些函数，如 webpackJsonp, `__webpack_require__` 等以及依赖的一系列模块
  - normal chunk: 普通代码块没有包含运行时需要的代码，只包含模块代码，其结构由加载方式决定
  - initial chunk: 与入口代码块对应的一个概念是入口模块（module 0），如果入口代码块中包含了入口模块 webpack 会立即执行这个模块，否则会等待包含入口模块的代码块，**包含入口模块的代码块其实就是 initial chunk**。
- assets: 就是那些将要被 webpack 输出的文件。它们可以是任何类型的文件，比如样式、图片或者 html 文件
- bundle: bundle 由 chunk 组成。是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。
  - 其中有几种类型（例如，入口 chunk(entry chunk) 和子 chunk(child chunk)）。
  - 通常 chunk 会直接对应所输出的 bundle，但是有一些配置并不会产生一对一的关系。
- Bundle Splitting: Bundle 分离，
- Code Splitting: 代码分割，指将代码分离到每个 bundles/chunks 里面，你可以按需加载，而不是加载一个包含全部的 bundle。
- Tree Shaking: 移除未使用/多余的代码，或者更准确地说，只导入引用的代码。
- plugin 一个含有 `apply` 属性的 JavaScript 对象。该 apply 属性会在 webpack 编译时被调用，并能在整个编译生命周期访问。
  - compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
  - compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
- [bundle 分析](https://webpack.js.org/guides/code-splitting/#bundle-analysis)

## vscode 调试 webpack

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
