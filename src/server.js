// src/server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = require('./app');

// Middlewares
app.use(express.json());

// Servir estáticos desde /public (carpeta HERMANA de /src)
app.use(express.static(path.join(__dirname, "../public")));

// Página raíz: renderiza index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Endpoints de verificación
app.get("/api", (req, res) => {
  res.json({ mensaje: "API hospedaje funcionando correctamente ✅" });
});

app.get("/health-root", (req, res) => {
  res.json({ status: "OK", mensaje: "Servidor activo 🚀" });
});


// Rutas de tu API
const reservasRouter = require("./routes/reserva.routes");
const authRouter = require("./routes/auth.routes");
const hospedajesRouter = require("./routes/hospedaje.routes");

app.use("/api/auth", authRouter);
app.use("/api/reservas", reservasRouter);
app.use("/api/hospedajes", hospedajesRouter);

// Conexión a MongoDB y arranque del server
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospedaje")
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
  })
  
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));


