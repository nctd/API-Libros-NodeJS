const factory = require('./handlerFactory');
const Tienda = require('./../models/Tienda');
const Reserva = require('./../models/Reserva');
const Stock = require('./../models/Stock');
const catchAsync = require('../utils/catchAsync');

exports.getTienda = factory.Buscar(Tienda);
exports.getTiendas = factory.mostrarTodos(Tienda);
exports.crearTienda = factory.Agregar(Tienda);
exports.editarTienda = factory.Actualizar(Tienda);
exports.borrarTienda = factory.Borrar(Tienda);

exports.getTiendaStock = catchAsync(async (req, res, next) => {
  try {
    const tienda = (await Tienda.findById(req.params.id)).id;

    const stocks = await Stock.find({ tienda: tienda });

    res.status(200).json({
      status: 'success',
      data: {
        data: stocks,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: {
        data: error.message,
      },
    });
  }
});

exports.getTiendaReservas = catchAsync(async (req, res, next) => {
  try {
    const tienda = (await Tienda.findById(req.params.id)).id;

    const reservas = await Reserva.find({ tienda: tienda });

    res.status(200).json({
      status: 'success',
      data: {
        data: reservas,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: {
        data: error.message,
      },
    });
  }
});
