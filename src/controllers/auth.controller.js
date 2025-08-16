// src/controllers/authController.js
// Funciones para registro e inicio de sesión

const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // validar campos usando express-validator (se crea en las rutas)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 400 Bad Request con detalles de validación
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, email, password } = req.body;

  try {
    // 1) Verificar si el email ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // 2) Crear instancia de usuario (password por ahora en claro)
    user = new User({ nombre, email, password });

    // 3) Hashear la contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4) Guardar usuario en BD
    await user.save();

    // 5) Crear JWT (opcional pero recomendado)
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    // 201 Created con mensaje, token y datos básicos del usuario
    return res.status(201).json({
      message: 'Registro exitoso',
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  // Validaciones
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // 1) Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      // No damos pistas (puedes unificar mensaje para seguridad)
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 2) Comparar password con bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 3) Generar token JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Respuesta exitosa
    return res.json({
      message: 'Autenticación satisfactoria',
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
