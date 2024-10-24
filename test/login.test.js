import request from "supertest";
import app from "../app.js";
import { pool } from "../database/pool.js"; // PostgreSQL connection pool
import redisClient from "../redis/redis.client.js";

describe("API Endpoint Tests with PostgreSQL and Redis", () => {
  beforeAll(async () => {
    // Connect to PostgreSQL and Redis before running the tests
    await pool.connect();
  });

  // Utility function for login request
  const postLoginRequest = (userData) => request(app).post("/api/user/login").send(userData);

  it("should return success message for POST /api/user/login with valid credentials", async () => {
    const validUser = {
      phone_number: "1234567890", // Replace with valid test phone number
      password: "validpassword",  // Replace with valid test password
    };

    const response = await postLoginRequest(validUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("webToken");
  });

  it("should return 400 error for POST /api/user/login with missing fields", async () => {
    const invalidUser = {
      phone_number: "1234567890", // Password is missing
    };

    const response = await postLoginRequest(invalidUser);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "All fields are required");
  });

  it("should return 404 error for POST /api/user/login with invalid phone number", async () => {
    const invalidUser = {
      phone_number: "9999999999",  // Non-existent phone number
      password: "password123",
    };

    const response = await postLoginRequest(invalidUser);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "No such phone number found");
  });

  it("should return 401 error for POST /api/user/login with invalid password", async () => {
    const invalidUser = {
      phone_number: "1234567890",  // Replace with a valid test phone number
      password: "wrongpassword",   // Incorrect password
    };

    const response = await postLoginRequest(invalidUser);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid credentials");
  });

  afterAll(async () => {
    // Clean up PostgreSQL and Redis connections
    try {
      await redisClient.flushall(); // Optional: Clear Redis cache after tests
    } catch (err) {
      console.error("Error cleaning Redis cache:", err);
    } finally {
      await pool.end(); // Close PostgreSQL connection
      await redisClient.quit(); // Close Redis connection
    }
  });
});