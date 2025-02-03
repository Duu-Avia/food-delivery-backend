"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOOD_MODEL = exports.FOOD_SCHEMA = void 0;
const mongoose_1 = require("mongoose");
exports.FOOD_SCHEMA = new mongoose_1.Schema({
    foodName: { type: String },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    category: { type: mongoose_1.Schema.Types.ObjectId },
}, { timestamps: true });
exports.FOOD_MODEL = (0, mongoose_1.model)("FOOD_MODEL", exports.FOOD_SCHEMA, "food");
