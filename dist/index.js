"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = require("./Utils/DB");
const app_1 = require("./app");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
(0, app_1.appConfig)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log("");
    console.log("A server is running on port: ", port);
    (0, DB_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("A server is shutting down due to uncaughtException:", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("A server is shutting down due to unhandledRejection:", reason);
    server.close(() => {
        process.exit(1);
    });
});
