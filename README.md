# LIANE

## Electoral Canvas

Electoral Canvas built with [react-flexcanvas](https://github.com/miguelpeixe/react-flexcanvas).

![FlexCanvas Example](https://i.imgur.com/iJlAVoM.png)

### Features

 - Generate PDFs in A3 and A2 formats with custom data (sent through POST request).

---

### Installation

#### Dependencies

* Node (v8 or newer)
* Redis

---

#### Clone and build

Clone the repository, install dependencies and start the server:

```
$ git clone https://github.com/lianetoolkit/electoral-canvas.git
$ cd electoral-canvas
$ npm install
$ npm start
```

Starting the server will run babel server with nodemon, serving the client with webpack dev middleware with hot module replacement enabled.

Access http://localhost:8000/

---

#### Environment variables

 - `NODE_ENV` - Either development or production. *Default to `development`*
 - `PORT` - Port to start the server. *Default to `8000`*
 - `REDIS` - Redis path. *Default to `redis://localhost:6379/electoral-canvas`*

---

### Build and run for production

Build the server and client with `npm run build` and start the server with `npm run serve`.

Compiled server will be at `dist/`, while client will be compiled at `public/`.

---

### Credits

#### Authors

 - [Miguel Peixe](https://github.com/miguelpeixe)

#### Icons

* [FontAwesome](https://fontawesome.com/)
* [Swen-Peter Ekkebus](https://thenounproject.com/ekkebus/)
