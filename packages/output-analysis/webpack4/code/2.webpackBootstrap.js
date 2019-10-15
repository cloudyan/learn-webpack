(function(modules) { // webpackBootstrap
  // install a JSONP callback for chunk loading
  // 6. window 挂载 JSONP 方法，实现异步加载回调
  function webpackJsonpCallback(data) {
    var chunkIds = data[0]; // 这是数组，因为有可能异步加载多个模块
    var moreModules = data[1];

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [];
    // 6.1 收集模块resolve，将 chunk 标记为已加载
    for(;i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    // 6.2 copy moreModules 到 modules
    // 同步加载模块
    for(moduleId in moreModules) {
      if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }

    // parentJsonpFunction 是 window["webpackJsonp"] 的原生 push
    // 将 data 加入全局数组，缓存 chunk 内容
    if(parentJsonpFunction) parentJsonpFunction(data);

    // 执行 resolve 后，加载 chunk 的 promise 状态变为 resolved，then 内的函数开始执行，完成异步加载
    while(resolves.length) {
      resolves.shift()();
    }
  };


  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  // chunk 缓存
  var installedChunks = {
    "main": 0
  };


  // script path function
  // 拼接 chunk 的请求地址
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"0":"6de9a1daa9caf9f2283e"}[chunkId] + ".js"
  }

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

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  // 7. 异步加载 chunk，返回封装chunk加载过程的 promise
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];

    // JSONP chunk loading for javascript
    // 7.1 查找缓存模块
    // 如果缓存标识为 0，直接返回 promise.all
    var installedChunkData = installedChunks[chunkId];
    if(installedChunkData !== 0) { // 0 means "already installed".

      // a Promise means "currently loading".
      if(installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        // 7.2 首次加载 chunk
        // 封装为 promise对象，并将 resolve, reject 和 promise 缓存在 installedChunkData 中
        var promise = new Promise(function(resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);

        // start chunk loading
        // 7.3 创建 script 标签，动态加载chunk
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        // src 根据 publicPath 和 chunkId 拼接
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        // 7.4 异常处理
        // 加载结束回调函数，处理 script 加载完成、加载超时、加载失败的情况
        var error = new Error();
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          // 避免 IE 内存泄漏问题
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];

          // 处理 script 加载完成，但 chunk 没有加载完成的情况
          if(chunk !== 0) {

            // chunk 加载中
            if(chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;

              // reject(error)
              chunk[1](error);
            }

            // 统一将没有加载的 chunk 标记为未加载
            installedChunks[chunkId] = undefined;
          }
        };

        // 设置 120 秒超时时间
        var timeout = setTimeout(function(){
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    // 7.5 如果加载成功，返回当前模块 promise
    return Promise.all(promises);
  };

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
  // 根据配置文件确定的 publicPath
  __webpack_require__.p = "";

  // on error function for async loading
  __webpack_require__.oe = function(err) { console.error(err); throw err; };

  // 5. JSONP 初始化
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback; // 重写 push 方法
  jsonpArray = jsonpArray.slice(); // 重置为正常数组
  for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;


  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
/************************************************************************/
({
  /*! no exports provided */
  "./src/main.js": (function(module, exports, __webpack_require__) {
    // main.js

    // 2. output 动态加载（先加在chunk，完成后再加载 module）
    __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./utils/lazy1 */ "./src/utils/lazy1.js")).then(lazy1 => {
      console.log('动态加载 lazy1 成功')
      lazy1()
    })
    __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./utils/lazy2 */ "./src/utils/lazy2.js")).then(lazy2 => {
      console.log('动态加载 lazy2 成功')
      lazy2()
    })
  })
});
  //# sourceMappingURL=main.ec598c45bb231f586cda.js.map
