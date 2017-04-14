require('webpack');

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// require('babel-polyfill');

const extractSass = new ExtractTextPlugin({
  // filename: "public/[name].[contenthash].css",
  filename: path.resolve(__dirname, 'src/static/css/style.css'),
  disable: process.env.NODE_ENV === 'development',
  allChunks: true,
});

const loaders = [
  {
    test: /\.(js|jsx)$/,
    include: [
      path.resolve(__dirname, 'src'),
    ],
    exclude: [
      path.resolve(__dirname, 'src/static'),
      path.resolve(__dirname, 'src/views'),
      path.resolve(__dirname, 'src/server.js'),
      path.resolve(__dirname, 'src/server.babel.js'),
      path.resolve(__dirname, 'src/server*'),
    ],
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'react'],
    },
  },
  {
    test: /\.scss$/,
    include: [
      path.resolve(__dirname, 'src/scss'),
    ],
    loader: extractSass.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }),
  },
];


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [/* 'babel-polyfill', */'./app-client.js'],
  },
  output: {
    path: path.resolve(__dirname, './src/static/js/'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Pages: path.resolve(__dirname, './src/pages'),
      Core: path.resolve(__dirname, './src/core'),
    },
    extensions: ['.js', '.jsx'],
    unsafeCache: true,
  },
  devtool: 'source-map',
  module: {
    loaders: loaders,
  },
  plugins: [

    extractSass,

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
