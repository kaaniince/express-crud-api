# Project Title

This project is a comprehensive CRUD application designed for managing data efficiently. It leverages Docker for containerization and includes a robust backend built with **Express.js**. The application uses **MongoDB** for data storage, **Redis** for caching, and **JWT (JSON Web Token)** for secure authentication and authorization.

---

## Features

- **CRUD operations** for efficient data management.
- **Express.js** as the backend framework.
- **MongoDB** for scalable and flexible data storage.
- **Redis** integration for caching and session management.
- **JWT-based authentication** for secure user access.
- **Docker** for easy containerization and deployment.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** and **Docker Compose** to manage and run containers.
- **Node.js** (v14 or later) and **npm** for running the application and managing dependencies.
- **Git** for version control.

---

## Environment Variables

Create a `.env` file in the project root and set the following environment variables:

- `MONGO_URI`: MongoDB connection URI.
- `JWT_SECRET`: A secret key for signing JSON Web Tokens.
- `REDIS_URL`: Redis connection URL.

### Example `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=my-super-secret-key
REDIS_URL=redis://localhost:6379
```

## Installation

First, clone the project.

```
git clone https://github.com/kaaniince/express-crud-api.git
docker compose up -d
npm install
```

## Usage

First, open the project in Visual Studio Code.

For Linux:

```
cd express-crud-api
npm start

code .
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

docker run -d --name redis2 -p 127.0.0.1:6379:6379 redis
npm-start
