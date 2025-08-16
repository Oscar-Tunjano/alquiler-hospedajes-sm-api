# API Hospedaje - Registro e Inicio de Sesión

## Scripts
- `npm install`
- `npm run dev` (desarrollo con nodemon)
- `npm start` (producción)

## Variables de entorno (.env)
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/hospedajeDB
JWT_SECRET=supersecreto_cambia_esto
```

## Endpoints
- POST `/api/register`
- POST `/api/login`