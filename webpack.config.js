const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: ["./src/index.jsx"]
  },
  resolve: {
    modules: ["src", "node_modules"]
  },
  output: {
    path: path.resolve("public"),
    publicPath: "/",
    filename: "[name]-[chunkhash].js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve("src", "index.html"),
      filename: "index.html",
      inject: "body"
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        test: /\.(png|jpg|gif|svg|woff2|woff|eot|ttf|mp4)$/,
        use: "file-loader"
      }
    ]
  }
};
