"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactModel = new mongoose_1.default.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        maxlength: 11,
        minlength: 11,
    },
    avatar: {
        type: String
    },
    avatarID: {
        type: String
    },
    label: {
        type: String
    },
    favorite: {
        type: Boolean
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("contacts", contactModel);
