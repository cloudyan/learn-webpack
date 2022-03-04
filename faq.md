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
   1. webpack 是做什么的？
   2. 为什么选择 webpack？
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


### webpack 概况


#### webpack 是做什么的？


#### 为什么选择 webpack？

### webpack 的 entry 和 output 都能配置什么？


#### entry？


#### output

### 常用的 loaders 有哪些？做什么用的？多个 loader 执行顺序是怎样的？为什么？


#### 常用的 loaders

### 常用的 plugins 有哪些？有什么用？


#### 常用的 plugins

### webpack 的热更新原理？


#### 热更新原理


#### 更新怎么生效的

### 文件指纹怎么配置？什么区别？什么是 HTTP 缓存失效？


#### 文件指纹怎么配置？


#### 有哪几种配置，区别是什么？


#### 应该怎么选择？

### sourceMap 都有哪些配置？应该怎么用？


#### sourceMap 有哪些配置类型？


#### 应该怎么选择使用？

### 项目持续集成怎么做？都包含什么哪些检查项，整个过程怎么流转？


#### 持续集成的目的是什么？


#### 我们应该做哪些？


#### 整个过程是怎样的？

### webpack 构建速度和体积优化策略？


#### 怎么分析？


#### 怎么优化？为什么？

### splitChunks 怎么配置的？分包策略有哪些？为什么？

#### 有哪些配置项？


#### 分包策略有哪些？都解决什么问题？

### webpack 的本质？打包原理是什么？tapable 是什么？

#### webpack 的本质？打包原理是什么？


#### tapable 是什么？

### 如何手写 loader？loader 中怎么处理异步逻辑？

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
