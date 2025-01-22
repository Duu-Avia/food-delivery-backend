import express, { Request, Response } from "express";
import { Router } from "express";
import { HOMEFOOD_MODEL } from "../models/Home-food";

export const homeFoodRouter = Router();

homeFoodRouter.get("/home/food", async (req: Request, res: Response) => {
  try {
    const HomePageFood = await HOMEFOOD_MODEL.find();
    res.json(HomePageFood);
  } catch (error) {
    res.json({ message: "Model error" });
  }
});
