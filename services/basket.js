const { redisCon } = require("../utils/redis");

async function addToCart(params) {
  if (
    typeof params.userId !== "string" ||
    params.userId.trim() === "" ||
    typeof params.productId !== "string" ||
    params.productId.trim() === ""
  ) {
    console.error("Invalid userId or productId");
    return false;
  }

  try {
    const client = await redisCon();
    const cartKey = `cart:${params.userId.trim()}`;
    const currentBasket = (await client.get(cartKey))
      ? JSON.parse(await client.get(cartKey))
      : [];

    const productIndex = currentBasket.findIndex(
      (item) => item.productId === params.productId.trim()
    );
    if (productIndex !== -1) {
      currentBasket[productIndex].quantity += parseInt(params.quantity, 10);
    } else {
      currentBasket.push({
        productId: params.productId.trim(),
        productName: params.productName.trim(),
        quantity: parseInt(params.quantity, 10),
      });
    }

    await client.set(cartKey, JSON.stringify(currentBasket));
    return true;
  } catch (error) {
    console.error("Error in addToCart:", error);
    return false;
  }
}

async function removeFromCart({ userId, productId, quantity = 1 }) {
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
    const currentBasket = (await client.get(cartKey))
      ? JSON.parse(await client.get(cartKey))
      : [];

    const productIndex = currentBasket.findIndex(
      (product) => product.productId === productId.trim()
    );

    if (productIndex !== -1) {
      // Mevcut miktar
      const currentQuantity = currentBasket[productIndex].quantity;

      // Yeni miktar hesaplama
      const newQuantity = currentQuantity - parseInt(quantity, 10);

      if (newQuantity > 0) {
        // Miktar 0'dan büyükse güncelle
        currentBasket[productIndex].quantity = newQuantity;
      } else {
        // Miktar 0 veya daha azsa ürünü tamamen kaldır
        currentBasket.splice(productIndex, 1);
      }

      await client.set(cartKey, JSON.stringify(currentBasket));
      return true;
    }

    return false; // Ürün bulunamadıysa false döndür
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
    // hGetAll yerine get kullanıp JSON parse edelim
    const cart = await client.get(cartKey);
    return cart ? JSON.parse(cart) : [];
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
