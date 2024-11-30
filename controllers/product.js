const redisClient = require("../config/redis");
const productService = require("../services/product");

const productController = {
  createProduct: async (req, res) => {
    try {
      const response = await productService.createProduct(req.body);
      if (response) {
        // Yeni ürün oluşturulunca Redis'teki ürün listesini temizleyelim
        await redisClient.del("products");
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
    const productId = req.params.id;
    try {
      // Cache'te ürün var mı kontrol et
      const cachedProduct = await redisClient.get(`product:${productId}`);
      if (cachedProduct) {
        return res.status(200).send({ response: JSON.parse(cachedProduct) });
      }

      // Cache'te yoksa veritabanından al
      const response = await productService.getProduct(req.params);
      if (response) {
        // Ürünü cache'e kaydet
        await redisClient.setEx(
          `product:${productId}`,
          3600, // 1 saatlik cache süresi
          JSON.stringify(response)
        );
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
      // Cache'te ürün listesi var mı kontrol et
      const cachedProducts = await redisClient.get("products");
      if (cachedProducts) {
        return res.status(200).send({ response: JSON.parse(cachedProducts) });
      }

      // Cache'te yoksa veritabanından al
      const response = await productService.getProducts();
      if (response) {
        // Ürün listesini cache'e kaydet
        await redisClient.setEx(
          "products",
          3600, // 1 saatlik cache süresi
          JSON.stringify(response)
        );
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
        // Ürün güncellendiğinde ilgili ürünün ve ürün listesinin cache'ini temizle
        await redisClient.del(`product:${req.body.id}`);
        await redisClient.del("products");
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
        // Ürün silindiğinde ilgili ürünün ve ürün listesinin cache'ini temizle
        await redisClient.del(`product:${req.params.id}`);
        await redisClient.del("products");
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
