const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'index.js'
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader', 
                options: {}}
            ]
        },
        {
            test: /\.scss$/,
            use:["style-loader",
                'css-loader',
                "sass-loader"]
        },
    ]
   },
   plugins:[ // inline scripts into index.html and avoid writing index.js to disk
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inlineSource: '.(js)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new IgnoreAssetsWebpackPlugin({
            ignore: 'index.js'
        })
   ]
};