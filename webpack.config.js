const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "process": require.resolve("process/browser"),
      "fs": require.resolve("browserify-fs"),
      "path": require.resolve("path-browserify"),
      "buffer": require.resolve("buffer/"),
    },
    alias: {
      'readable-stream': 'stream-browserify',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
};