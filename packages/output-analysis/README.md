# webpack 打包产物代码分析

- [webpack 打包产物代码分析](https://hellogithub2014.github.io/2019/01/02/webpack-bundle-code-analysis/)
- [Webpack 是怎样运行的?](https://mp.weixin.qq.com/s/uc4fVViv4u86TTX2XsMgFA)

自己实现一遍打包输出所提供的工具函数功能

```js
// output
(function(modules){
  // ...
})({
  "./src/index.js": (function(){
    // ...
  }),
  "./src/utils.js": (function() {
    // ...
  })
});
```

webpackBootstrap

```js
// webpackBootstrap
(function(modules){

  // 缓存 __webpack_require__ 函数加载过的模块
  var installedModules = {};

  /**
   * Webpack 加载函数，用来加载 webpack 定义的模块
   * @param {String} moduleId 模块 ID，一般为模块的源码路径，如 "./src/index.js"
   * @returns {Object} exports 导出对象
   */
  function __webpack_require__(moduleId) {
    // ...
  }

  // 在 __webpack_require__ 函数对象上挂载一些变量及函数 ...

  // 传入表达式的值为 "./src/index.js"
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})(/* modules */);
```

`__webpack_require__`

```js
function __webpack_require__(moduleId) {
  // 重复加载则利用缓存
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }

  // 如果是第一次加载，则初始化模块对象，并缓存
  var module = installedModules[moduleId] = {
    i: moduleId,  // 模块 ID
    l: false,     // 模块加载标识
    exports: {}   // 模块导出对象
  };

  /**
    * 执行模块
    * @param module.exports -- 模块导出对象引用，改变模块包裹函数内部的 this 指向
    * @param module -- 当前模块对象引用
    * @param module.exports -- 模块导出对象引用
    * @param __webpack_require__ -- 用于在模块中加载其他模块
    */
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

  // 模块加载标识置为已加载
  module.l = true;

  // 返回当前模块的导出对象引用
  return module.exports;
}
```
