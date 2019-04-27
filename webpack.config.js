const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const isDev = process.env.NODE_ENV == "development";
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");

const config = {
  target: "web",
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ["vue-loader"]
      },
      {
        test: /\.jsx$/,
        loader: ["babel-loader"]
      },
      {
        test: /\.(fig|jpg|jpeg|svg|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ]
};

if (isDev) {
  config.devtool = "#cheap-module-eval-source-map";
  config.module.rules.push({
    test: /\.styl/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      },
      "stylus-loader"
    ]
  });
  config.devServer = {
    port: 8000,
    host: "0.0.0.0",
    overlay: {
      errors: true
    },
    open: true,
    hot: true
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  config.entry = {
    app: path.join(__dirname, "src/index.js"),
    vendor: ['vue','vue-router','vuex']
  }
  config.output.filename = "[name].[ chunkhash:8].js";
  config.module.rules.push({
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
  });
  config.plugins.push(
    new ExtractPlugin("styles.[hash:8].css"),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all"
      // minSize: 20000,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // name: true
    }),
  );
}

module.exports = config;
