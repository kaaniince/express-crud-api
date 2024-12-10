const { redisCon } = require("../utils/redis");

async function addToCart(params) {
  try {
    const { userId, productId, quantity = 1 } = params;

    // Check for required parameters
    if (!userId || !productId) {
      console.error(
        "Missing required parameters: userId and productId are required"
      );
      return false;
    }

    const client = await redisCon();
    const cartKey = `cart:${userId}`;

    // Check current quantity and convert to string
    const currentQuantity =
      (await client.hGet(cartKey, productId.toString())) || "0";
    const newQuantity = (
      parseInt(currentQuantity, 10) + parseInt(quantity, 10)
    ).toString();

    await client.hSet(cartKey, productId.toString(), newQuantity);
    return true;
  } catch (error) {
    console.error("Error occurred while adding product to cart:", error);
    return false;
  }
}
async function removeFromCart(params) {
  try {
    const { userId, productId } = params;

    if (!userId || !productId) {
      console.error(
        "Missing required parameters: userId and productId are required"
      );
      return false;
    }

    const client = await redisCon();
    const cartKey = `cart:${userId}`;
    await client.hDel(cartKey, productId.toString());

    return true;
  } catch (error) {
    console.error("Error occurred while removing product from cart:", error);
    return false;
  }
}

// 1 ürün silindi
// async function removeFromCart(params) {
//     try {
//       const { userId, productId } = params;

//       if (!userId || !productId) {
//         console.error(
//           "Missing required parameters: userId and productId are required"
//         );
//         return false;
//       }

//       const client = await redisCon();
//       const cartKey = `cart:${userId}`;

//       // Mevcut miktarı kontrol et
//       const currentQuantity = await client.hGet(cartKey, productId.toString()) || "0";
//       const newQuantity = Math.max(0, parseInt(currentQuantity, 10) - 1);

//       if (newQuantity === 0) {
//         // Miktar 0'a düştüyse ürünü tamamen sil
//         await client.hDel(cartKey, productId.toString());
//       } else {
//         // Yeni miktarı güncelle
//         await client.hSet(cartKey, productId.toString(), newQuantity.toString());
//       }

//       return true;
//     } catch (error) {
//       console.error("Error occurred while removing product from cart:", error);
//       return false;
//     }
//   }

async function viewCart(userId) {
  try {
    if (!userId) {
      console.error("Missing required parameter: userId is required");
      return null;
    }

    const client = await redisCon();
    const cartKey = `cart:${userId}`;
    const cartItems = await client.hGetAll(cartKey);
    return cartItems;
  } catch (error) {
    console.error("Error occurred while viewing the cart:", error);
    return null;
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  viewCart,
};
