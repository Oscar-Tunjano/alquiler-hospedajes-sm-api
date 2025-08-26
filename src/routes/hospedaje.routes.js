const express = require("express");
const router = express.Router();
const Hospedaje = require("../models/hospedaje.model"); // 👈 importar modelo

// Crear nuevo hospedaje
router.post("/create", async (req, res) => {
  try {
    const nuevoHospedaje = new Hospedaje(req.body);
    const hospedajeGuardado = await nuevoHospedaje.save();

    res.status(201).json({
      mensaje: "Hospedaje creado exitosamente",
      hospedaje: hospedajeGuardado,
    });
  } catch (error) {
    console.error("❌ Error al crear hospedaje:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

module.exports = router;
