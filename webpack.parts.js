/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.cleanBuildPath = ({ include }) => ({
  plugins: [
    new CleanWebpackPlugin([include]),
  ],
});

exports.copyStaticFile = ({ copy }) => ({
  plugins: [
    new CopyWebpackPlugin(copy),
  ],
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.uglifyJs = () => ({
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
      extractComments: true,
    }),
  ],
});

exports.defineProductioEnv = env => ({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
});

exports.visualizer = () => ({
  plugins: [new Visualizer()],
});
