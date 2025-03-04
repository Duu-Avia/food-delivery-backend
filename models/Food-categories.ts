import { model, Schema } from "mongoose";

export const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: { type: String },
  },
  { versionKey: false }
);

export const FOOD_CATEGORY_MODEL = model("Food-category", FOOD_CATEGORY_SCHEMA, "food-category");
