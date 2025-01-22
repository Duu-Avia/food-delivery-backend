import { model, Schema } from "mongoose";

export const HOMEFOOD_SCHEMA = new Schema(
  {
    foodName: { type: String },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    category: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

export const HOMEFOOD_MODEL = model("HOMEFOOD_MODEL", HOMEFOOD_SCHEMA, "food");
