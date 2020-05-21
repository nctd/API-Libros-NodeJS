const Stock = require('./../models/Stock');
const Tienda = require('./../models/Tienda');
const Libro = require('./../models/Libro');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getStocks = factory.mostrarTodos(Stock);
exports.getStock = factory.Buscar(Stock);
// exports.crearStock = factory.Agregar(Stock);
exports.editarStock = factory.Actualizar(Stock);
exports.borrarStock = factory.Borrar(Stock);

exports.agregarStock = catchAsync(async (req, res, next) => {
  const stock = new Stock({
    libro: req.body.libro,
    tienda: req.body.tienda,
    cantidad: req.body.cantidad,
  });
  try {
    const libro = await Libro.findById(stock.libro);
    if (libro.estado) {
      const doc = await stock.save();
      res.status(201).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    } else {
      res.status(404).json({
        status: 'Libro no disponible',
        data: {
          data: error,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: {
        data: error,
      },
    });
  }
});
