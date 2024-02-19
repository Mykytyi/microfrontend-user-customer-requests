const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/frontend'),
    // The chunk filename (code-splitting) must contain the content hash to avoid caching problems
    chunkFilename: 'chunk.[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    fallback: {
      os: false,
      moment: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            url: false,
          },
        }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'local',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: path.resolve(__dirname, '../src/frontend/index.html'),
    }),
  ],
};
