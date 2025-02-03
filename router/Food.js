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
exports.auth = exports.foodRouter = void 0;
const express_1 = require("express");
const Food_1 = require("../models/Food");
const { verifyToken } = require("@clerk/backend");
exports.foodRouter = (0, express_1.Router)();
Food_1.FOOD_MODEL;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get("authentication");
    try {
        const user = yield verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        next();
    }
    catch (err) {
        console.error(err, "forbidden tokensb");
    }
});
exports.auth = auth;
exports.foodRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const food = yield Food_1.FOOD_MODEL.find({ category: categoryId });
        res.json(food);
    }
    catch (err) {
        console.error(err, "aldaa");
    }
}));
exports.foodRouter.put("/:id", exports.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { foodName, price, image, ingredients, category } = req.body;
    const updatedFood = yield Food_1.FOOD_MODEL.findByIdAndUpdate(id, {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category,
    }, { new: true });
    res.json(updatedFood);
}));
exports.foodRouter.delete("/", exports.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const deletedItem = yield Food_1.FOOD_MODEL.findByIdAndDelete(_id);
    res.json(deletedItem);
}));
exports.foodRouter.post("/", exports.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodName, price, image, ingredients, category } = req.body;
    const newFood = yield Food_1.FOOD_MODEL.create({
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category,
    }, { timestamps: true });
    res.json({ newFood });
}));
