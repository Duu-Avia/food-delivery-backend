import express, { Request, Response } from "express";
import { Router } from "express";
import { HOME_CATEGORY_MODEL } from "../models/Home-category";

export const homeCategoryRouter = Router();

homeCategoryRouter.get("/home", async (req: Request, res: Response) => {
  const homeCategory = await HOME_CATEGORY_MODEL.find();
  res.json(homeCategory);
});
