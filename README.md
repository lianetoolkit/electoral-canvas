# LIANE

## Electoral Canvas

### Installation

#### Depedencies

* Node (v8 or newer)
* Chromium or Google Chrome (for PDF generation through [puppeteer](https://github.com/GoogleChrome/puppeteer))

---

#### Clone and build

Clone the repository, install dependencies and build:

```
$ git clone https://github.com/lianetoolkit/electoral-canvas.git
$ cd electoral-canvas
$ npm install
$ npm run build
```

Generated files, including PDF, will be at the `public/` directory.

---

### Serving the canvas

You can run a webserver to access interactive web version with PDF download link. E.g. with python http server:

```
$ cd public/
$ python -m SimpleHTTPServer
```
