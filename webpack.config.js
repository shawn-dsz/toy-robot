var Webpack = require('webpack')
  // var path = require('path')
module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080', // remove this line when build webpack for prod
    './src/app'
  ],
  output: {
    path: __dirname,
    filename: './dist/app.bundle.js'
  },
  // devtool: 'inline-source-map',
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['babel', 'eslint'],

      exclude: /(node_modules|bower_components)/
    }],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  //watch: true,
  eslint: {
    configFile: '.eslintrc',
    quiet: false
  },
  plugins: [
    new Webpack.SourceMapDevToolPlugin(),
    new Webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  }
}
