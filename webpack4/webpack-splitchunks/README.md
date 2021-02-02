# 理解webpack4.splitChunks

从webpack v4开始，CommonsChunkPlugin删除了，而改为optimization.splitChunks

**webpack会把入口文件单独拆成一个chunk**

## splitChunks 分析

请先阅读[官方文档](https://v4.webpack.docschina.org/plugins/split-chunks-plugin/)说明，之后再参阅此文

入口文件必然占用一个独立的 chunk

1. `chunks` 条件，默认 async（使用 webpack-config-chunks.js 调试验证）
   - `async` 只从异步加载的模块中提取模块分组，不包含入口，default 配置入口文件为 page1
        - 只提取了 page 1 中的 lodash，满足 vendors node_modules 条件的
        - 不会被提取入口文件 entry1 中的第三方(引入的)模块, react-dom react ...
   - `initial` 只从 entry 入口文件中提取引入的模块，default 配置入口文件为 entry1
        - 只提取了 entry1 中的引入模块 react-dom react ... 等，满足 vendors 条件的
        - 不会被提取page1 中的引入的模块，都被打包到 page1 chunk 中
   - `all` 以上两者都包括，都提取模块，包含 entry1 page1
       - 从 entry1 提取 react-dom react ...，满足 vendors 条件的
       - 从 page1 提取 lodash，满足 vendors 条件的（TODO: 这里都满足vendors 条件，为什么不是都提取到一个文件内？因为默认 name 为 true）
       - page1 中引入的本地 jquery没被提取，因为提取条件都不满足
2. `cacheGroups` 默认分组两个 参看 webpack-config-default (splitChunks就是根据cacheGroups去拆分模块的)
   - vendors 按模块引用条件 node_modules 提取模块
   - default 按条件 minChunks: 2 提取模块，在所有符合提取条件的模块中，提取最小被引入两次的模块
   - 可以自定义分组 参看 webpack-config-cacheGroups.js
     - 将符合条件的稳定 node_modules 模块，提取到一个模块中，可以发挥强缓存的作用
       - TIP: 注意和默认的同名时，权重不能和默认相同或更低，可不写(自定义缓存组默认权重为 0)
     - 根据自己需要分组 更多[示例](https://v4.webpack.docschina.org/plugins/split-chunks-plugin/#examples)
3. `maxInitialRequests`
4. `maxAsyncRequests`
5. `test` 提取条件

参考：

- https://www.cnblogs.com/kwzm/p/10314438.html
- https://v4.webpack.docschina.org/configuration/optimization/#optimization-splitchunks
- https://v4.webpack.docschina.org/plugins/split-chunks-plugin/
