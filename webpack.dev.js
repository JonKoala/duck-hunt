const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin()]
})
