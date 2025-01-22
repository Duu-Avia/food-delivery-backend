import { model, Schema } from "mongoose";

export const HOME_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: { type: String },
  },
  { versionKey: false }
);

export const HOME_CATEGORY_MODEL = model("HOME_CATEGORY_MODEL", HOME_CATEGORY_SCHEMA, "food-category");
