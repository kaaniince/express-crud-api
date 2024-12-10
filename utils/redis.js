const { createClient } = require("redis");

async function redisCon() {
  try {
    console.log("Redis bağlantısı başlatılıyor...");
    const client = await createClient({
      url: "redis://localhost:6379",
    })
      .on("error", (err) => console.log("Redis Client Error", err))
      .on("connect", () => console.log("Redis bağlantısı başarılı"))
      .connect();

    // Bağlantı durumunu kontrol et
    if (!client.isOpen) {
      throw new Error("Redis bağlantısı kurulamadı");
    }

    console.log("Redis bağlantısı hazır");
    return client;
  } catch (e) {
    console.log("Redis bağlantı hatası:", e);
    throw e;
  }
}
module.exports = {
  redisCon,
};
