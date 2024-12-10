const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Object,
  },
});

module.exports = mongoose.model("Order", orderSchema);
