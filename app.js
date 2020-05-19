const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

// Importar Routes
const tiendasRoute = require('./routes/tiendaRoutes');
const librosRoute = require('./routes/libroRoutes');
const stocksRoute = require('./routes/stockRoutes');
const reservasRoute = require('./routes/reservaRoutes');
const ventasRoute = require('./routes/ventaRoutes');

app.use('/libros', librosRoute);
app.use('/tiendas', tiendasRoute);
app.use('/stocks', stocksRoute);
app.use('/reservas', reservasRoute);
app.use('/ventas', ventasRoute);

// RUTAS
app.get('/', (req, res) => {
  res.send('ESTAMOS CORRIENDO');
});

// Conexion DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Conexion DB');
  }
);
// Listen
app.listen(3000);
