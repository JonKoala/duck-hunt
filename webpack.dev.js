const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: process.env['IMPORT_FOLDER'] === 'lib' ? './sandbox/index.lib.js' : './sandbox/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()]
}
