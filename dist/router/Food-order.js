"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodOrder = void 0;
const express_1 = require("express");
const { verifyToken } = require("@clerk/backend");
const Food_order_1 = require("../models/Food-order");
const Food_1 = require("./Food");
exports.foodOrder = (0, express_1.Router)();
exports.foodOrder.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield Food_order_1.FOOD_ORDER_MODEL.find();
        res.json(food);
    }
    catch (err) {
        console.error(err, "aldaa");
    }
}));
exports.foodOrder.post("/", Food_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get("authentication"); // Look for 'Authorization' header
    console.log(token);
    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }
    try {
        const user = yield verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        const { totalPrice, foodOrderItem, address } = req.body;
        // Validate order data
        if (!totalPrice || !Array.isArray(foodOrderItem) || foodOrderItem.length === 0) {
            return res.status(400).json({ error: "Invalid order data" });
        }
        const order = { totalPrice, foodOrderItems: foodOrderItem, user: { _id: user.sub, email: user.email }, address };
        // Create the new order in the database (await for async operation)
        const newOrder = yield Food_order_1.FOOD_ORDER_MODEL.create(order);
        res.json(newOrder);
    }
    catch (err) {
        console.error(err, "forbidden tokenbbb");
        res.status(403).json({ error: "Forbidden: Invalid Token" }); // Invalid token
    }
}));
