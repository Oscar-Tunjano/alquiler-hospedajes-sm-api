// Rutas de autenticación (registro y login)
// Aquí solo definimos endpoints y validaciones.

const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

// Middleware simple para centralizar el manejo de errores de validación
function validarCampos(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errores.array() });
  }
  next();
}

// POST /api/auth/register
router.post(
  '/register',
  [
    body('nombre').trim().isLength({ min: 3 }).withMessage('El nombre es obligatorio y debe tener al menos 3 caracteres.'),
    body('email').isEmail().withMessage('Debe proporcionar un email válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
  ],
  validarCampos,
  (req, res) => {
    // Log para evidenciar datos recibidos (no dejar en producción con datos sensibles)
    console.log('📩 Datos recibidos en /register:', { ...req.body, password: '***' });
    return register(req, res);
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Debe proporcionar un email válido.'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.')
  ],
  validarCampos,
  (req, res) => {
    console.log('🔑 Intento de /login con:', { ...req.body, password: '***' });
    return login(req, res);
  }
);

module.exports = router;
