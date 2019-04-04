// https://webpack.js.org/contribute/writing-a-plugin/

class HelloWorldPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap('HelloWorldPlugin', stats => {
      // stats is passed as argument when done hook is tapped.
      console.log('Hello World!');
      console.log(this.options);
    });
  }
}

module.exports = HelloWorldPlugin;
