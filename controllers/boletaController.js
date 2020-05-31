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
    total_venta = 0;
    let rut;

    for (let i = 0; i < boleta.venta.length; i++) {
      const actual = await Venta.findById(boleta.venta[i]);

      const next = await Venta.findById(boleta.venta[i + 1]);

      total_venta = total_venta + actual.total;
      rut = actual.rut_cliente;
      if (next != null) {
        if (actual.rut_cliente != next.rut_cliente) {
          throw (error = {
            data: 'Los rut registrados en la venta no coinciden',
          });
        }
      }
    }
    boleta.total_boleta = total_venta;

    if (boleta.despacho != true) boleta.direccion = null;

    if (boleta.despacho == true && boleta.direccion == null)
      throw (error = {
        data: 'Debe ingresar una direccion',
      });
    const doc = await boleta.save();
    res.status(201).json({
      status: 'success',
      data: {
        rut_cliente: rut,
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

exports.getBoletasRut = catchAsync(async (req, res, next) => {
  try {
    const ventas = await Venta.find({
      rut_cliente: req.params.rut,
    });

    const boletas = await Boleta.find({ venta: ventas });

    if (boletas.length == 0) {
      throw (error = {
        data: `No hay boletas registradas con el rut ${req.params.rut}`,
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        rut_cliente: req.params.rut,
        data: boletas,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: {
        data: error,
      },
    });
  }
});
