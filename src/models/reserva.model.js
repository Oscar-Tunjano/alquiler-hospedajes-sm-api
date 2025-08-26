// models/reserva.model.js
const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  hospedaje: { type: mongoose.Schema.Types.ObjectId, ref: "Hospedaje", required: true },
  fechaEntrada: { type: Date, required: true },
  fechaSalida: { type: Date, required: true },
  cantidadPersonas: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reserva", reservaSchema);
