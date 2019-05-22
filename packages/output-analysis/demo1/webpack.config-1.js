const path = require('path');
const MyPlugin = require('./plugins/MyPlugin');

module.exports = {
  entry: './src-1/index.js',
  output: {
    path: path.resolve(__dirname, 'dist-1'),
    filename: '[name].[chunkhash].js',
  },
  mode: 'development',
  devtool: 'cheap-source-map',
  plugins: [new MyPlugin()],
};
