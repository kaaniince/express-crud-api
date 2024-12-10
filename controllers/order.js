const orderService = require("../services/order");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const response = await orderService.createOrder(req.body);
      if (response) {
        res.status(201).send({ response });
      } else {
        res.status(500).send({ error: "Order creation failed" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during order creation" });
    }
  },
  getOrder: async (req, res) => {
    try {
      const response = await orderService.getOrder(req.params);
      if (response) {
        res.status(200).send({ response });
      } else {
        res.status(404).send({ error: "Order not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during fetching the order" });
    }
  },
  getOrders: async (req, res) => {
    try {
      const response = await orderService.getOrders();
      if (response) {
        res.status(200).send({ response });
      } else {
        res.status(500).send({ error: "No orders found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during fetching the orders" });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const response = await orderService.updateOrder(req.body);
      if (response) {
        res.status(200).send({ response });
      } else {
        res.status(404).send({ error: "Order not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during updating the order" });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const response = await orderService.deleteOrder(req.params);
      if (response) {
        res.status(200).send({ response: "Order deleted successfully" });
      } else {
        res.status(404).send({ error: "Order not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred during deleting the order" });
    }
  },
};

module.exports = orderController;
