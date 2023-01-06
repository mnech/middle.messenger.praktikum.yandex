const MiniCss = require('mini-css-extract-plugin');
const HtmlWebpack = require('html-webpack-plugin');

const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: isDev,
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader' 
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCss.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [MiniCss.loader, 'css-loader', 'sass-loader'],
        exclude: /\.module.(s(a|c)ss)$/
      },
      { 
       test: /\.hbs$/,
       loader: 'handlebars-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpack({
      template: './src/index.html',
    }),
    new MiniCss({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
    })
  ],
}; 
