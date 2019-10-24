
// https://cloud.tencent.com/developer/ask/196181

class AccessDependenciesPlugin {
  apply (compiler) {
    // 在密封之前访问依赖关系树
    compiler.hooks.compilation.tap('AccessDependenciesPlugin', compilation => {
      compilation.hooks.finishModules.tap('AccessDependenciesPlugin', modules => {
        /*
        |---------------------------------------------------
        | Here we go, `modules` is what we're looking for!
        |---------------------------------------------------
        */
      })
    })
  }
}

module.exports = AccessDependenciesPlugin
