import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package
import shoppingCartRoutes from "./routes/shoppingCartRoutes";

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Use the cors middleware with the specified options

mongoose
  .connect("mongodb://localhost:27017/online-shopping")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/cart", shoppingCartRoutes);

export default app;
