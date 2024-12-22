// This controller file is implemented WITHOUT all the redis features for local development and testing

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
// import redisClient from "../redis/redis.client.js";
import { pool } from "../database/pool.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating user_id

const createToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.SECRET_WEB_KEY, {
    expiresIn: "10d",
  });
};

// Register user and cache the result
const registerUser = async (req, res) => {
  const { name, phone_number, password } = req.body;

  try {
    if (!name || !phone_number || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if user already exists in the database
    const existQuery = `SELECT * FROM users WHERE phone_number = $1`;
    const existResult = await pool.query(existQuery, [phone_number]);
    if (existResult.rows.length > 0) {
      return res.status(409).send({ error: "Phone number is already in use" });
    }

    // Hash the password and insert the new user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user_id = uuidv4(); // Generate a UUID for the new user
    const createdAt = new Date();

    const insertUserQuery = `
      INSERT INTO users (user_id, name, phone_number, password, createdAt) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING user_id, name;
    `;
    const result = await pool.query(insertUserQuery, [
      user_id,
      name,
      phone_number,
      hashedPassword,
      createdAt,
    ]);
    const user = result.rows[0];

    const webToken = createToken(user.user_id);

    // Cache the new user data in Redis
    // await redisClient.set(`user:${user.user_id}`, JSON.stringify(user), "EX", 3600); // 1 hour expiration

    return res.status(201).send({ name: user.name, webToken });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

// Login user and cache the result if not cached
const loginUser = async (req, res) => {
  const { phone_number, password } = req.body;

  if (!phone_number || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    // Check if user data exists in Redis cache
    let user;
    // const cachedUser = await redisClient.get(`user:${phone_number}`);

    // if (cachedUser) {
    //   // Parse cached user data
    //   user = JSON.parse(cachedUser);
    // } else {
    //   // Fallback to PostgreSQL if cache miss
    //   const query = `SELECT * FROM users WHERE phone_number = $1`;
    //   const result = await pool.query(query, [phone_number]);
    //   user = result.rows[0];
    //   if (!user) {
    //     return res.status(404).send({ error: "No such phone number found" });
    //   }

    //   // Cache the user data
    //   await redisClient.set(
    //     `user:${phone_number}`,
    //     JSON.stringify(user),
    //     "EX",
    //     3600
    //   ); // 1 hour expiration
    // }

    // Query without cache
    // Fallback to PostgreSQL if cache miss
     const query = `SELECT * FROM users WHERE phone_number = $1`;
     const result = await pool.query(query, [phone_number]);
     user = result.rows[0];
     if (!user) {
       return res.status(404).send({ error: "No such phone number found" });
     }

    // Validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const webToken = createToken(user.user_id);
    return res.status(201).send({ user, webToken });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

// Get user by ID with Redis caching
const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    // Check Redis cache first
    // const cachedUser = await redisClient.get(`user:${id}`);
    // if (cachedUser) {
    //   return res.status(200).send(JSON.parse(cachedUser));
    // }

    // // If not in cache, get user from PostgreSQL
    // const query = `SELECT user_id, name, phone_number, createdAt FROM users WHERE user_id = $1`;
    // const result = await pool.query(query, [id]);
    // const user = result.rows[0];
    // if (!user) {
    //   return res.status(404).send({ error: "No such id found" });
    // }

    // // Cache the user data
    // await redisClient.set(`user:${id}`, JSON.stringify(user), "EX", 3600); // 1 hour expiration


    // Query without cache
    const query = `SELECT user_id, name, phone_number, createdAt FROM users WHERE user_id = $1`;
    const result = await pool.query(query, [id]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).send({ error: "No such id found" });
    }

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

// Validate user by ID with Redis caching
const validateUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    // Check Redis cache first
    // const cachedUser = await redisClient.get(`user:${id}`);
    // if (cachedUser) {
    //   return res.status(200).send({ user: JSON.parse(cachedUser) });
    // }

    // If not in cache, get user from PostgreSQL
    const query = `SELECT user_id, name, phone_number, createdAt FROM users WHERE user_id = $1`;
    const result = await pool.query(query, [id]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).send({ error: "No such id found" });
    }

    // Cache the user data
    // await redisClient.set(`user:${id}`, JSON.stringify(user), "EX", 3600); // 1 hour expiration

    return res.status(200).send({ user });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export { registerUser, loginUser, getUserByID, validateUserByID };