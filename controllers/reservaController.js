const Reserva = require('./../models/Reserva');
const factory = require('./handlerFactory');
const Libro = require('./../models/Libro');
const catchAsync = require('../utils/catchAsync');

exports.getReserva = factory.Buscar(Reserva);
exports.getReservas = factory.mostrarTodos(Reserva);
exports.editarReserva = factory.Actualizar(Reserva);
exports.borrarReserva = factory.Borrar(Reserva);

exports.crearReserva = catchAsync(async (req, res, next) => {
  const reserva = new Reserva({
    libro: req.body.libro,
    tienda: req.body.tienda,
    fecha_disponible: req.body.fecha_disponible,
  });
  try {
    const libro = await Libro.findById(reserva.libro);
    if (!libro.estado) {
      const doc = await reserva.save();
      res.status(201).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    } else {
      data = 'El libro no esta disponible para reservar';
      res.status(404).json({
        status: 'error',
        data: {
          data: data,
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
