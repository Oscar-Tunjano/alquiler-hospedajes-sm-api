// Modelo de Usuario con Mongoose
// Guarda nombre, email único y contraseña hasheada.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true, // impide duplicados
      match: [/^\S+@\S+\.\S+$/, 'Email no válido']
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
      select: false // por seguridad, no se devuelve por defecto
    }
  },
  { timestamps: true }
);

// Hook: antes de guardar, hasheamos la contraseña si fue modificada
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método de instancia: compara una contraseña con el hash guardado
UserSchema.methods.compararPassword = function (passwordPlana) {
  return bcrypt.compare(passwordPlana, this.password);
};

module.exports = mongoose.model('User', UserSchema);


