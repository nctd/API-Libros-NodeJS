const mongoose = require('mongoose');

const ReservaSchema = mongoose.Schema(
  {
    libro: {
      type: mongoose.Schema.ObjectId,
      ref: 'Libro',
      required: [true, 'Debe seleccionar un libro para la reserva'],
    },
    tienda: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tienda',
    },
    fecha_entrega: {
      type: Date,
      required: [true, 'Ingrese fecha de entrega'],
    },
    despacho: {
      type: Boolean,
      required: [true, 'Seleccione un tipo de despacho'],
      //Si es falso,se requiere una tienda
    },
    direccion: {
      type: String,
      // required: [true, 'Ingrese una direccion'],
    },
  },
  { timestamps: true }
);

// VentaSchema.index({ libro: 1, tienda: 1 }, { unique: true });

module.exports = mongoose.model('Reservas', ReservaSchema);
