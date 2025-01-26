import express, { Request, Response } from "express";
import { Router } from "express";
import { FOOD_MODEL } from "../models/Food";
const {verifyToken} = require('@clerk/backend')
export const foodRouter = Router();

FOOD_MODEL;

foodRouter.get("/:id", async (req: Request, res: Response) => {
  const token = req.get('authentication')
  if (!req.params.id) {
    res.json({ message: "param id error" });
    return;
  }

  try{
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    console.log({verified})
  } catch (err) {
    console.error(err, "forbidden token");
  }



  try {
    const categoryId = req.params.id;
    const food = await FOOD_MODEL.find({ category: categoryId });
    res.json(food);
    console.log(categoryId);
  } catch (err) {
    console.error(err, "aldaa");
  }
});

foodRouter.put("/:id", async (req: Request, res: Response) => {
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

foodRouter.delete("", async (req: Request, res: Response) => {
  const { _id } = req.body;
  const deletedItem = await FOOD_MODEL.findByIdAndDelete(_id);
  res.json(deletedItem);
});

foodRouter.post("", async (req: Request, res: Response) => {
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


