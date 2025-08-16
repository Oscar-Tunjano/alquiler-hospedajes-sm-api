const express = require("express");
const router = express.Router();

// 📍 Ruta de registro
router.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  res.json({
    message: "✅ Usuario registrado correctamente",
    data: { nombre, email }
  });
});

// 📍 Ruta de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "oscar@example.com" && password === "123456") {
    return res.json({ message: "✅ Autenticación satisfactoria" });
  } else {
    return res.status(401).json({ error: "❌ Error en la autenticación" });
  }
});

module.exports = router;
console.log("📩 Datos recibidos en /register:", req.body);
