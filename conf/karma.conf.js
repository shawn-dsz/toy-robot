module.exports = function(config) {
  config.set({

    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],

    frameworks: ['mocha'],

    files: [
      'webpack.test.js'
    ],

    preprocessors: {
      'webpack.test.js': ['webpack']
    },

    // reporters: ['dots'],
    reporters: ['progress'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [{
          test: /\.js$/,
          loaders: ['babel-loader', 'eslint-loader'],
          exclude: /node_modules/
        }],
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          },
          exclude: /node_modules/
        }]
      }
    },

    webpackServer: {
      noInfo: true
    }

  })
}
