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
        test: /\.scss$/,
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
