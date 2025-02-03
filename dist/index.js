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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const Food_1 = require("./router/Food");
const Food_order_1 = require("./router/Food-order");
const Food_category_1 = require("./router/Food-category");
const app = (0, express_1.default)();
const port = 8000;
const fs = require("node:fs");
const cors = require("cors");
(0, dotenv_1.configDotenv)();
app.use(express_1.default.json());
app.use(cors());
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGODB_URL = process.env.MONGODB_URI;
    if (!MONGODB_URL) {
        throw new Error("Database connection URI is failed");
    }
    try {
        yield mongoose_1.default.connect(MONGODB_URL);
        console.log("Database connected successfully");
    }
    catch (error) { }
});
connectMongoDB();
//food category path----------------
app.use("/food_category", Food_category_1.foodCategoryRouter);
//dishes path----------------
app.use("/dishes", Food_1.foodRouter);
//order path----------------
app.use("/order", Food_order_1.foodOrder);
app.listen(port, () => {
    console.log(`listening port ${port}`);
});
