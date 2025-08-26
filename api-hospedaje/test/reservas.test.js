const request = require("supertest");
const app = require("../src/server"); // tu servidor Express

describe("Pruebas del módulo de reservas", () => {
  test("Debe crear una reserva válida", async () => {
    const response = await request(app)
      .post("/api/reservas")
      .send({
        usuarioId: "64e91f...",
        propiedadId: "abc123",
        fechaInicio: "2025-09-01",
        fechaFin: "2025-09-05"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("reservaId");
  });

  test("Debe rechazar reserva con fechas inválidas", async () => {
    const response = await request(app)
      .post("/api/reservas")
      .send({
        usuarioId: "64e91f...",
        propiedadId: "abc123",
        fechaInicio: "2025-09-10",
        fechaFin: "2025-09-05"
      });
    expect(response.statusCode).toBe(400);
  });
});
