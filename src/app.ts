import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package
import shoppingCartRoutes from "./routes/shoppingCartRoutes";
import bodyParser from "body-parser";

require("dotenv").config();
var app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: true, // Your frontend's origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  credentials: true, // Allow credentials to be sent
};

app.use(cors(corsOptions)); // Use the cors middleware with the specified options
app.set("trust proxy", 1);

mongoose
  .connect("mongodb://localhost:27017/online-shopping")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/cart", shoppingCartRoutes);
app.get("/", function (req, res, next) {
  res.json({ success: "Express" });
});
export default app;
