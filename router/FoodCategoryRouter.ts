import express, { Request, Response } from "express";
import { Router } from "express";
import {
  FOOD_CATEGORY_MODEL,
  FOOD_CATEGORY_SCHEMA,
} from "../models/FoodCategoryModel";

export const foodCategoryRouter = Router();

FOOD_CATEGORY_SCHEMA;

foodCategoryRouter.get(
  "/food-category",
  async (req: Request, res: Response) => {
    const foodCategory = await FOOD_CATEGORY_MODEL.find();
    res.json(foodCategory);
  }
);

foodCategoryRouter.put(
  "/food-category/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { categoryName } = req.body;
    const updatedItem = await FOOD_CATEGORY_MODEL.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );
    res.send(updatedItem);
  }
);

foodCategoryRouter.delete(
  "/food-category/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await FOOD_CATEGORY_MODEL.findByIdAndDelete(id);
    res.send("deleted category");
  }
);

foodCategoryRouter.post(
  "/food-category",
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const newItem = await FOOD_CATEGORY_MODEL.create({
      categoryName: name,
    });
  }
);