const express = require('express');
const reservaController = require('./../controllers/reservaController');

const router = express.Router();

router
  .route('/')
  .get(reservaController.getReservas)
  .post(reservaController.crearReserva);

router
  .route('/:id')
  .get(reservaController.getReserva)
  .patch(reservaController.editarReserva)
  .delete(reservaController.borrarReserva);

module.exports = router;
