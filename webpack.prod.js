// Imports
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack config
module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname,'src/client/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: 'index',
      filename: '[name].html',
      template: path.resolve(__dirname,'src/client/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [ {
      from: path.resolve(__dirname,'src/client/assets'),
      to: path.resolve(__dirname,'dist/assets'),
      }
      ]
    })
  ]
};