const mongoose = require('mongoose');
const Libro = require('./Libro');

const StockSchema = mongoose.Schema(
  {
    libro: {
      type: mongoose.Schema.ObjectId,
      ref: 'Libro',
      required: [true, 'El stock debe pertenecer a un libro'],
    },
    tienda: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tienda',
      required: [true, 'El stock debe pertenecer a un libro'],
    },
    cantidad: {
      type: Number,
      required: [true, 'El stock necesita una cantidad'],
    },
  },
  { timestamps: true }
);

StockSchema.index({ libro: 1, tienda: 1 }, { unique: true });

module.exports = mongoose.model('Stocks', StockSchema);
