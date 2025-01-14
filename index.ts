import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import mongoose, { mongo } from "mongoose";
import { error } from "console";
const app = express();
const port = 8000;
const fs = require("node:fs");
const cors = require("cors");

configDotenv();
app.use(express.json());

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

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
  {
    categoryName: { type: String },
  },
  { versionKey: false }
);

const FOOD_CATEGORY_MODEL = mongoose.model(
  "food-category",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);

app.get("/food-delivery", async (req: Request, res: Response) => {
  const foodCategory = await FOOD_CATEGORY_MODEL.find();
  res.json(foodCategory);
});

app.put("/food-delivery/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const updatedItem = await FOOD_CATEGORY_MODEL.findByIdAndUpdate(
    id,
    { categoryName },
    { new: true }
  );
  res.send(updatedItem);
});

app.delete("/food-delivery/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await FOOD_CATEGORY_MODEL.findByIdAndDelete(id);
  res.send("deleted category");
});

app.post("/food-delivery", async (req: Request, res: Response) => {
  const { name } = req.body;
  await FOOD_CATEGORY_MODEL.create({
    categoryName: name,
  });
  res.send("hello from backend :)");
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
