const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
// const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function (env, { mode = 'development' }) {
  return {
    mode,
    context: path.resolve(__dirname, './src'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'lib/[name].js',
    },
    devtool: 'sourcemap',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: mode === 'production' },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 50,
              name: 'images/[name].[ext]',
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 50,
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' },
      ]),
      new MiniCssExtractPlugin({
        filename: `css/[name]${mode === 'production' ? '.min' : ''}.css`,
      }),
      new WebpackPwaManifest({
        name: 'Xin Example',
        short_name: 'Xin Example',
        description: 'My Xin Example!',
        background_color: '#3f51b5',
        theme_color: '#3f51b5',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          {
            src: path.resolve('src/assets/large-icon.png'),
            size: '1024x1024', // you can also use the specifications pattern
          },
        ],
      }),
      new GenerateSW({
        importWorkboxFrom: 'local',
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: [
          'fonts/**/*.{eot,svg,ttf,woff,woff2}',
        ],
      }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    devServer: {
      disableHostCheck: true,
      contentBase: path.join(__dirname, 'www'),
      // https: true,
      // port: 8443,
      host: '0.0.0.0',
    },
  };
};
