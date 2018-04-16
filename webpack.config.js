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
    publicPath: "./",
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
      filename: "LIANE - Canvas Eleitoral A3.pdf",
      format: "A3",
      scale: 1.1,
      landscape: true
    }),
    new GeneratePDF({
      filename: "LIANE - Canvas Eleitoral A4.pdf",
      format: "A4",
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
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|mp4)$/,
        use: "file-loader?name=assets/[name].[hash].[ext]"
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader?name=fonts/[name].[ext]&publicPath=./"
      }
    ]
  }
};
