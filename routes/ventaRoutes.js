const express = require('express');
const ventaController = require('./../controllers/ventaController');

const router = express.Router();

router
  .route('/')
  .get(ventaController.getVentas)
  .post(ventaController.crearVenta);

router
  .route('/:id')
  .get(ventaController.getVenta)
  .patch(ventaController.editarVenta)
  .delete(ventaController.borrarVenta);

module.exports = router;
