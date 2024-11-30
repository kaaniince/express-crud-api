const jwt = require("jsonwebtoken");
require("dotenv").config();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUBhYWEuY29tIiwiaWF0IjoxNzMyNjU1NjQ4LCJleHAiOjE3MzI2NTkyNDh9.oeRN-8G3CUcnRmxKyPIZGD_DOQH6yUn34D3JNy6JK3U
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
