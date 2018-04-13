const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const GeneratePDF = require("./lib/pdf-webpack-plugin");

module.exports = {
  entry: {
    main: ["babel-polyfill", "./src/index.jsx"]
  },
  resolve: {
    modules: ["src", "node_modules"]
  },
  output: {
    path: path.resolve("public"),
    publicPath: "/",
    filename: function(...args) {
      if (process.env.NODE_ENV == "production") {
        return "[name]-[chunkhash].js";
      } else {
        return "[name].js";
      }
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve("src", "index.html"),
      filename: "index.html",
      inject: "body"
    }),
    new GeneratePDF({
      filename: "LIANE - Canvas Eleitoral.pdf",
      content: '<div id="app"></div>',
      landscape: true
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
