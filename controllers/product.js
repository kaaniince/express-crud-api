const productService = require("../services/product");

const productController = {
  createProduct: async (req, res) => {
    try {
      const response = await productService.createProduct(req.body);
      if (response) {
        res.status(201).send({ response });
      } else {
        res.status(500).send({ error: "Product creation failed" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during product creation" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const response = await productService.getProduct(req.params);
      if (response) {
        res.status(200).send({ response });
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during fetching the product" });
    }
  },
  getProducts: async (req, res) => {
    console.log("Connected to kaan");

    try {
      const response = await productService.getProducts();
      if (response) {
        res.status(200).send({ response });
      } else {
        res.status(500).send({ error: "No products found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during fetching the products" });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const response = await productService.updateProduct(req.body);
      if (response) {
        res.status(200).send({ response });
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during updating the product" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const response = await productService.deleteProduct(req.params);
      if (response) {
        res.status(200).send({ response: "Product deleted successfully" });
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during deleting the product" });
    }
  },
};

module.exports = productController;
