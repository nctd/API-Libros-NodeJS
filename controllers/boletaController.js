const factory = require('./handlerFactory');
const Boleta = require('./../models/Boleta');
const Venta = require('./../models/Venta');
const catchAsync = require('../utils/catchAsync');

exports.getBoleta = factory.Buscar(Boleta);
exports.getBoletas = factory.mostrarTodos(Boleta);
exports.editarBoleta = factory.Actualizar(Boleta);
exports.borrarBoleta = factory.Borrar(Boleta);

exports.crearBoleta = catchAsync(async (req, res, next) => {
  try {
    const boleta = new Boleta({
      venta: req.body.venta,
      despacho: req.body.despacho,
      direccion: req.body.direccion,
      fecha_entrega: req.body.fecha_entrega,
      total_boleta: req.body.total_boleta,
    });
    total_boleta = 0;
    for (let i = 0; i < boleta.venta.length; i++) {
      const actual = await Venta.findById(boleta.venta[i]);
      const next = await Venta.findById(boleta.venta[i + 1]);
      console.log(`Vuelta:${i}`);
      total_boleta = total_boleta + actual.total;
      console.log(total_boleta);

      if (actual.rut_cliente != next.rut_cliente) {
        throw (error = {
          data: 'Los rut registrados en la venta no coinciden',
        });
      }
    }
    boleta.total_boleta = total_boleta;

    const doc = await boleta.save();
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'No se realizo la boleta',
      data: {
        data: error,
      },
    });
  }
});
