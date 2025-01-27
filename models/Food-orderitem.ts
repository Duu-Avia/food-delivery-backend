import { model, Schema } from "mongoose";

export const FOOD_ORDERITEM = new Schema({
  food: { type: Schema.Types.ObjectId },
  quantity: { type: Number },
});
export const FOOD_MODEL = model("FOOD_ORDERITEM", FOOD_ORDERITEM, "food");
