// // Karma configuration
// // Generated on Fri Feb 12 2016 01:19:58 GMT+1300 (New Zealand Daylight Time)
//
// module.exports = function(config) {
//   config.set({
//
//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',
//
//
//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ['mocha'],
//
//
//     // list of files / patterns to load in the browser
//     files: [
//       'tests.webpack.js' //just load this file
//     ],
//
//
//     // list of files to exclude
//     exclude: [],
//
//
//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {
//       'tests.webpack.js': ['webpack']
//     },
//
//
//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ['progress'],
//
//
//     // web server port
//     port: 9876,
//
//
//     // enable / disable colors in the output (reporters and logs)
//     colors: true,
//
//
//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,
//
//
//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,
//
//
//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: [
//       //  'Chrome'
//     ],
//
//
//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,
//
//     // Concurrency level
//     // how many browser should be started simultaneous
//     concurrency: Infinity
//   })
// }
var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],
    //  browsers: [],
//    singleRun: true,

    frameworks: ['mocha'],

    files: [
      'webpack.test.js'
    ],

    preprocessors: {
      'webpack.test.js': ['webpack']
    },

    reporters: ['dots'],

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

  });
};
