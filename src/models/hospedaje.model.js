const mongoose = require("mongoose");

const hospedajeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  precioNoche: { type: Number, required: true },
  capacidad: { type: Number, required: true },
  ubicacion: { type: String },
  fotos: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Hospedaje", hospedajeSchema);
