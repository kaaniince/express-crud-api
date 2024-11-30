# Node.js base image
FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# Package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm kodları kopyala
COPY . .

# Uygulamayı başlat
CMD ["npm", "start"]

# Uygulama 3000 portunda çalışacak
EXPOSE 3000
