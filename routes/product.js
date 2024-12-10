const express = require("express");
const productController = require("../controllers/product");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, productController.getProducts);

// Diğer işlemler
router.post("/", authMiddleware, productController.createProduct);
router.put("/", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.get("/:id", authMiddleware, productController.getProduct);

module.exports = router;
