const redisClient = require("../config/redis");

const cacheMiddleware = (key) => async (req, res, next) => {
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error("Cache middleware error:", error);
    next();
  }
};

module.exports = cacheMiddleware;
