const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env = {}) {
  return {
    context: path.resolve(__dirname, './src'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'lib/[name].js',
    },
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: getCssLoader(env),
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: getHtmlLoader(env),
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/i,
          use: getUrlLoader('./images/[name].[ext]'),
        },
        {
          test: /\.(woff2?|eot|ttf)(\?.*)?$/i,
          use: getUrlLoader('./fonts/[name].[ext]'),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: getBabelLoader(env),
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
      }),
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' },
      ]),
    ],
    devServer: {
      compress: true,
      contentBase: path.join(__dirname, 'www'),
    },
  };
};

function getUrlLoader (name = '[name].[ext]') {
  return {
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: name,
    },
  };
}

function getHtmlLoader () {
  return 'html-loader';
}

function getCssLoader () {
  return [ 'style-loader', 'css-loader', 'sass-loader' ];
}

function getBabelLoader () {
  let plugins = [
    // require.resolve('babel-plugin-transform-async-to-generator'),
    // [ require.resolve('babel-plugin-__coverage__'), { 'ignore': 'node_modules' } ],
    // require.resolve('babel-plugin-syntax-dynamic-import'),
    // require.resolve('babel-plugin-istanbul')
  ];

  let presets = [
    // require.resolve('babel-preset-es2015'),
    // require.resolve('babel-preset-stage-3'),
  ];

  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      plugins,
      presets,
      cacheDirectory: true,
    },
  };
}
