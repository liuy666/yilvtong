const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function (err, fd) {
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vender-exten', 'vender-base'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: '景区系统' + package.version,
      filename: '../index.html',
      inject: false
    }),
    new CopyWebpackPlugin([{
        from: 'src/views/main-components/theme-switch/theme'
      },
      {
        from: 'src/views/my-components/text-editor/tinymce'
      }
    ], {
      ignore: [
        'text-editor.vue'
      ]
    })
  ],
  // devServer: {
  //     // 有contentBase，hot 等参数，可以自己查询
  //     port: 8082,
  //     // proxy: {
  //     //     this.baseUrl+'': {
  //     //         target: 'http://192.168.0.111:8082/',
  //     //         pathRewrite: { '^/api': '' },
  //     //         changeOrigin: true
  //     //     }
  //     // }

  // }
  devServer: {
    port: 8082,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {
      colors: true
    },
    proxy: {
      '/api': {
        target: 'http://192.168.123.1:10000',
        // target: 'http://192.168.90.186:8082',
        //   target: 'http://192.168.90.11:80',
        // target: 'http://192.168.90.169:8084',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      },
      '/lee': {
        target: 'http://192.168.123.1:10000',
        // target: 'http://192.168.90.171:86',  
        pathRewrite: {
          '^/lee': ''
        },
        changeOrigin: true
      },
      '/fm': {
        // target: 'http://192.168.91.211:8083',
        // target: 'http://192.168.90.169:8084',
        // target: 'http://192.168.90.186:8082',
        target: 'http://192.168.123.1:10000',
        pathRewrite: {
          '^/fm': ''
        },
        changeOrigin: true
      }
    }
  }
});