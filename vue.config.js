const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const configureWebpack = {
  plugins: []
}

if (process.env.NODE_ENV !== 'production') {
  configureWebpack.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server'
    })
  )
}

module.exports = {
  publicPath : './',
  outputDir: 'docs',
  configureWebpack
}