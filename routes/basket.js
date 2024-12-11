const express = require("express");
const basketController = require("../controllers/basket");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/:userId", authMiddleware, basketController.viewCart);

// Diğer işlemler
router.post("/", authMiddleware, basketController.addToCart);
router.delete("/", authMiddleware, basketController.removeFromCart);
router.post("/clear", authMiddleware, basketController.clearCart);

module.exports = router;
