import express, { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { FOOD_MODEL } from "../models/Food";
import { Token } from "@clerk/backend";
const { verifyToken } = require("@clerk/backend");
export const foodRouter = Router();

FOOD_MODEL;

export const auth = async (req:Request, res:Response, next:NextFunction) =>{
  const token = req.get("authentication");
  try {
    const user = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    next()
  } catch (err) {
    console.error(err, "forbidden tokensb");
  }
}

foodRouter.get("/:id",  async (req: Request, res: Response) => {

  try {
    const categoryId = req.params.id;
    const food = await FOOD_MODEL.find({ category: categoryId });
    res.json(food);
  } catch (err) {
    console.error(err, "aldaa");
  }
});

foodRouter.put("/:id", auth, async (req: Request, res: Response) => {
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
  res.json(updatedFood);
});

foodRouter.delete("/", auth, async (req: Request, res: Response) => {
  const { _id } = req.body;
  const deletedItem = await FOOD_MODEL.findByIdAndDelete(_id);
  res.json(deletedItem);
});

foodRouter.post("/", auth, async (req: Request, res: Response) => {
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
});
