const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const isDev = process.env.NODE_ENV == "development";
const merge = require("webpack-merge");
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");

const defaultPlugins = [
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.resolve(__dirname, "template.html")
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: isDev ? '"development"' : '"production"'
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
  hot: true,
  historyApiFallback: true
};

if (isDev) {
  config = merge(baseConfig, {
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.resolve(__dirname, "../client/index.js"),
    },
    output: {filename: "[name].[ chunkhash:8].js"},
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
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin("styles.css")
    ])
  });
}
module.exports = config;
