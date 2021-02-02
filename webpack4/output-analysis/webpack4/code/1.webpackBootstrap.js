/**
 * webpack 重点：webpackBootstrap
 * - 实现 exports 和 require
 * - 自动加载入口模块
 * - 控制缓存模块
 * 同步执行流程:
 * 异步执行流程:
 */

(function(modules) { // webpackBootstrap
  // 1. The module cache
  var installedModules = {};


  // 2. The require function
  // webpack 实现 require 函数
  // 检查缓存 加载并缓存模块 执行模块 标记已加载 返回模块的exports
  function __webpack_require__(moduleId) {

    // 2.1 Check if module is in cache
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    // 2.2 Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    // 2.3 call 执行模块对应的函数
    // module -- 当前模块对象引用
    // module.exports -- 模块导出对象引用
    // __webpack_require__ -- 用于在模块中加载其他模块
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 2.4 Flag the module as loaded
    module.l = true;

    // 2.5 Return the exports of the module
    return module.exports;
  }


  // 3. 在 __webpack_require__ 函数对象上暴露/挂载一些变量及函数 ...
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  // 定义 exports 对象导出的属性
  __webpack_require__.d = function(exports, name, getter) {
    // 如果 exports （不含原型链上）没有 [name] 属性，定义该属性的 getter
    if(!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  // 如果是 es 模块，添加属性 `__esModule` 为 true 作为标识（在每个 es 模块中执行此方法）
  __webpack_require__.r = function(exports) {
    if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function(value, mode) {
    if(mode & 1) value = __webpack_require__(value);
    if(mode & 8) return value;
    if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  // 如果 commonjs 模块和 es 模块混用时，使用以下方法兼容
  __webpack_require__.n = function(module) {
    // 如果是 es 模块，返回 module.default 否则返回 module
    var getter = module && module.__esModule ?
    function getDefault() { return module['default']; } :
    function getModuleExports() { return module; };
    // 将上面的返回值（模块）绑定到 module 的属性 a 上
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "";


  // 4. Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})({
  // modules 对象
  /*! no exports provided */
  "./src/main.js": (function(module, __webpack_exports__, __webpack_require__) {
    /* harmony import */
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    // 同步加载模块
    /* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common */ "./src/utils/commonjs.js");
    /* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_common__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _utils_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/es */ "./src/utils/es.js");

    // 1. output 输出 commonjs 及 es 模块
    // ?: 所有引入的模块属性都会用Object()包装成对象，这是为了保证像Boolean、String、Number这些基本数据类型转换成相应的类型对象
    Object(_utils_commonjs__WEBPACK_IMPORTED_MODULE_0__["clog"])('commonjs')
    _utils_commonjs__WEBPACK_IMPORTED_MODULE_0___default.a.hello()

    Object(_utils_es__WEBPACK_IMPORTED_MODULE_1__["eslog"])('es module')
    _utils_es__WEBPACK_IMPORTED_MODULE_1__["default"].hello()
  }),
  /*! no static exports found */
  "./src/utils/commonjs.js": (function(module, exports) {
    // test: commonjs module

    exports.clog = function(v) {
      console.log(v)
    }
    exports.hello = function () {
      console.log('I am commonjs module')
    }
  }),

  /*! exports provided: eslog, default */
  "./src/utils/es.js": (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "eslog", function() { return eslog; });

    // test: es module
    function eslog(v) {
      console.log(v);
    }

    /* harmony default export */
    __webpack_exports__["default"] = ({
      hello() {
        console.log('I am es module')
      }
    });
  })
});
