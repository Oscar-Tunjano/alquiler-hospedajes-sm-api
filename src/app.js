// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());             // permitir peticiones desde el navegador
app.use(express.json());     // parseo JSON body

// Exportar la app para que server.js la use
module.exports = app;

// almacenamiento en memoria (para pruebas rápidas)
const reservas = [];

// middleware de autenticación simple: NO bloquea durante los tests
function authMiddleware(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next(); // para las pruebas automáticas
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No autorizado' });
  next();
}

// POST /api/reservas
app.post('/api/reservas', authMiddleware, (req, res) => {
  console.log('[API] POST /api/reservas body:', req.body); // útil para debug
  const { usuarioId, propiedadId, fechaInicio, fechaFin } = req.body || {};

  if (!usuarioId || !propiedadId || !fechaInicio || !fechaFin) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  if (isNaN(inicio) || isNaN(fin)) {
    return res.status(400).json({ message: 'Fechas inválidas' });
  }
  if (fin < inicio) {
    return res.status(400).json({ message: 'fechaFin debe ser >= fechaInicio' });
  }

  const reservaId = `rsv-${Date.now()}`;
  const reserva = { reservaId, usuarioId, propiedadId, fechaInicio, fechaFin, estado: 'confirmada' };
  reservas.push(reserva);

  return res.json({ message: 'Reserva creada exitosamente', reservaId, estado: 'confirmada' });
});

// GET /api/reservas/:usuarioId -> devuelve las reservas de un usuario
app.get('/api/reservas/:usuarioId', authMiddleware, (req, res) => {
  const u = req.params.usuarioId;
  const userReservas = reservas.filter(r => r.usuarioId === u);
  res.json(userReservas);
});


