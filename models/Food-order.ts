import { model, Schema } from "mongoose";

export const FOOD_ORDER = new Schema({
  user: { type: Schema.Types.ObjectId },
  quantity: { type: Number },
});
export const FOOD_MODEL = model("FOOD_ORDERITEM", FOOD_ORDER, "food");
