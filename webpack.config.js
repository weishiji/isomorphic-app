const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  client: path.join(__dirname, 'client'),
  server: path.join(__dirname, 'server'),
  build: path.join(__dirname, 'server', 'public'),
};

const commonConfig = merge([
  {
    entry: {
      client: PATHS.client,
    },
    output: {
      path: PATHS.build,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: '/',
    },
    resolve: {
      alias: {
        images: path.resolve(__dirname, 'assets/img/'),
        app: path.resolve(__dirname, 'app/'),
        theme: path.resolve(__dirname, 'app/theme'),
        utils: path.resolve(__dirname, 'app/utils/'),
        pages: path.resolve(__dirname, 'app/pages/'),
        config: path.resolve(__dirname, 'app/config'),
        actions: path.resolve(__dirname, 'app/actions/'),
        reducers: path.resolve(__dirname, 'app/reducers/'),
        components: path.resolve(__dirname, 'app/components/'),
      },
      extensions: ['.js', '.jsx'],
    },
    node: {
      fs: 'empty',
    },
    plugins: [
      new ReactLoadablePlugin({
        filename: `${PATHS.build}/react-loadable.json`,
      }),
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
        safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
    ],

  },
  parts.cleanBuildPath({ include: PATHS.build }),
  parts.loadJavaScript({ include: [PATHS.client, PATHS.app] }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.extractBundles([
    {
      name: ['lib', 'vendor'],
      minChunks: 2,
    },
  ]),

  parts.happyPackThread('js', ['babel-loader']),
  parts.happyPackThread('jsx', ['babel-loader']),
]);

const productionConfig = merge([
  parts.setMode('production'),
  {
    output: {
      path: PATHS.build,
      chunkFilename: '[name].[chunkhash:8].bundle.js',
      filename: '[name].[chunkhash:8].bundle.js',
      publicPath: '/',
    },
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.uglifyJs(),
  parts.visualizer(),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production',
  ),
  parts.attachRevision(),
]);

const developmentConfig = merge([
  parts.setMode('development'),
  parts.devServer({
    host: 'localhost',
    port: process.env.PORT,
  }),
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
]);

module.exports = (env) => {
  console.log(env, 'this is env');
  return env === 'production'
    ? merge(commonConfig, productionConfig)
    : merge(commonConfig, developmentConfig);
};
