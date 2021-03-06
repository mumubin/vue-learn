const path = require("path");
const createVueLoaderOptions = require("./vue-loader.config");
const isDev = process.env.NODE_ENV === "development";
const config = {
  mode : process.env.NODE_ENV || 'production',
  target: "web",
  entry: path.resolve(__dirname, "../client/index.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitError: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: ['babel-loader']
      },
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(fig|jpg|jpeg|svg|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "resources/[path][name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
