const express = require('express');
const tiendaController = require('./../controllers/tiendaController');

const router = express.Router();

router
  .route('/')
  .get(tiendaController.getTiendas)
  .post(tiendaController.crearTienda);

router
  .route('/:id')
  .get(tiendaController.getTienda)
  .patch(tiendaController.editarTienda)
  .delete(tiendaController.borrarTienda);

router.route('/:id/stocks').get(tiendaController.getTiendaStock);
router.route('/:id/reservas').get(tiendaController.getTiendaReservas);
router.route('/:id/ventas').get(tiendaController.getTiendaVentas);
module.exports = router;
