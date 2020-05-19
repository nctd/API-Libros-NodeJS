const Venta = require('./../models/Venta');
const factory = require('./handlerFactory');
const Stock = require('./../models/Stock');
const catchAsync = require('../utils/catchAsync');

exports.getVenta = factory.Buscar(Venta);
exports.getVentas = factory.mostrarTodos(Venta);
exports.editarVenta = factory.Actualizar(Venta);
exports.borrarVenta = factory.Borrar(Venta);

exports.crearVenta = catchAsync(async (req, res, next) => {
  const venta = new Venta({
    libro: req.body.libro,
    tienda: req.body.tienda,
    total: req.body.total,
    fecha_entrega: req.body.fecha_entrega,
    despacho: req.body.despacho,
    direccion: req.body.direccion,
  });
  try {
    console.log(venta.libro);
    venta.libro.forEach(async (element) => {
      const stockLibro = await Stock.find({
        libro: element,
        tienda: venta.tienda,
      });
      const cantidadLibro = await Stock.findById(stockLibro);
      console.log(element);
      console.log(test['cantidad']);

      //****************************************************************
      //TODO: DISMINUIR LAS CANTIDADES DE CADA STOCK AL AGREGAR LA VENTA
      //****************************************************************
    });

    // const stockLibro = await Stock.findById(venta.libro);
    // const stockTienda = await Stock.findById(venta.tienda);
    // const stockCantidad = await Stock.findById(venta.tienda);

    // if (venta.despacho) {
    //   venta.tienda = null;
    //   if (venta.direccion == null) {
    //     throw error;
    //   }
    // }
    // if (venta.despacho == false && venta.tienda == null) {
    //   data = 'Ingrese una tienda para el retiro del producto';
    //   res.status(404).json({
    //     status: 'error',
    //     data: {
    //       data: data,
    //     },
    //   });
    // }
  } catch (error) {
    res.status(404).json({
      status: 'No se realizo la venta',
      data: {
        data: error,
      },
    });
  }
});
