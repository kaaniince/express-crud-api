//PRIVADE

const userService = require("../services/user");
const { kafka } = require("../utils/kafka");

const userController = {
  updateUser: async (req, res) => {
    try {
      const response = await userService.updateUser(req.body);
      res.status(200).send({ response });
    } catch (error) {
      res.status(500).send({ error: "An error occurred during login" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const response = await userService.deleteUser(req.params);
      if (response) {
        res.status(200).send({ response: "User registered successfully" });
      } else {
        res.status(500).send({ error: "User registration failed" });
      }
    } catch (error) {
      res.status(500).send({ error: "An error occurred during register" });
    }
  },
  getUser: async (req, res) => {
    try {
      const response = await userService.getUser(req.params);
      res.status(200).send({ response });
    } catch (error) {
      res.status(500).send({ error: "An error occurred during get user" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const response = await userService.getUsers();
      res.status(200).send({ response });
    } catch (error) {
      res.status(500).send({ error: "An error occurred during get users" });
    }
  },
  createOrder: async (req, res) => {
    try {
      await kafka.sendMessage("order", "order created");
    } catch (error) {
      res.status(500).send({ error: "An error occurred during create order" });
    }
  },
};

module.exports = userController;
