const bcrypt = require("bcryptjs");
const mongooseUser = require("../models/user");
const jwt = require("jsonwebtoken");

async function login(userParams) {
  const { email, password } = userParams;
  try {
    const user = await mongooseUser.findOne({ email: email });
    console.log(user, "User");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { error: "Invalid username or password" };
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { login };
