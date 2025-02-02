import express, { Request, Response } from "express";
import { Router } from "express";
const { verifyToken } = require("@clerk/backend");
import { FOOD_ORDER_MODEL } from "../models/Food-order";
import { FOOD_MODEL } from "../models/Food";
import { auth } from "./Food";
export const foodOrder = Router();

foodOrder.get("/", async (req: Request, res: Response) => {

  try {
    const food = await FOOD_ORDER_MODEL.find();
    res.json(food);
  } catch (err) {
    console.error(err, "aldaa");
  }
});

foodOrder.post("/", auth, async (req: any, res: any) => {
  const token = req.get("authentication"); // Look for 'Authorization' header
  console.log(token);
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const user = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    
    const { totalPrice, foodOrderItem, address } = req.body;

    // Validate order data
    if (!totalPrice || !Array.isArray(foodOrderItem) || foodOrderItem.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const order = { totalPrice, foodOrderItems: foodOrderItem, user: { _id: user.sub, email: user.email }, address };

    // Create the new order in the database (await for async operation)
    const newOrder = await FOOD_ORDER_MODEL.create(order);
    res.json(newOrder);
  } catch (err) {
    console.error(err, "forbidden tokenbbb");
    res.status(403).json({ error: "Forbidden: Invalid Token" }); // Invalid token
  }
});
