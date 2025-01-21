import express, { Request, Response } from "express";
import { Router } from "express";
import { FOOD_MODEL } from "../models/Food";

export const foodRouter = Router();

FOOD_MODEL;

foodRouter.get(
  "/admin/food_menu/food/:id",
  async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.json({ message: "aldaa" });
      return;
    }
    try {
      const categoryId = req.params.id;
      const food = await FOOD_MODEL.find({ category: categoryId });
      res.json(food);
      console.log(categoryId);
    } catch (err) {
      console.error(err, "aldaa");
    }
  }
);

foodRouter.put(
  "/admin/food_menu/food/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { foodName, price, image, ingredients, category } = req.body;
    const updatedFood = await FOOD_MODEL.findByIdAndUpdate(
      id,
      {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category,
      },
      { new: true }
    );
    res.send(updatedFood);
  }
);

foodRouter.delete(
  "/admin/food_menu/food",
  async (req: Request, res: Response) => {
    const { _id } = req.body;
   const deletedItem = await FOOD_MODEL.findByIdAndDelete(_id);
    res.json(deletedItem);
  }
);

foodRouter.post(
  "/admin/food_menu/food",
  async (req: Request, res: Response) => {
    const { foodName, price, image, ingredients, category } = req.body;
    const newFood = await FOOD_MODEL.create(
      {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category,
      },
      { timestamps: true }
    );
    res.json({ newFood });
  }
);
