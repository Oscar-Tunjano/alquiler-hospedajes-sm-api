// src/app.js

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);

// Ruta de prueba en la raíz
app.get("/", (req, res) => {
  res.send("🚀 API de Hospedaje funcionando...");
});

// ✅ Esta línea debe estar al final del archivo
module.exports = app;
