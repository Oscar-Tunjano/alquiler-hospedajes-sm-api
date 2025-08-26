const Reserva = require("../models/reserva.model");

// Crear una nueva reserva
const crearReserva = async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    const reservaGuardada = await nuevaReserva.save();

    res.status(201).json({
      message: "Reserva creada exitosamente",
      reserva: reservaGuardada
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la reserva",
      error: error.message
    });
  }
};

// Obtener todas las reservas
const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener reservas",
      error: error.message
    });
  }
};

// Obtener una reserva por su ID
const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la reserva",
      error: error.message
    });
  }
};

// Actualizar una reserva por ID
const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true } // Devuelve la reserva actualizada
    );

    if (!reservaActualizada) {
      return res.status(404).json({
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      message: "Reserva actualizada correctamente",
      reserva: reservaActualizada
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar reserva",
      error: error.message
    });
  }
};

// Eliminar una reserva por ID
const eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);

    if (!reservaEliminada) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json({
      message: "Reserva eliminada correctamente",
      reserva: reservaEliminada
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar reserva",
      error: error.message
    });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
};
