// routes/reserva.routes.js
const express = require("express");
const router = express.Router();
const {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
} = require("../controllers/reserva.controller");

// CRUD completo
router.post("/", crearReserva);              // Crear
router.get("/", obtenerReservas);            // Listar todas
router.get("/:id", obtenerReservaPorId);     // Obtener por ID
router.put("/:id", actualizarReserva);       // Actualizar por ID
router.delete("/:id", eliminarReserva);      // Eliminar por ID

module.exports = router;


