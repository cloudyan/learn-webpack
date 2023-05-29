# webpack-builder

功能模块设计

- 基础配置--------`webpack.config.base.js`
  - 资源解析
    - 解析 ES6
    - 解析 React
    - 解析 CSS、Less/SCSS
    - 解析图片
    - 解析字体
  - 样式增强
    - CSS 前缀补齐
    - CSS px 转换成 rem/vw
  - 目录清理
  - 多页面打包
  - 命令行信息显示优化
  - 错误捕获和处理
  - CSS 提取成一个单独的文件
- 开发模式配置-----`webpack-config.dev.js`
  - 代码热更新
    - CSS 热更新
    - JS 热更新
  - sourceMap
- 生产模式配置-----`webpack-config.prod.js`
  - 代码压缩
  - 文件指纹
  - TreeShaking
  - Scope Hoisting
  - 速度优化
    - 基础包 CDN
  - 体积优化
    - 代码分割
- DLL 配置--------`webpack-config.dll.js`
  - DLLPlugin 分包
  - DLLReferencePlugin 引包
- SSR 配置--------`webpack-config.ssr.js`
  - output 的 libraryTarget 设置
  - CSS 解析 ignore


目录结构

```bash
lib 源代码
test 测试代码
```

冒烟测试（smoke testing）

冒烟测试是指对提交测试的软件在进行详细深入的测试之前而进行的预测试，这种 预测试的主要目的是暴露导致软件需重新发布的基本功能失效等严重问题。

