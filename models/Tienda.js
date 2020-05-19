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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tienda', TiendaSchema);
