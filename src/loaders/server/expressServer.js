const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express")
const config = require("../../config");
const logger = require("../logger");

// correra  cuando se levante la app

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.basePathUser = `${config.api.prefix}/users`

    this._middlewares();
    this._swaggerConfig();

    this._routes();

    this._notFound();
    this._errorHandler();

  }

  _middlewares() {
    // funcion privada por eso el gion bajo
    this.app.use(express.json());
    this.app.use(morgan('tiny')); // para imprimir por consola a que ruta le estamos pegando
  }

  _routes() {

      this.app.head("/status", (req, res) => { // cuando la aplicacion se cae esta peticion nos dira si esta viva o no, ose si todavia esta funcionando
        res.status(200).end();
      })

      this.app.use(this.basePathUser, require('../../routes/users'))
  }

  _notFound() {
      this.app.use((req, res, next) => { // esto maneja errores para cuando alguien esta pegando a algun path que no tenemos en nuestra url
        const err = new Error("Not Found");
        err.status = 404;
        err.code = 404;
        next(err);
      })
  }

  _errorHandler() {
    this.app.use((err, req, res, next) => { //este es un manejadore de errores este nos va a ayudar para poder ver los errores de nuestra aplicacion
      const code = err.code || 500;
      
      logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      logger.error(err.stack);

      res.status(code);
      const body = {
        error: {
          code, 
          message: err.message
        }
      }
      res.json(body);
    })
  }

  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUi.serve,
      swaggerUi.setup(require('../swagger/swagger.json'))
    );
  }

  async start() {
    this.app.listen(this.port, (error) => {
      if(error) {
        logger.error(err);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = ExpressServer;
