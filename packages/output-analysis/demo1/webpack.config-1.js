const path = require('path');

module.exports = {
  entry: './src-1/index.js',
  output: {
    path: path.resolve(__dirname, 'dist-1'),
    filename: '[name].[chunkhash].js',
  },
  mode: 'development',
  devtool: 'cheap-source-map',
};
