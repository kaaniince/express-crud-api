const moongoseOrder = require("../models/order");
const kafka = require("../utils/kafka");
const invoice = require("../utils/invoice");

async function createOrder(orderParams) {
  try {
    const { userId, products } = orderParams;
    const newOrder = new moongoseOrder({ userId, products });
    await newOrder.save();
    if (newOrder) {
      kafka.sendMessage("order", `Order created: orderId: ${newOrder.id}`);
      invoice.createInvoice(newOrder.id);
    } else {
      console.error("Sipariş oluşturulurken hata oluştu");
    }
    return newOrder;
  } catch (error) {
    console.error("Sipariş oluşturulurken hata oluştu:", error);
    return null;
  }
}

async function getOrder(orderParams) {
  const { id } = orderParams;
  try {
    const order = await moongoseOrder.findById(id);
    return order;
  } catch (error) {
    console.error("Sipariş getirilirken hata oluştu:", error);
    return null;
  }
}

async function getOrders() {
  try {
    const orders = await moongoseOrder.find();
    return orders;
  } catch (error) {
    console.error("Siparişler getirilirken hata oluştu:", error);
    return [];
  }
}

async function updateOrder(orderParams) {
  const { id, userId, products } = orderParams;
  try {
    const order = await moongoseOrder.findById(id);
    if (order) {
      order.userId = userId;
      order.products = products;
      await order.save();
      return order;
    } else {
      console.error("Sipariş bulunamadı");
      return null;
    }
  } catch (error) {
    console.error("Sipariş güncellenirken hata oluştu:", error);
    return null;
  }
}

async function deleteOrder(orderParams) {
  const { id } = orderParams;
  try {
    const deletedOrder = await moongoseOrder.findByIdAndDelete(id);
    return deletedOrder ? true : false;
  } catch (error) {
    console.error("Sipariş silinirken hata oluştu:", error);
    return false;
  }
}

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
