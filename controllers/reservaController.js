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
    despacho: req.body.despacho,
    direccion: req.body.direccion,
  });
  try {
    const libro = await Libro.findById(reserva.libro);
    if (!libro.estado) {
      if (reserva.despacho) {
        reserva.tienda = null;
        if (reserva.direccion == null) {
          throw error;
        }
      }
      if (reserva.despacho == false && reserva.tienda == null) {
        data = 'Ingrese una tienda para el retiro del producto';
        res.status(404).json({
          status: 'error',
          data: {
            data: data,
          },
        });
      }

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
      status: 'No se realizo la reserva',
      data: {
        data: error,
      },
    });
  }
});
