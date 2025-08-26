// tests/reservas.test.js
const request = require('supertest');
const app = require('../src/app');

describe('API Reservas - pruebas básicas', () => {
  test('Crear reserva válida → status 200 y retorna reservaId', async () => {
    const response = await request(app)
      .post('/api/reservas')
      .send({
        usuarioId: 'user-test',
        propiedadId: 'prop-test',
        fechaInicio: '2025-09-01',
        fechaFin: '2025-09-05'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('reservaId');
    expect(response.body.estado).toBe('confirmada');
  }, 10000);

  test('Rechazar reserva con fechaFin < fechaInicio → 400', async () => {
    const response = await request(app)
      .post('/api/reservas')
      .send({
        usuarioId: 'user-test',
        propiedadId: 'prop-test',
        fechaInicio: '2025-09-10',
        fechaFin: '2025-09-05'
      });

    expect(response.statusCode).toBe(400);
  });
});
