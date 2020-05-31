const express = require('express');
const boletaController = require('./../controllers/boletaController');

const router = express.Router();

router
  .route('/')
  .get(boletaController.getBoletas)
  .post(boletaController.crearBoleta);

router
  .route('/:id')
  .get(boletaController.getBoleta)
  .patch(boletaController.editarBoleta)
  .delete(boletaController.borrarBoleta);

router.route('/:rut/rut').get(boletaController.getBoletasRut);
module.exports = router;
