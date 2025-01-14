import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import mongoose, { mongo } from "mongoose";
import { error } from "console";
import { foodCategoryRouter } from "./router/FoodCategoryRouter";

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

app.get("/food-category", foodCategoryRouter);

app.put("/food-category/:id", foodCategoryRouter);

app.delete("/food-category/:id", foodCategoryRouter);

app.post("/food-category", foodCategoryRouter);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
