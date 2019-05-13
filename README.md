# learn-webpack

学习 webpack4

- config-usage 配置使用，关键配置，如何配置，如何优化
  - demo1
- output-analysis 输出代码分析
- vscode-debug 如何调试
- plugins 插件开发，实现什么功能
  - 转码（如es6 转 es5，多态支持）
  - 输出
  - vue code 转小程序code
- src 源码学习
  - tabable

## vscode 调试 webpack

### 方法一

示例参见 [webpack4/demo1](https://github.com/cloudyan/learn-webpack/tree/master/packages/webpack4/demo1)

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

参见 [webpack4/demo2](https://github.com/cloudyan/learn-webpack/tree/master/packages/webpack4/demo2)

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
