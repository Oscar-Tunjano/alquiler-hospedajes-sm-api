const express = require("express");
const cors = require("cors");

const app = express();

// Middleware para leer JSON
app.use(express.json());
app.use(cors());

// Importar rutas de autenticación
const authRoutes = require("./routes/auth.routes");

// Usar las rutas bajo /api/auth
app.use("/api/auth", authRoutes);

// Puerto
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
