const express = require("express");
const routes = require("./routes/index");
const connectDB = require("./config/db");
const { redisCon } = require("./utils/redis");

const app = express();

//json
app.use(express.json());

//urlencoded
app.use(express.urlencoded({ extended: true }));

//connect to db
connectDB();

redisCon();

app.get(
  "/test",
  function (req, res, next) {
    console.log("middleware");
    next();
  },
  function (req, res) {
    console.log("controller");
    res.status(200).json({ message: "controller" });
  }
);

//routes
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000", process.env.JWT_SECRET);
});
