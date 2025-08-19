const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model"); // ajusta la ruta si tu modelo está en otra carpeta

// 🔑 Función para generar token
function generarToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_SECRET,      // viene del archivo .env
    { expiresIn: "1h" }          // el token expira en 1 hora
  );
}

// 📌 Registro
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validar campos
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword,
    });

    await nuevoUsuario.save();

    // Generar token
    const token = generarToken(nuevoUsuario);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar usuario
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = generarToken(usuario);

    res.json({
      message: "Login exitoso",
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
