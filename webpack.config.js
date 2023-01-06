const { mode } = require('webpack-nano/argv')
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  watch: mode === 'development',
  entry: ['./src', 'webpack-plugin-serve/client'],
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({ context: { title: 'Demo' } }),
    new WebpackPluginServe({
      port: parseInt(process.env.PORT, 10) || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ],
  module: {
    rules: [
      // { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        sideEffects: true
      }
    ]
  }
}
