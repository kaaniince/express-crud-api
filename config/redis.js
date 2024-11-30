const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.connect().then(() => {
  console.log("Connected to Redis");
});

module.exports = redisClient;
