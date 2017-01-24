'use strict';


module.exports = {
  entry: './web/src/main.js',

  output: {
    path: './web/dist',
    filename: 'bundle.js',
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
        path: './web',
        loader: 'file-loader',
      },
    ],
  },
};
