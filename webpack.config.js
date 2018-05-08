const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const ENV = process.env.NODE_ENV;

const hotMiddlewareScript =
  "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true";

let entry = ["./client/index.jsx"];
let plugins = [
  new HTMLWebpackPlugin({
    template: path.resolve("client", "index.html"),
    filename: "index.html",
    inject: "body"
  })
];

if (ENV !== "production") {
  plugins = [...plugins, new webpack.HotModuleReplacementPlugin()];
  entry = [...entry, hotMiddlewareScript];
}

module.exports = {
  entry,
  resolve: {
    modules: ["client", "node_modules"]
  },
  output: {
    path: path.resolve("public"),
    publicPath: "/",
    filename: function(...args) {
      if (ENV == "production") {
        return "[name]-[hash].js";
      } else {
        return "[name].js";
      }
    }
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /fonts\/(.*)\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader?name=fonts/[name].[ext]&publicPath=./"
      },
      {
        test: /\.(png|jpg|svg|gif|mp4)$/,
        use: "file-loader?name=assets/[name].[hash].[ext]&publicPath=./"
      }
    ]
  }
};
