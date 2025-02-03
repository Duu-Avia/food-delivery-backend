import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import mongoose, { mongo } from "mongoose";
import { foodRouter } from "./router/Food";

import { foodOrder } from "./router/Food-order";
import { foodCategoryRouter } from "./router/Food-Category";

const app = express();
const port = 8000;
const fs = require("node:fs");
const cors = require("cors");

configDotenv();
app.use(express.json());
app.use(cors());

const connectMongoDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URI;
  if (!MONGODB_URL) {
    throw new Error("Database connection URI is failed");
  }
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {}
};
connectMongoDB();

//food category path----------------
app.use("/food_category", foodCategoryRouter);

//dishes path----------------
app.use("/dishes", foodRouter);

//order path----------------
app.use("/order", foodOrder);
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
