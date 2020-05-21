const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema(
  {
    rut_cliente: {
      type: String,
      required: [true, 'Ingrese rut'],
    },
    libro: {
      type: mongoose.Schema.ObjectId,
      ref: 'Libro',
      required: [true, 'Debe seleccionar un libro para la reserva'],
    },
    cantidad: {
      type: Number,
      min: [1, 'Cantidad debe ser mayor a 1'],
      max: [99, 'Cantidad debe ser menor a 100'],
      required: [true, 'Debe indicar una cantidad'],
    },
    tienda: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tienda',
      required: [true, 'Debe seleccionar Tienda o Bodega para la venta'],
    },
    total: {
      type: Number,
      // required: [true, 'Ingrese el total de la venta'],
    },
  },
  { timestamps: true }
);

// VentaSchema.index({ libro: 1, tienda: 1 }, { unique: true });

module.exports = mongoose.model('Ventas', VentaSchema);
