const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')

module.exports = {
  entry: {
    background: './src/background/background.js',
    'injected-content': './src/content/injected-content.js',
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
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './src/manifest.json', to: path.resolve(__dirname, 'build/manifest.json') },
      { from: './src/images', to: path.resolve(__dirname, 'build/images') },
      { from: './node_modules/webextension-polyfill/dist/browser-polyfill.js', to: path.resolve(__dirname, 'build/browser-polyfill.js') }
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
        contentScript: 'injected-content',
        background: 'background',
        extensionPage: 'popup'
      }
    })
  ]
}
