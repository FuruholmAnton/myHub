const webpack = require('webpack');
const path = require('path');
require('babel-polyfill');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['babel-polyfill', './app-client.js'],
  },
  output: {
    path: path.resolve(__dirname, './src/static/js/'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
         include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          path.resolve(__dirname, 'src/static'),
          path.resolve(__dirname, 'src/views'),
          path.resolve(__dirname, 'src/server*'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // })
  ],
};
