const mongoose = require('mongoose');

const LibroSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El libro debe tener un titulo'],
    },
    descripcion: {
      type: String,
      required: [true, 'El libro debe tener una descripcion'],
    },
    autor: {
      type: String,
      required: [true, 'El libro debe tener un autor'],
    },
    precio: {
      type: Number,
      required: [true, 'El libro debe tener un precio'],
    },
    estado: {
      type: Boolean,
      required: [true, 'El libro debe tener un estado'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Libros', LibroSchema);
