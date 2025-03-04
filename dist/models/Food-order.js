"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOOD_ORDER_MODEL = exports.FOOD_ORDER_SCHEMA = exports.FOOD_ORDER_USER = void 0;
const mongoose_1 = require("mongoose");
const Food_orderitem_1 = require("./Food-orderitem");
exports.FOOD_ORDER_USER = new mongoose_1.Schema({
    _id: String,
    email: String,
});
exports.FOOD_ORDER_SCHEMA = new mongoose_1.Schema({
    user: exports.FOOD_ORDER_USER,
    totalPrice: Number,
    foodOrderItems: [Food_orderitem_1.FOOD_ORDER_ITEM_SCHEMA],
    status: { type: String, enum: ["PENDING", "CANCELED", "DELIVERED"], default: "PENDING" },
    address: { type: String, default: "narantuul" },
}, { timestamps: true });
exports.FOOD_ORDER_MODEL = (0, mongoose_1.model)("FOOD_ORDER", exports.FOOD_ORDER_SCHEMA, "food-order");
