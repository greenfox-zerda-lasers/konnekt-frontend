'use strict';


module.exports = {
  entry: './web/src/app.js',

  output: {
    path: './web/dist',
    filename: 'bundle.js',
  },

  preprocessors: {
    'test/*.js': ['webpack'],
    'src/app/*.js': ['webpack'],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        path: './web/images',
        loader: 'file-loader?name=images/[name].[ext]&publicPath=dist/',
      },
    ],
  },
};
