const mongoose = require('mongoose');

const BoletaSchema = mongoose.Schema(
  {
    venta: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Venta',
        required: [true, 'Debe seleccionar un libro para la reserva'],
      },
    ],
    despacho: {
      type: Boolean,
      required: [true, 'Seleccione un tipo de despacho'],
      //Si es falso,se requiere una tienda
    },
    direccion: {
      type: String,
      // required: [true, 'Ingrese una direccion'],
    },
    fecha_entrega: {
      type: Date,
      required: [true, 'Ingrese fecha de entrega'],
    },
    total_boleta: {
      type: Number,
    },
  },
  { timestamps: true }
);

BoletaSchema.index({ venta: 1 }, { unique: true });

module.exports = mongoose.model('Boletas', BoletaSchema);
