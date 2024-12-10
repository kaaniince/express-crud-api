const mongooseProduct = require("../models/product");

async function createProduct(productParams) {
  try {
    const { name, price, description, color, stock } = productParams;
    const newProduct = new mongooseProduct({
      name,
      price,
      description,
      color,
      stock,
    });
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
    const product = await mongooseProduct.findById(id);
    return product;
  } catch (error) {
    console.error("Ürün getirilirken hata oluştu:", error);
    return null;
  }
}

async function getProducts() {
  try {
    const products = await mongooseProduct.find();
    return products;
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error);
    return [];
  }
}

async function updateProduct(productParams) {
  const { id, name, price, description, color, stock } = productParams;
  try {
    const product = await mongooseProduct.findById(id);

    product.name = name;
    product.price = price;
    product.description = description;
    product.color = color;
    product.stock = stock;
    await product.save();
    return product;
  } catch (error) {
    console.error("Ürün güncellenirken hata oluştu:", error);
    return null;
  }
}

async function deleteProduct(productParams) {
  const { id } = productParams;
  try {
    const deletedProduct = await mongooseProduct.findByIdAndDelete(id);
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
