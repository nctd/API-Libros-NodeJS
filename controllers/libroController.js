const factory = require('./handlerFactory');
const Libro = require('./../models/Libro');
const Stock = require('./../models/Stock');
const Reserva = require('./../models/Reserva');
const catchAsync = require('../utils/catchAsync');

exports.getLibro = factory.Buscar(Libro);
exports.getLibros = factory.mostrarTodos(Libro);
exports.crearLibro = factory.Agregar(Libro);
exports.editarLibro = factory.Actualizar(Libro);
exports.borrarLibro = factory.Borrar(Libro);

exports.getLibroStock = catchAsync(async (req, res, next) => {
  try {
    const libro = (await Libro.findById(req.params.id)).id;
    const nombreLibro = (await Libro.findById(req.params.id)).titulo;

    const stocks = await Stock.find({ libro: libro });

    res.status(200).json({
      status: 'success',
      nombre_libro: nombreLibro,
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

exports.getLibroReservas = catchAsync(async (req, res, next) => {
  try {
    const libro = (await Libro.findById(req.params.id)).id;
    const nombreLibro = (await Libro.findById(req.params.id)).titulo;

    const reservas = await Reserva.find({ libro: libro });

    res.status(200).json({
      status: 'success',
      nombre_libro: nombreLibro,
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
