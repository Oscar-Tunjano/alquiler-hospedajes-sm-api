const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hospedaje");
    console.log("✅ Conexión a MongoDB establecida correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;

