const request = require("supertest");
const app = require("../src/server");

test("GET /api/tickets returnerar en lista", async () => {
    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});