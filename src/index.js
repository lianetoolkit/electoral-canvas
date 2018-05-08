import express from "express";
import path from "path";
import webpackConfig from "../webpack.config.js";
import canvas from "./app";

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", canvas);

app.get("/render/:campaignId", (req, res) => {
  res.send({ id: req.params.campaignId });
});

app.use("/files", express.static(path.join(__dirname, "../files")));

if (ENV !== "production") {
  const webpack = require("webpack");
  const webpackDev = require("webpack-dev-middleware");
  const webpackHot = require("webpack-hot-middleware");
  const compiler = webpack({ ...webpackConfig, mode: "development" });
  const history = require("connect-history-api-fallback");
  app.use(history());
  app.use(
    webpackDev(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(
    webpackHot(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );
} else {
  app.use(express.static(webpackConfig.output.path));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(webpackConfig.output.path, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
