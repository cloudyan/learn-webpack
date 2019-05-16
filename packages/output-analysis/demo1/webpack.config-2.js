const path = require('path');

module.exports = {
  entry: './src-2/index.js',
  output: {
    path: path.resolve(__dirname, 'dist-2'),
    filename: '[name].[chunkhash].js',
  },
  mode: 'development',
  devtool: 'cheap-source-map',
};
