# 玩转 webpack

## 目录

练习，使用脚本获取 [《玩转 webpack》大纲目录](https://time.geekbang.org/course/intro/100028901?tab=catalog)

1. 第一章：webpack与构建发展简史 (9讲)
   1. 01 | 课程介绍
   2. 02 | 内容综述
   3. 03 | 为什么需要构建工具
   4. 04 | 前端构建演变之路
   5. 05 | 为什么选择webpack
   6. 06 | 初识webpack
   7. 07 | 环境搭建：安装webpack
   8. 08 | webpack初体验：一个最简单的例子
   9. 09 | 通过npm script运行webpack
2. 第二章：webpack基础用法 (12讲)
   1. 10 | webpack核心概念之entry
   2. 11 | webpack核心概念之output
   3. 12 | webpack核心概念之loaders
   4. 13 | webpack核心概念之plugins
   5. 14 | webpack核心概念之mode
   6. 15 | 解析ECMASCript 6和React JSX
   7. 16 | 解析CSS、Less和Sass
   8. 17 | 解析图片和字体
   9. 18 | webpack中的文件监听
   10. 19 | webpack中的热更新及原理分析
   11. 20 | 文件指纹策略：chunkhash、contenthash和hash
   12. 21 | HTML 、CSS和JavaScript代码压缩
3. 第三章：webpack进阶用法 (16讲)
   1. 22 | 自动清理构建目录产物
   2. 23 | PostCSS插件autoprefixer自动补齐CSS3前缀
   3. 24 | 移动端CSS px自动转换成rem
   4. 25 | 静态资源内联
   5. 26 | 多页面应用打包通用方案
   6. 27 | 使用sourcemap
   7. 28 | 提取页面公共资源
   8. 29 | Tree Shaking的使用和原理分析
   9. 30 | Scope Hoisting使用和原理分析
   10. 31 | 代码分割和动态import
   11. 32 | 在webpack中使用ESLint
   12. 33 | webpack打包组件和基础库
   13. 34 | webpack实现SSR打包（上）
   14. 35 | webpack实现SSR打包（下）
   15. 36 | 优化构建时命令行的显示日志
   16. 37 | 构建异常和中断处理
4. 第四章：编写可维护的webpack构建配置 (9讲)
   1. 38 | 构建配置包设计
   2. 39 | 功能模块设计和目录结构
   3. 40 | 使用ESLint规范构建脚本
   4. 41 | 冒烟测试介绍和实际运用
   5. 42 | 单元测试和测试覆盖率
   6. 43 | 持续集成和Travis CI
   7. 44 | 发布构建包到npm社区
   8. 45 | Git Commit规范和changelog生成
   9. 46 | 语义化版本（Semantic Versioning）规范格式
5. 第五章：webpack构建速度和体积优化策略 (12讲)
   1. 47 | 初级分析：使用webpack内置的stats
   2. 48 | 速度分析：使用speed-measure-webpack-plugin
   3. 49 | 体积分析：使用webpack-bundle-analyzer
   4. 50 | 使用高版本的webpack和Node.js
   5. 51 | 多进程/多实例构建
   6. 52 | 多进程并行压缩代码
   7. 53 | 进一步分包：预编译资源模块
   8. 54 | 充分利用缓存提升二次构建速度
   9. 55 | 缩小构建目标
   10. 56 | 使用Tree Shaking擦除无用的JavaScript和CSS
   11. 57 | 使用webpack进行图片压缩
   12. 58 | 使用动态Polyfill服务
6. 第六章：通过源代码掌握webpack打包原理 (9讲)
   1. 59 | webpack启动过程分析
   2. 60 | webpack-cli源码阅读
   3. 61 | Tapable插件架构与Hooks设计
   4. 62 | Tapable是如何和webpack进行关联起来的？
   5. 63 | webpack流程篇：准备阶段
   6. 64 | webpack流程篇：模块构建和chunk生成阶段
   7. 65 | webpack流程篇：文件生成
   8. 66 | 动手编写一个简易的webpack(上)
   9. 67 | 动手编写一个简易的webpack(下)
7. 第七章：编写loader和插件 (7讲)
   1. 68 | loader的链式调用与执行顺序
   2. 69 | 使用loader-runner高效进行loader的调试
   3. 70 | 更复杂的loader的开发场
   4. 71 | 实战开发一个自动合成雪碧图的loader
   5. 72 | 插件基本结构介绍
   6. 73 | 更复杂的插件开发场景
   7. 74 | 实战开发一个压缩构建资源为zip包的插件
8. 第八章：React全家桶和webpack开发商城项目 (10讲)
   1. 75 | 商城技术栈选型和整体架构
   2. 76 | 商城界面UI设计与模块拆分
   3. 77 | React全家桶环境搭建
   4. 78 | 数据库实体和表结构设计
   5. 79 | 登录注册模块开发
   6. 80 | 商品模块开发
   7. 81 | 订单模块开发
   8. 82 | 谈谈Web商城的性能优化策略
   9. 83 | 功能开发总结
   10. 84 | 玩转webpack & 结课测试
9. 加餐：webpack 5 专题内容 (3讲)
   1. 加餐：webpack 5 新特性解析
   2. 加餐：bundle和bundless的差异
   3. 加餐：Vite的构建原理

脚本

```js
$$('.chapter-title').map(item => item.innerText)

var result = [];
const wrap = $$('.article-list-wrapper')
for (let w of wrap) {
  var arr = w.children[0].children;
  const temp = [];
  for (let item of arr) {
    temp.push(item.innerText.replace('\n', '').replace('\n免费', ''))
  }
  result.push(temp);
}
console.log(JSON.stringify(result,null,2))
```
