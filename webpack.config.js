const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/game.js',
  output: {
    filename: 'duck-hunt.min.js',
    library: 'DuckHunt',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
}
