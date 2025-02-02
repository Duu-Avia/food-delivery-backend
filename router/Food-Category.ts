import express, { Request, Response } from "express";
import { Router } from "express";
import { FOOD_CATEGORY_MODEL } from "../models/Food-category";
import { auth } from "./Food";

export const foodCategoryRouter = Router();

foodCategoryRouter.get("/", async (req: Request, res: Response) => {
  const foodCategory = await FOOD_CATEGORY_MODEL.find();
  res.json(foodCategory);
});

foodCategoryRouter.put("/:id",auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const updatedItem = await FOOD_CATEGORY_MODEL.findByIdAndUpdate(id, { categoryName }, { new: true });
  res.send(updatedItem);
});

foodCategoryRouter.delete("/:id",auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  await FOOD_CATEGORY_MODEL.findByIdAndDelete(id);
  res.send("deleted category");
});

foodCategoryRouter.post("/", auth, async (req: Request, res: Response) => {
  const { name } = req.body;
  const newItem = await FOOD_CATEGORY_MODEL.create({
    categoryName: name,
  });
  res.json({ newItem });
});

