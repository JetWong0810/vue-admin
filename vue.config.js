const path = require('path')
const webpack = require('webpack')
const envSettings = require('./src/env')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('core', resolve('src/core')).set('assets', resolve('src/asset'))
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html']
    },
    performance: {
      hints: false
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
        $: 'jquery',
        Mock: 'mockjs'
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/style/share.scss";'
      }
    }
  },
  devServer: {
    host: envSettings.baseUrl,
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://dev.fbiapilicence.happyelements.net',
        changeOrigin: true,
        ws: true
      }
    }
  },
  transpileDependencies: ['vuex-persist']
}
