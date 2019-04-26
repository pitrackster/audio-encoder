const path = require('path')
const webpack = require('webpack')

const config = {
  target: 'electron-main',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
    })
  ]

}

module.exports = () => {
  return config
}