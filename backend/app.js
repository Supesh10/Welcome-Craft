require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/Config/db");
require("./src/Services/cron");
const silverPrice = require("./src/Routes/silverPriceRoute");
const product = require("./src/Routes/productRoute");
const category = require("./src/Routes/categoryRoute");
// const artwork = require("./src/Routes/artwork2route");
// const profile = require("./src/Routes/profileRoutes");
// const art=require("./src/Routes/artworkRoute");
// const artist= require("./src/Routes/artistRoute");
// const category = require("./src/Routes/categoryRoute");
// const order = require("./src/Routes/orderRoutes");
const bodyParser = require("body-parser");
// const cors = require("cors");

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
app.use(express.json());
connectDB();

app.use(bodyParser.json());
// app.use(cors());

app.use("/api", product);

app.use("/api", category);

app.use("/api", silverPrice);

// app.use("/api", silverPrice);

// app.use("/api/artwork", artwork);

// app.use("/uploads", express.static(__dirname + "/uploads"));
// app.use("/api/profile", profile);

// app.use("/api/category", category);

// app.use("/api/order", order);
// const port = process.env.port;
const port = process.env.port;

const server = app.listen(port, console.log(`Server started on port ${port}`));

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);
    process.exit(1);
  } else {
    throw err;
  }
});
