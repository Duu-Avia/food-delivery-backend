import { model, Schema } from "mongoose";

export const FOOD_SCHEMA = new Schema(
  {
    foodName: { type: String },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    category: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);
export const FOOD_MODEL = model("food", FOOD_SCHEMA, "food");
