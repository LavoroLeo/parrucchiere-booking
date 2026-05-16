const path = require('path');

module.exports = {
  mode: 'production',
  entry: './firebase-init.js',
  output: {
    filename: 'firebase-bundle.js',
    path: path.resolve(__dirname, 'public'),
    library: 'FirebaseApp',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== "undefined" ? self : this'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                browsers: ['last 2 versions', 'ie >= 11']
              }
            }]],
            plugins: []
          }
        }
      }
    ]
  },
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      events: require.resolve('events/')
    }
  },
  optimization: {
    minimize: true,
    usedExports: true
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
