var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Objeto global de la app
var app = express();

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");

var isProduction = process.env.NODE_ENV === 'production';

mongoose.connect(
  process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, socketTimeoutMS: 50000, connectTimeoutMS: 50000 },
  function (err, res) {
      try {
          console.log('Connected to Database, sí se conecta');
      } catch (err) {
          throw err;
      }
  }
);

/* mongoose.set("debug", true); */

const errorhandler = require('errorhandler')
if (!isProduction) {
  mongoose.set('debug', true)
  app.use(errorhandler())
  // imprimirá los errores en development
  app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    })
  })
}


require("./models/User");
require('./config/passport');
require('./models/SavingGoal');
require('./models/Investment');
require('./models/Budget');
require('./models/QuoteEOD');
require('./models/Income');
require('./models/Expense');
require('./models/Transaction');
require('./models/BankTransaction');

// Aquí se importarán los modelos Mascota y Solicitud cuando estén listos

/*********************** Mongoose Configuration *******************************/

// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));

// Interceptando los errores 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
var server = app.listen(process.env.PORT || 3001, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});