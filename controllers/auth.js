//PUBLIC

const userService = require("../services/user");
const authService = require("../services/auth");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }
    try {
      const response = await authService.login(req.body);
      res.status(200).send({ response });
    } catch (error) {
      res.status(500).send({ error: "An error occurred during login" });
    }
  },
  register: async (req, res) => {
    try {
      const response = await userService.createUser(req.body);
      const message = response
        ? "User registered successfully"
        : "User registration failed";
      res.status(response ? 200 : 500).send({ response: message });
    } catch (error) {
      res.status(500).send({ error: "An error occurred during register" });
    }
  },
};

module.exports = authController;
