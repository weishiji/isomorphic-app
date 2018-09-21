/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

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

exports.split = () => ({
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
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
/**
 * id string required
 * loaders Array required
 */
exports.happyPackThread = (id, loaders) => ({
  plugins: [
    new HappyPack({
      id,
      threadPool: happyThreadPool,
      loaders,
    }),
  ],
});

exports.assets = ({ filename, path, fullPath = false }) => ({
  plugins: [
    new AssetsPlugin({
      filename,
      path,
      fullPath,
      prettyPrint: true,
    }),
  ],
});

exports.cssLoader = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader',
          // 'style-loader',
        ],
      },
    ],
  },
});
