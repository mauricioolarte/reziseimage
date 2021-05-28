const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.uploadImagesPath = '/api/uploadimages'

    // Middlewares
    this.middlewares();

    // rutas de la aplicacion
    this.routes();

  }

  middlewares() {

    // CORS

    this.app.use(cors());

    // parseo y lectura del body
    this.app.use(express.json())

    // upload images
    this.app.use(fileUpload());

    // directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.uploadImagesPath, require('../routes/uploadImages'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en puerto', this.port)
    })
  }

}
module.exports = Server;