require("dotenv").config();

const app = require("./app");
console.log("🧪 app:", app); // ← agrega esto para verificar

const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/hospedaje", {})
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));
