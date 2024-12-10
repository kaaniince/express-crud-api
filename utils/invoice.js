async function createInvoice(orderId) {
  console.log("invoice created ", orderId);
  return orderId;
}

module.exports = { createInvoice };
