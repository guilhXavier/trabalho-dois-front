const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.ts',
    register: './src/register.ts',
    search: './src/search.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Resenhas - Listar',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'Resenhas - Cadastro',
      filename: 'register.html',
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      title: 'Resenhas - Pesquisa',
      filename: 'search.html',
      chunks: ['search'],
    }),
  ],
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
}
