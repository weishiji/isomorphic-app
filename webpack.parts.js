/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

exports.cleanBuildPath = ({ include }) => ({
  plugins: [
    new CleanWebpackPlugin([include]),
  ],
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: true,
      warning: true,
    },
  },
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

exports.visualizer = () => ({
  plugins: [new Visualizer()],
});

exports.setMode = mode => ({
  mode,
});

exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});
