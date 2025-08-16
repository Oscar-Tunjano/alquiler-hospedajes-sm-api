// src/models/User.js
// Definición del esquema de usuario en MongoDB con mongoose

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,    // en la BD debe ser único
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true   // almacenaremos el hash
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
