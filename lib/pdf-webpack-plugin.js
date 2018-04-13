const puppeteer = require("puppeteer");
const _ = require("underscore");
const path = require("path");

class GeneratePDF {
  constructor(options) {
    this.options = _.extend(
      {
        path: undefined,
        filename: "file.pdf",
        format: "A4",
        printBackground: true,
        landscape: false,
        content: ""
      },
      options
    );
  }
  apply(compiler) {
    const options = this.options;
    compiler.hooks.done.tap("GeneratePDF", stats => {
      const { assets, outputOptions } = stats.compilation;
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        if (options.content) {
          await page.setContent(options.content);
          for (var key in assets) {
            if (path.extname(key) == ".js") {
              await page.addScriptTag({ path: assets[key].existsAt });
            }
          }
        } else {
          for (var key in assets) {
            if (path.extname(key) == ".html") {
              await page.goto("file://" + assets[key].existsAt);
            } else if (path.extname(key) == ".js") {
              await page.addScriptTag({ path: assets[key].existsAt });
            }
          }
        }
        await page.pdf({
          path: options.path || `${outputOptions.path}/${options.filename}`,
          format: options.format,
          landscape: options.landscape,
          printBackground: options.printBackground
        });
        await browser.close();
      })();
    });
  }
}

module.exports = GeneratePDF;
