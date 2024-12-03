const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/db");

db();
app.use(express.json());

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
app.use("/user", userRoute);
app.use("/product", productRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("app running on port 3000..."));
