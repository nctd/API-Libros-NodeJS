const mongoose = require('mongoose');

const ReservaSchema = mongoose.Schema(
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
    tienda: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tienda',
      required: [true, 'Debe seleccionar una tienda para la reserva'],
    },
    fecha_disponible: {
      type: Date,
      required: [true, 'Ingrese fecha de entrega'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservas', ReservaSchema);
