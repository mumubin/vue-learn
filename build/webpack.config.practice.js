const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");

const defaultPlugins = [
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.resolve(__dirname,"template.html")
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: '"development"'
    }
  })
];

const baseConfig = require("./webpack.config.base");

let config;

const devServer = {
  port: 8000,
  host: "0.0.0.0",
  overlay: {
    errors: true
  },
  open: true,
  hot: true
}

config = merge(baseConfig, {
  entry: path.resolve(__dirname, "../practice/data-binding/index.js"),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "vue-style-loader",
          'css-loader',
          "stylus-loader"
        ]
      },
      {
        test: /\.stylus/,
        use: [
          "vue-style-loader",
          'css-loader',
          "stylus-loader"
        ]
      }
    ]
  },

  devServer,
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, "../node_modules/vue/dist/vue.esm.js")
    },
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
})
;

module.exports = config;
