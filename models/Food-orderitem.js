"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOOD_ORDER_ITEM_MODEL = exports.FOOD_ORDER_ITEM_SCHEMA = void 0;
const mongoose_1 = require("mongoose");
exports.FOOD_ORDER_ITEM_SCHEMA = new mongoose_1.Schema({
    food: mongoose_1.Schema.Types.ObjectId,
    quantity: Number,
});
exports.FOOD_ORDER_ITEM_MODEL = (0, mongoose_1.model)("FOOD_ORDER_ITEM", exports.FOOD_ORDER_ITEM_SCHEMA, "food");
