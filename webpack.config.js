var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],
  module: {
    loaders: [{
      test: /\.css$/,
    },]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'social-button.min.js',
    publicPath: '/dist/',
    library: 'socialButton',
    libraryTarget: 'umd',
    umdNamedDefine: true

  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    })
  ]
};