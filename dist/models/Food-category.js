"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOOD_CATEGORY_MODEL = exports.FOOD_CATEGORY_SCHEMA = void 0;
const mongoose_1 = require("mongoose");
exports.FOOD_CATEGORY_SCHEMA = new mongoose_1.Schema(
  {
    categoryName: { type: String },
  },
  { versionKey: false }
);
exports.FOOD_CATEGORY_MODEL = (0, mongoose_1.model)("Food-category", exports.FOOD_CATEGORY_SCHEMA, "food-category");
