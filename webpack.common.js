const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'duck-hunt'
    })
  ]
}
