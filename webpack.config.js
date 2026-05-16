const path = require('path');

module.exports = {
  mode: 'production',
  entry: './firebase-init.js',
  output: {
    filename: 'firebase-bundle.js',
    path: path.resolve(__dirname, 'public'),
    library: 'FirebaseApp',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify')
    }
  }
};
