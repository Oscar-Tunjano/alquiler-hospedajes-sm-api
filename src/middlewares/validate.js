/**
 * Middleware para centralizar errores de express-validator
 */
import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Validación fallida',
      errores: errors.array().map(e => ({ campo: e.path, mensaje: e.msg }))
    });
  }
  next();
}