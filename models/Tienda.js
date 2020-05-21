const mongoose = require('mongoose');

const TiendaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'Debe ingresar un nombre'],
    },
    direccion: {
      type: String,
      required: [true, 'Debe ingresar una direccion'],
    },
    tipo: {
      type: String,
      required: [true, 'Debe ingresar un tipo'],
      enum: {
        values: ['tienda', 'bodega'],
        message: 'Tipo debe ser: tienda o bodega',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tienda', TiendaSchema);
