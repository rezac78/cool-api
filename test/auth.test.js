const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../api/models/User");
const Time = 20000;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authentication and Authorization Tests", () => {
  test(
    "should register a new user",
    async () => {
      const res = await supertest(app).post("/api/auth/register").send({
        username: "newUser",
        email: "newuser@example.com",
        password: "Password123",
        role: "user",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.token).toBeDefined();
    },
    Time
  );
  test(
    "should login the user",
    async () => {
      // Use the same credentials as the registration test
      const res = await supertest(app).post("/api/auth/login").send({
        email: "newuser@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    },
    Time
  );
  test(
    "should prevent access to admin-only route for non-admin user",
    async () => {
      const loginRes = await supertest(app).post("/api/auth/login").send({
        email: "newuser@example.com",
        password: "password123",
      });

      expect(loginRes.statusCode).toBe(200); // Check if login is successful
      const token = loginRes.body.token;

      const res = await supertest(app)
        .get("/api/admin/admin-only")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403); // Forbidden
    },
    Time
  );
});
