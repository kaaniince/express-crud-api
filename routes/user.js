const express = require("express");

const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/korumali", authMiddleware, function test(req, res) {
  console.log(req.user, "req.user");
  res.status(200).send({ response: "korumali" });
});
router.put("/", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUser);
router.post("/order", userController.createOrder);

module.exports = router;
