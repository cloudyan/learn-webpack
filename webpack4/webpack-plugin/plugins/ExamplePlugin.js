// example
class ExampleWebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.customHook.tap('CustomHook', (data) => {
      console.log('@CustomHook', data)
    })
  }
}

module.exports = ExampleWebpackPlugin
