/**
 * Envuelve funciones async para manejar errores sin try/catch en cada ruta
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};