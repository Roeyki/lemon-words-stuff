"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
class Config {
    constructor() {
        dotenv_1.default.config();
        this.PATH_TO_STORAGE_FOLDER = process.env.PATH_TO_STORAGE_FOLDER ? process.env.PATH_TO_STORAGE_FOLDER : "src/serverStorage";
        this.SESSION_STORAGE_FILE_NAME = process.env.SESSION_STORAGE_FILE_NAME ? process.env.SESSION_STORAGE_FILE_NAME : "statisticSession.txt";
        this.ENSURE_IMMEDIATE_SAVING = process.env.ENSURE_SESSION_SAVING
            ? (process.env.ENSURE_SESSION_SAVING.trim().toLowerCase() === "true") : false;
    }
}
exports.default = new Config();
//# sourceMappingURL=config.js.map