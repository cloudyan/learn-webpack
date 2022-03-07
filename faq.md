# 学习 webpack

## 带着问题来学习

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


## 深入问题

1. webpack 是做什么的，为什么选择 webpack？
   1. 为什么需要构建工具？
   2. 前端构建演变之路
   3. 为什么选择 webpack？
2. webpack 的 entry 和 output 都能配置什么？
   1. entry？
   2. output
3. 常用的 loaders 有哪些？做什么用的？多个 loader 执行顺序是怎样的？为什么？
   1. 常用的 loaders
4. 常用的 plugins 有哪些？有什么用？
   1. 常用的 plugins
5. webpack 的热更新原理？
   1. 热更新原理
   2. 更新怎么生效的
6. 文件指纹怎么配置？什么区别？什么是 HTTP 缓存失效？
   1. 文件指纹怎么配置？
   2. 有哪几种配置，区别是什么？
   3. 应该怎么选择？
7. sourceMap 都有哪些配置？应该怎么用？
   1. sourceMap 有哪些配置类型？
   2. 应该怎么选择使用？
8. 项目持续集成怎么做？都包含什么哪些检查项，整个过程怎么流转？
   1. 持续集成的目的是什么？
   2. 我们应该做哪些？
   3. 整个过程是怎样的？
9. webpack 构建速度和体积优化策略？
   1. 怎么分析？
   2. 怎么优化？为什么？
10. splitChunks 怎么配置的？分包策略有哪些？为什么？
    1. 有哪些配置项？
    2. 分包策略有哪些？都解决什么问题？
11. webpack 的本质？打包原理是什么？tapable 是什么？
    1. webpack 的本质？打包原理是什么？
    2. tapable 是什么？
12. 如何手写 loader？loader 中怎么处理异步逻辑？
    1. 如何手写 loader？
    2. 如何在 loader中处理异步逻辑？
13. 如何手写 plugin？参数有哪些？整个 webpack 的流程是怎样的？涉及哪些 hooks？
    1. 如何手写 plugin？
    2. plugin 中有哪些可用参数？
    3. webpack 的大体流程是怎样的？
    4. 流程中常见的 hooks 的有哪些？
14. webpack5 做了哪些优化？
    1. 主要有哪些改动点？哪些优化？
15. 都说 vite bundleless 快？是快在哪里？vite 是如何实现这些支持的？
    1. bundleless 为什么快？
    2. vite 为了实现 bundleless 做了哪些工作？

## 菜单

- [webpack 概况](#webpack-概况)
  - [webpack 是做什么的？](#webpack-是做什么的？)
  - [为什么选择 webpack？](#为什么选择-webpack)
- [webpack 的 entry 和 output 都能配置什么？](#webpack-的-entry-和-output-都能配置什么)
  - [entry？](#entry？)
  - [output](#output)
- [常用的 loaders 有哪些？做什么用的？多个 loader 执行顺序是怎样的？为什么？](#常用的-loaders-有哪些？做什么用的？多个-loader-执行顺序是怎样的？为什么？)

---


## webpack 概况


#### 为什么需要构建工具？

- 抓换 ES6 语法
- 转换 JSX
- CSS 前缀补全（预处理器）
- 压缩混淆
- 图片压缩

#### 前端构建演变之路

ant + YUI Tool -> grunt -> gulp/fis3 -> rollup/webpack/parcel

-> esbuild,swc,vite

各有什么特点

#### 为什么选择 webpack？

- 社区生态丰富
- 配置灵活和插件化扩展
- 官方更迭速度快

安装 `npm install webpack webpack-cli --save-dev`

## webpack 基础

### webpack 配置组成？

- entry   入口文件
- output  打包输出
- mode    环境
- module  loader 相关配置
- plugins 插件配置

#### 零配置的 webpack 包含哪些内容

```js
// 默认配置
module.exports = {
  entry: './src/index.js',  // 默认
  output: './dist/main.js', // 默认
  mode: 'production',
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'}
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './src/index.html'
    })
  ],
}
```

#### 核心概念 entry？


```js
// 单入口
entry: './src/index.js',

// 多入口
entry: {
  app: './src/app.js',
  search: './src/search.js'
}
```

思考

- 多入口的情况，每次变更，需要手动修改，如何自动实现多入口配置

#### 核心概念 output

```js

output: {
  filename: '[name]-[chunkhash:8].js',
  path: __dirname + '/dist',
},
```

#### 常用的 loaders？

 名称 | 描述
 ------ | -----
`babel-loader`  | 转换 ES6, ES7 等新特性语法
`css-loader`    | 支持 .css 文件的加载和解析
`less-loader`   | 将 less 文件转换成 css
`ts-loader`     | 将 TS 转换成 JS
`file-loader`   | 进行图片、字体等的打包
`url-loader`    | 也可以处理图片和字体，可以设置较⼩资源⾃动 base64
`raw-loader`    | 将文件以字符串的形式导入
`thread-loader` | 多进程打包 JS 和 CSS

思考

- 多个 loader 执行顺序是怎样的？为什么？

#### 常用的 plugins

 名称 | 描述
 ------ | -----
`CommonsChunksPlugin` | 将 chunks 相同的模块代码提取成公共 js
`CleanWebpackPlugin`  | 清理构建目录
`ExtractTextWebpackPlugin` | 将 CSS 从 bundle 文件里提取成一个独立的 css 文件
`CopyWebpackPlugin`     | 将文件或文件夹拷贝到构建的输出目录
`HtmlWebpackPlugin`     | 创建 html 文件取承载输出的 bundle
`UglifyjsWebpackPlugin` | 压缩 JS
`ZipWebpackPlugin`      | 将打包出的资源生成一个 zip 包

#### mode 概念

指定当前的构建环境

- development
- production 默认
- none

webpack4 内置功能

 选项 | 描述
 ---- | ----
 development | 设置 `process.env.NODE_ENV` 的值为 `development`, 开启  `NamedChunksPlugin`, `NamedModulesPlugin`
 production  | 设置 `process.env.NODE_ENV` 的值为 `production`, 开启 `FlagDependencyUsagePlugin`, `FlagIncludeChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurenceOrderPlugin`, `SideEffectsFlagPlugin`, `TerserPlugin`
 none        | 不开启任何优化选项

### webpack 中的文件监听

webpack 开启监听模式，有两种方式

- webpack --watch
- 配置 webpack.config.js 中设置 watch: true

唯一缺陷：每次需要手动刷新浏览器

#### 文件监听的原理分析

轮询判断文件的最后编辑时间是否变化

某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout

```js
module.exports = {
  // 默认 false, 也就是不开启
  watch: true,
  // 只有开启监听模式时，watchOptions 才有意义
  watchOptions: {
    // 默认为空，不监听的文件或文件夹，支持正则，glob 模式
    // 使用 glob 模式，内部会使用 glob-to-regexp 转为正则表达式
    ignored: '**/node_modules',
    // ignored: /node_modules/,
    // ignored: ['**/files/**/*.js', '**/node_modules'],
    // 监听到文件变化发生后会等 300ms 再去执行，将这段时间内的更改聚合到一次重新构建里
    aggregateTimeout: 300,
    // 判断文件是否发生变化时通过不停询问系统指定文件有没有变化实现的，
    // poll 指定毫秒为单位进行轮询, 1000 就是每秒检查一次变动
    poll: 1000,
  },
}
```

### webpack 的热更新

- `webpack-dev-server`
  - 不刷新浏览器
  - 使用插件 `webpack.HotModuleReplacementPlugin`
- `webpack-dev-middleware`

#### webpack 的热更新原理？


- https://juejin.cn/post/6844904008432222215

### 文件指纹是什么，如何生成的？

文件指纹

 类型         | 描述
 hash        | 和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
 chunkhash   | 和 webpack 打包的 chunk 有关，不同的 entry 会生产不同的 chunkhash 值
 contenthash | 根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

file-loader 占位符

 占位符名称       | 含义
 -------        | ----
 [ext]          | 资源后缀名
 [name]         | 文件名称
 [path]         | 文件的相对路径
 [contenthash]  | 文件所在的文件夹
 [hash]         | 文件的内容 hash，默认是 md5 生成
 [emoji]         | 一个随机的指代文件内容的 emoji

我们在使用时，该怎么选择？为什么？

- js 设置 `output` 的 `filename`, 使用 [chunkhash]
- css 设置 `MiniCssExtractPlugin` 的 `filename`, 使用 [contenthash]
- 图片 设置 `file-loader` 的name, 使用 [hash], 默认是 md5 生成

代码压缩

- JS 压缩
  - 内置了 `uglifyjs-webpack-plugin`
- CSS 压缩
  - 使用 `optimize-css-assets-webpack-plugin`
  - 同时使用 `cssnano`
- HTML 压缩
  - 修改 `html-webpack-plugin`, 设置压缩参数 `minify: {}`

```js
// 压缩
const genHtmlConfig = (page) => ({
  template: path.join(__dirname, `src/${page}.html`),
  filename: `${page}.html`,
  chunks: [`${page}`],
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    preserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false
  }
});

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new HtmlWebpackPlugin(genHtmlConfig('index')),
    new HtmlWebpackPlugin(genHtmlConfig('search')),
  ],
}
```

### sourceMap 都有哪些配置？应该怎么用？

 关键字 | 描述
 ----- | ---
 eval  | 使用 eval 包裹模块代码
 source map | 产生 .map 文件
 cheap | 不包含列信息
 inline | 将 .map 作为 DataURI 嵌入，不单独生成 .map 文件
 module | 包含 loader 的 sourceMap

#### sourceMap 有哪些配置类型？

 devtool                    | 首次构建 | 二次构建 | 是否适合生产环境 | 可以定位的代码
 ---------------------------- | ----- | ---- | ---- | -------
 (none)                         | +++ | +++ | yes | 最终输出的代码
 eval                           | +++ | +++ | no  | webpack 生成的代码（一个个的模块）
 cheap-eval-source-map          | +   | ++  | no  | 经过 loader 转换后的代码（只能看到行）
 cheap-module-eval-source-map   | 0   | ++  | no  | 源代码（只能看到行）
 eval-source-map                | --  | +   | no  | 源代码
 cheap-source-map               | +   | 0   | yes | 经过 loader 转换后的代码（只能看到行）
 cheap-module-source-map        | 0   | -   | yes | 源代码（只能看到行）
 inline-cheap-source-map        | +   | 0   | no  | 经过 loader 转换后的代码（只能看到行）
 inline-cheap-module-source-map | +   | 0   | no  | 源代码（只能看到行）
 source-map                     | --  | --  | yes | 源代码
 inline-source-map              | --  | --  | no  | 源代码
 hidden-source-map              | --  | --  | yes | 源代码

#### 应该怎么选择使用？

我们生产环境，可以使用 source-map, 但对 .map 文件需要处理，不能直接泄露源码到生产上

## webpack 进阶

#### 自动清理构建目录

- `rm -rf ./dist`
- `rimraf ./dist`
- 使用插件 `clean-webpack-plugin`
  - 默认删除 output 指定的输出目录

#### 预处理器

- `autoprefixer` 自动补全 csss3 前缀
- px2rem-loader
  - lib-flexible
- px2vw

#### 资源内联的意义

- 代码层面
  - 页面框架的初始化脚本
  - 上报相关打点
  - css 内联避免页面闪动
- 请求层面：减少 HTTP 网络请求数
  - 小图片或者字体内联（url-loader）

实现

- HTML 和 JS 内联
- CSS 内联
  - 借助 style-loader
  - html-inline-css-webpack-plugin

#### 多页面应用（MPA）概念

思路：每个页面对应一个 entry，一个 html-webpack-plugin

实现多页面打包通用方案

利用 glob.sync 通过动态获取 entry 并设置 html-webpack-plugin

### 代码分割的意义

对于大的 web 应用，将将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被使用到。

webpack 有一个功能就是将你的代码库分割成 chunks（语块），当代码运行到需要它们的时候再进行加载。

- 适用场景
  - 抽离相同代码到一个共享块
  - 脚本懒加载，使得初始下载的代码更小

### 懒加载 JS 脚本的方式

- CommonJS: `require.ensure`
- ES6: 动态 import （需要 babel 转换 `@babel/plugin-syntax-dynamic-import`）

原理，webpack 通过 JSONP 来实现动态加载脚本


## 编写可维护的 webpack 构建配置

### 构建配置抽离成 npm 包

- webpack-builder

### 项目持续集成怎么做？都包含什么哪些检查项，整个过程怎么流转？

- 冒烟测试
- 单元测试

#### 持续集成的目的是什么？


#### 我们应该做哪些？


#### 整个过程是怎样的？

## webpack 构建速度和体积优化策略？

#### 怎么分析？

- stats: 构建的统计信息
  - `"build:stats": "webpack --env production --json > stats.json"`
- 速度分析: `speed-measure-webpack-plugin`
  - 分析整个打包总耗时
  - 每个插件和 loader 的耗时情况
- 体积分析: `webpack-bundle-analyzer`
  - 依赖的第三方模块文件大小
  - 业务里面的组件代码大小

#### 怎么优化？为什么？

- 使用高版本的 webpack 和 Nodejs
- 高版本 webpack4 中优化的原因
  - V8 带来的优化
    - `for of` 替代 `forEach`
    - `Map` 和 `Set` 替代 `Object`
    - `includes` 替代 `indexOf`
  - 默认使用更快的 md4 hash 算法
  - webpack AST 可以直接从 loader 传递给 AST，减少解析时间
  - 使用字符串方法替代正则表达式
- 多进程/多实例构建：资源并行解析可选方案
  - 使用 `HappyPack` 解析资源
  - 使用 `thread-loader` 解析资源
  - parallel-webpack 并行压缩
    - 使用 `parallel-uglify-webpack` 插件开启 parallel 参数
    - 使用 `uglify-webpack-plugin` 开启 parallel 参数
    - 使用 `terser-webpack-plugin` 开启 parallel 参数
  - 合理的 `splitChunks` 配置
- Scope Hoisting
- 公共资源分离
  - 分包：设置 `externals`
    - 使用 `html-webpack-externals-plugin`
  - 进一步分包：预编译资源模块
    - 使用 `DLLPlugin` 进行分包
    - 使用 `DLLReferencePlugin` 引用 manifest.json
- 缓存
  - 目的：提升二次构建速度
  - 缓存思路：
    - `babel-loader` 开启缓存
    - `terser-webpack-plugin` 开启缓存
    - 使用 `cache-loader` 或者 `hard-source-webpack-plugin`
- 缩小构建目标
  - 目的：尽可能的少构建
  - 思路
    - `babel-loader` 不解析 node_modules
- 减少文件搜索范围
  - 优化 `resolve.modules` 配置（减少模块搜索层级）
  - 优化 `resolve.mainFields` 配置
  - 优化 `resolve.extensions` 配置
  - 合理使用 `alias`
- 图片压缩
  - 要求：基于 Node 库的 `imagemin` 或者 tinypng API
  - 使用：配置 `image-webpack-loader`
- `tree-shaking` 摇树优化
  - 使用：webpack 默认支持，在 `.babelrc` 里设置 `modules: false` 即可
    - `mode` 为 `production` 时默认开启
  - 要求：必须是 ES6 的语法，CJS 的方式不支持
- 无用的 CSS 如何删除掉？
  - `PurifyCSS`
  - `uncss`
  - `purgecss-webpack-plugin`
  - 和 `mini-css-extract-plugin` 配合使用
- 构建体积优化：动态 Polyfill


### splitChunks 怎么配置的？分包策略有哪些？为什么？

#### 有哪些配置项？


#### 分包策略有哪些？都解决什么问题？



### webpack 的本质？打包原理是什么？tapable 是什么？

#### webpack 的本质？打包原理是什么？


#### tapable 是什么？

### 如何手写 loader？loader 中怎么处理异步逻辑？

webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 loaders 去支持其他文件类型并且把它们转化为有效的模块，并且可以添加到依赖图中。

loader 本身是一个函数，接受源文件作为参数，返回转换的结果。

#### 如何手写 loader？


#### 如何在 loader中处理异步逻辑？

### 如何手写 plugin？参数有哪些？整个 webpack 的流程是怎样的？涉及哪些 hooks？

#### 如何手写 plugin？


#### plugin 中有哪些可用参数？


#### webpack 的大体流程是怎样的？


#### 流程中常见的 hooks 的有哪些？

### webpack5 做了哪些优化？

#### 主要有哪些改动点？哪些优化？

### 都说 vite bundleless 快？是快在哪里？vite 是如何实现这些支持的？

#### bundleless 为什么快？


#### vite 为了实现 bundleless 做了哪些工作？


## 扩展

- 多页面打包通用方案
- 手写：大数相加实现
- 构建配置抽离 npm 包
- 冒烟测试（smoke testing）
- 单元测试
- 拆包方案
