"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const contactRouter_1 = __importDefault(require("./Router/contactRouter"));
const appConfig = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/api", contactRouter_1.default);
    app.get("/", (req, res) => {
        try {
            res.status(200).json({
                message: "Everything is working🚀🚀👏👏👏"
            });
        }
        catch (error) {
            res.status(404).json({
                message: "Everything is not okay 🤕🤕😵‍💫"
            });
        }
    });
};
exports.appConfig = appConfig;
