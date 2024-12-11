const basketService = require("../services/basket");

const basketController = {
  addToCart: async (req, res) => {
    try {
      console.log("Request body:", req.body);

      const isSuccess = await basketService.addToCart(req.body);
      console.log("Service response:", isSuccess);

      if (isSuccess) {
        res.status(201).send({ message: "Product added to cart successfully" });
      } else {
        res.status(500).send({
          error: "Failed to add product to cart",
        });
      }
    } catch (error) {
      console.error("Error in addToCart:", error);

      res.status(500).send({
        error: "An error occurred while adding product to cart",
        details: error.message,
      });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const isSuccess = await basketService.removeFromCart(req.body);
      if (isSuccess) {
        res
          .status(200)
          .send({ message: "Product removed from cart successfully" });
      } else {
        res.status(500).send({ error: "Failed to remove product from cart" });
      }
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      res
        .status(500)
        .send({ error: "An error occurred while removing product from cart" });
    }
  },
  viewCart: async (req, res) => {
    try {
      console.log("Requested userId:", req.params.userId);

      const cartItems = await basketService.viewCart(req.params.userId);
      console.log("Service response:", cartItems);

      if (cartItems && Object.keys(cartItems).length > 0) {
        res.status(200).send({ cartItems });
      } else {
        res.status(404).send({
          error: "Cart not found",
          userId: req.params.userId,
        });
      }
    } catch (error) {
      console.error("Error in viewCart:", error);
      res.status(500).send({
        error: "An error occurred while viewing the cart",
        details: error.message,
      });
    }
  },
  clearCart: async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }
    try {
      const isSuccess = await basketService.clearCart(userId);
      console.log("Service response:", isSuccess);
      res.status(200).send({ message: isSuccess });
    } catch (error) {
      console.error("Error in clearCart:", error);
      res.status(500).send({
        error: "An error occurred while clearing the cart",
      });
    }
  },
};

module.exports = basketController;
