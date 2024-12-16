const basketService = require("../services/basket");

const basketController = {
  addToCart: async (req, res) => {
    const { userId, product } = req.body;
    if (!userId) {
      return res.status(400).send({ message: "userId is required" });
    }

    try {
      const response = await basketService.addToCart(req.body);
      res.status(200).send({ response: response });
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).send({
        error: "An error occurred while adding product to cart",
        details: error.message,
      });
    }
  },
  removeFromCart: async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "userId is required" });
    }
    if (!productId) {
      return res.status(400).send({ message: "productId is required" });
    }

    try {
      const response = await basketService.removeFromCart({
        userId,
        productId,
      });

      if (response) {
        res.status(200).send({ response: true });
      } else {
        res.status(404).send({ message: "Product not found in cart" });
      }
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).send({
        error: "An error occurred while removing product from cart",
        details: error.message,
      });
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
