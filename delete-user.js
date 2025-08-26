const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno

const conectarDB = require('./src/config/db');
const User = require('./src/models/user.model'); // Asegúrate de que este sea el correcto

// Conectar a la BD
conectarDB();

// Función interactiva para eliminar usuario
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('🧾 Ingrese el ID del usuario a eliminar: ', async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      console.log('✅ Usuario eliminado:', user);
    } else {
      console.log('⚠️ Usuario no encontrado');
    }
  } catch (error) {
    console.error('❌ Error al eliminar el usuario:', error.message);
  } finally {
    mongoose.connection.close();
    readline.close();
  }
});
