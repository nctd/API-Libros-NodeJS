const express = require('express');
const stockController = require('./../controllers/stockController');

const router = express.Router();

router
  .route('/')
  .get(stockController.getStocks)
  .post(stockController.agregarStock);

router
  .route('/:id')
  // .get(stockController.getStockTienda)
  .patch(stockController.editarStock)
  .delete(stockController.borrarStock);

module.exports = router;
