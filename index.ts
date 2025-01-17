import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import mongoose, { mongo } from "mongoose";
import { error } from "console";

import { foodRouter } from "./router/Food";
import { foodCategoryRouter } from "./router/Food-category";

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
  } catch (error) {
    console.log(error);
  }
};
connectMongoDB();

app.get("/admin/food_menu", foodCategoryRouter);
app.put("/admin/food_menu", foodCategoryRouter);
app.delete("/admin/food_menu", foodCategoryRouter);
app.post("/admin/food_menu", foodCategoryRouter);

app.get("/admin/food_menu/food/:id", foodRouter);
app.put("/admin/food_menu/food", foodRouter);
app.delete("/admin/food_menu/food", foodRouter);
app.post("/admin/food_menu/food", foodRouter);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
