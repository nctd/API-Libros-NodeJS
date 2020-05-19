const express = require('express');
const libroController = require('./../controllers/libroController');

const router = express.Router();

router
  .route('/')
  .get(libroController.getLibros)
  .post(libroController.crearLibro);

router
  .route('/:id')
  .get(libroController.getLibro)
  // .get('/stocks', libroController.getLibroStock)
  .patch(libroController.editarLibro)
  .delete(libroController.borrarLibro);

router.route('/:id/stocks').get(libroController.getLibroStock);
router.route('/:id/reservas').get(libroController.getLibroReservas);
module.exports = router;
