(function(modules) { // webpackBootstrap
  // install a JSONP callback for chunk loading
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];
    var executeModules = data[2];

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [];
    for(;i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for(moduleId in moreModules) {
      if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if(parentJsonpFunction) parentJsonpFunction(data);

    while(resolves.length) {
      resolves.shift()();
    }

    // add entry modules from loaded chunk to deferred list
    deferredModules.push.apply(deferredModules, executeModules || []);

    // run deferred modules when all chunks ready
    return checkDeferredModules();
  };
  function checkDeferredModules() {
    var result;
    for(var i = 0; i < deferredModules.length; i++) {
      var deferredModule = deferredModules[i];
      var fulfilled = true;
      // 检查当前主chunk依赖的所有异步加载的common chunk，看是否都已加载完成，注意下标从1开始，0 是主chunk
      for(var j = 1; j < deferredModule.length; j++) {
        var depId = deferredModule[j];
        if(installedChunks[depId] !== 0) fulfilled = false;
      }
      if(fulfilled) {
        // fulfilled表示这个主chunk所有依赖chunk均加载完，从数组中移除这个元素
        deferredModules.splice(i--, 1);
        // 此时才真正require这个主chunk
        result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
      }
    }

    return result;
  }

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  var installedChunks = {
    "main": 0
  };

  var deferredModules = [];

  // The require function
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }


  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function(exports, name, getter) {
    if(!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
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
  __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";

  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;


  // add entry module to deferred list
  deferredModules.push(["./src/main.js","default~main~runtime"]);
  // run deferred modules when ready
  return checkDeferredModules();
})
/************************************************************************/
({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _utils_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/es */ "./src/utils/es.js");
  // main.js

  // 1. output 输出 commonjs 及 es 模块
  // import cjsm, { clog } from './utils/commonjs'
  // import esm, { eslog } from './utils/es'

  // clog('commonjs')
  // cjsm.hello()

  // eslog('es module')
  // esm.hello()

  // 2. output 动态加载
  // import('./utils/lazy1').then(({ default: lazy1 }) => {
  //   console.log('动态加载 lazy1 成功')
  //   lazy1()
  // })
  // import('./utils/lazy2').then(({ lazy2 }) => {
  //   console.log('动态加载 lazy2 成功')
  //   lazy2()
  // })

  // 3. output `code splitting` by use `common chunk`
  // 修改 webpack.config.js 改为多入口，加 runtime.js，并启用 splitChunks


  Object(_utils_es__WEBPACK_IMPORTED_MODULE_0__["eslog"])('eslog')


  /***/ })

  });
  //# sourceMappingURL=main.a7561ca4.js.map
