import { model, Schema } from "mongoose";
import { FOOD_ORDER_ITEM_SCHEMA } from "./Food-orderitem";

export const FOOD_ORDER_USER = new Schema({
  _id: String,
  email: String,
});

export const FOOD_ORDER_SCHEMA = new Schema(
  {
    user: FOOD_ORDER_USER,
    totalPrice: Number,
    foodOrderItems: [FOOD_ORDER_ITEM_SCHEMA],
    status: { type: String, enum: ["PENDING", "CANCELED", "DELIVERED"], default: "PENDING" },
    address: { type: String, default: "narantuul" },
  },
  { timestamps: true }
);
export const FOOD_ORDER_MODEL = model("FOOD_ORDER", FOOD_ORDER_SCHEMA, "food-order");
