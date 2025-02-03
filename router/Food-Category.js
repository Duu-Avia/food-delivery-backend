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
exports.foodCategoryRouter = void 0;
const express_1 = require("express");
const Food_category_1 = require("../models/Food-category");
const Food_1 = require("./Food");
exports.foodCategoryRouter = (0, express_1.Router)();
exports.foodCategoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodCategory = yield Food_category_1.FOOD_CATEGORY_MODEL.find();
    res.json(foodCategory);
}));
exports.foodCategoryRouter.put("/:id", Food_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { categoryName } = req.body;
    const updatedItem = yield Food_category_1.FOOD_CATEGORY_MODEL.findByIdAndUpdate(id, { categoryName }, { new: true });
    res.send(updatedItem);
}));
exports.foodCategoryRouter.delete("/:id", Food_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Food_category_1.FOOD_CATEGORY_MODEL.findByIdAndDelete(id);
    res.send("deleted category");
}));
exports.foodCategoryRouter.post("/", Food_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newItem = yield Food_category_1.FOOD_CATEGORY_MODEL.create({
        categoryName: name,
    });
    res.json({ newItem });
}));
