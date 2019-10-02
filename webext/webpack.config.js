const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    background: './src/background/background.js',
    options: './src/options/options.js',
    popup: './src/popup/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader'
        }]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './src/manifest.json', to: path.resolve(__dirname, 'build/manifest.json') },
      { from: './src/images', to: path.resolve(__dirname, 'build/images') }
    ]),
    new HTMLWebPackPlugin({
      template: './src/options/options.html',
      chunks: ['options'],
      filename: 'options.html'
    }),
    new HTMLWebPackPlugin({
      template: './src/popup/popup.html',
      chunks: ['popup'],
      filename: 'popup.html'
    }),
    new ExtensionReloader({
      config: 'webpack.dev.js',
      entries: {
        // contentScript: 'content-script',
        background: 'background',
        extensionPage: 'popup'
      }
    })
  ]
}
