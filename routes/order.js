const express = require("express");
const orderController = require("../controllers/order");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, orderController.getOrders);

// Diğer işlemler
router.post("/", authMiddleware, orderController.createOrder);
router.put("/:id", authMiddleware, orderController.updateOrder);
router.delete("/:id", authMiddleware, orderController.deleteOrder);
router.get("/:id", authMiddleware, orderController.getOrder);

module.exports = router;
