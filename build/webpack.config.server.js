const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");
// const VueServerPlugin

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: '"development"'
    }
  })
];

const baseConfig = require("./webpack.config.base");

let config;


config = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, "../client/server-entry.js"),
  devtool: 'source-map',
  output:{
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.resolve(__dirname,"../server-build")
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            "stylus-loader"
          ]
        })
      },
      {
        test: /\.stylus/,
        use: ExtractPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            "stylus-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.ene,NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.ene,VUE_ENV': 'server',
    })
  ]
})
;

module.exports = config;
