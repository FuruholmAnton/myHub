const webpack = require('webpack');
const path = require('path');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
require("babel-polyfill");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ["babel-polyfill", './app-client.js'],
  },
  output: {
    path: path.resolve(__dirname, './src/static/js/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};