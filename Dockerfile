# Temel imaj seçimi
FROM node:18

# Çalışma dizini belirleme
WORKDIR /app

# Bağımlılık dosyalarını kopyalama
COPY package*.json ./

# Bağımlılıkları yükleme
RUN npm install

# Uygulama kaynak kodlarını kopyalama
COPY . .

# Uygulamanın çalışacağı portu belirtme
EXPOSE 3000

# Uygulamayı başlatma komutu
CMD ["npm", "start"]