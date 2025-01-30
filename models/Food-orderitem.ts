import { model, Schema } from "mongoose";

export const FOOD_ORDER_ITEM_SCHEMA = new Schema({
  food: Schema.Types.ObjectId,
  quantity: Number,
});
export const FOOD_ORDER_ITEM_MODEL = model("FOOD_ORDER_ITEM", FOOD_ORDER_ITEM_SCHEMA, "food");
