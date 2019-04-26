const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  //filename: "./index.html"
})

const config = {
  target: 'electron-renderer',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
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
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ]
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
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
    htmlPlugin,
    new webpack.DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

module.exports = () => {
  return config
}