const { redisCon } = require("../utils/redis");

async function addToCart({ userId, productId, quantity = 1 }) {
  if (
    typeof userId !== "string" ||
    userId.trim() === "" ||
    typeof productId !== "string" ||
    productId.trim() === ""
  ) {
    console.error("Invalid userId or productId");
    return false;
  }

  try {
    const client = await redisCon();
    const cartKey = `cart:${userId.trim()}`;
    const currentQuantity = parseInt(
      (await client.hGet(cartKey, productId.trim())) || "0",
      10
    );
    const newQuantity = currentQuantity + parseInt(quantity, 10);

    await client.hSet(cartKey, productId.trim(), newQuantity.toString());
    return true;
  } catch (error) {
    console.error("Error in addToCart:", error);
    return false;
  }
}

async function removeFromCart({ userId, productId }) {
  if (
    typeof userId !== "string" ||
    userId.trim() === "" ||
    typeof productId !== "string" ||
    productId.trim() === ""
  ) {
    console.error("Invalid userId or productId");
    return false;
  }

  try {
    const client = await redisCon();
    const cartKey = `cart:${userId.trim()}`;
    const currentQuantity = parseInt(
      (await client.hGet(cartKey, productId.trim())) || "0",
      10
    );
    const newQuantity = Math.max(0, currentQuantity - 1);

    if (newQuantity === 0) {
      await client.hDel(cartKey, productId.trim());
    } else {
      await client.hSet(cartKey, productId.trim(), newQuantity.toString());
    }

    return true;
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return false;
  }
}

async function viewCart(userId) {
  if (typeof userId !== "string" || userId.trim() === "") {
    console.error("Invalid userId");
    return null;
  }

  try {
    const client = await redisCon();
    const cartKey = `cart:${userId.trim()}`;
    return await client.hGetAll(cartKey);
  } catch (error) {
    console.error("Error in viewCart:", error);
    return null;
  }
}

async function clearCart(userId) {
  if (typeof userId !== "string" || userId.trim() === "") {
    console.error("Invalid userId");
    return false;
  }

  try {
    const client = await redisCon();
    const cartKey = `cart:${userId.trim()}`;
    await client.del(cartKey);

    const remainingContent = await client.hGetAll(cartKey);
    if (Object.keys(remainingContent).length === 0) {
      console.log(`Cart cleared successfully for user: ${userId}`);
      return true;
    } else {
      console.error(`Failed to clear cart for user: ${userId}`);
      return false;
    }
  } catch (error) {
    console.error("Error in clearCart:", error);
    return false;
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  viewCart,
  clearCart,
};
