const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ====================
//  Registro
// ====================
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const nuevo = new User({ nombre, email, password });
    await nuevo.save();

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      userId: nuevo._id,
    });
  } catch (error) {
    console.error("Error en REGISTER:", error);
    res.status(500).json({ error: error.message });
  }
});

// ====================
//  Login
// ====================
router.post("/login", async (req, res) => {
  try {
    console.log("Body recibido en LOGIN:", req.body);

    const { email, password } = req.body;

    // 👀 Importante: select("+password") para traer la contraseña
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await user.compararPassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso", token });
  } catch (error) {
    console.error("Error en LOGIN:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
