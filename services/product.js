const Product = require("../models/product");

async function createProduct(productParams) {
  try {
    const { name, price } = productParams;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error("Ürün oluşturulurken hata oluştu:", error);
    return null;
  }
}

async function getProduct(productParams) {
  const { id } = productParams;
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error("Ürün getirilirken hata oluştu:", error);
    return null;
  }
}

async function getProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error);
    return [];
  }
}

async function updateProduct(productParams) {
  const { id, name, price } = productParams;
  try {
    const product = await Product.findById(id);
    if (product) {
      product.name = name;
      product.price = price;
      await product.save();
      return product;
    } else {
      console.error("Ürün bulunamadı");
      return null;
    }
  } catch (error) {
    console.error("Ürün güncellenirken hata oluştu:", error);
    return null;
  }
}

async function deleteProduct(productParams) {
  const { id } = productParams;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct ? true : false;
  } catch (error) {
    console.error("Ürün silinirken hata oluştu:", error);
    return false;
  }
}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
