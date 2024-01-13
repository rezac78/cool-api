const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Course = require("../api/models/Course");
const Time = 20000;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
  await Course.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Course API Tests", () => {
  it(
    "should create a new course",
    async () => {
      const res = await supertest(app).post("/api/admin/courses").send({
        title: "Test Course",
        description: "Test description",
        price: 100,
        author: "Test Author",
        publishedDate: "2022-01-01",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty("_id");
    },
    Time
  );

  it(
    "should retrieve all courses",
    async () => {
      const res = await supertest(app).get("/api/admin/courses");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    },
    Time
  );

  // Additional tests for updateCourse and deleteCourse...
});
