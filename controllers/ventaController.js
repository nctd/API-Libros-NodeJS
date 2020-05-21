const Venta = require('./../models/Venta');
const factory = require('./handlerFactory');
const Stock = require('./../models/Stock');
const Libro = require('./../models/Libro');
const catchAsync = require('../utils/catchAsync');

exports.getVenta = factory.Buscar(Venta);
exports.getVentas = factory.mostrarTodos(Venta);
exports.editarVenta = factory.Actualizar(Venta);
exports.borrarVenta = factory.Borrar(Venta);

exports.crearVenta = catchAsync(async (req, res, next) => {
  try {
    const venta = new Venta({
      rut_cliente: req.body.rut_cliente,
      libro: req.body.libro,
      cantidad: req.body.cantidad,
      tienda: req.body.tienda,
      total: req.body.total,
    });

    const stockLibro = await Stock.find({
      libro: venta.libro,
      tienda: venta.tienda,
    });
    const libro = await Libro.findById(venta.libro);
    const stock = await Stock.findById(stockLibro);
    if (stock['cantidad'] >= venta.cantidad) {
      nuevaCant = stock['cantidad'] - venta.cantidad;
      venta.total = libro.precio * venta.cantidad;
    } else {
      throw (error = { data: 'Solicitud excede stock' });
    }

    await Stock.findByIdAndUpdate(
      stock.id,
      { cantidad: nuevaCant },
      {
        new: true,
        runValidators: true,
      }
    );
    const doc = await venta.save();
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'No se realizo la venta',
      data: {
        data: error,
      },
    });
  }
});
