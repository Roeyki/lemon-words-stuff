"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importStar(require("fs"));
const util_1 = require("util");
const event_stream_1 = __importDefault(require("event-stream"));
/*
* - - - - - - - - - - - - - - - - - - - - - -
*  An helper class meant for dealing with
*  external sources such as files and urls.
* - - - - - - - - - - - - - - - - - - - - - -
* */
class ExternalSourcer {
    constructor() {
        // Promisifications of the async read/write methods
        this.fileReadPromise = (0, util_1.promisify)(fs_1.default.readFile);
        this.fileWritePromise = (0, util_1.promisify)(fs_1.default.writeFile);
        this.longFileReadPromise = (filePath, lineCallback) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    (0, fs_1.createReadStream)(filePath)
                        .on('error', (e) => {
                        console.log(`File path : ${filePath} produced an error - ${e.message}`);
                        reject(e);
                    })
                        .pipe(event_stream_1.default.split())
                        .on('data', lineCallback)
                        .on('end', (e) => {
                        if (e) {
                            reject(e);
                        }
                        else {
                            resolve(true);
                        }
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    retrieveTextFromUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(url);
                return response.data;
            }
            catch (e) {
                console.log(`Url text retrieval has returned unsuccessfully, error - ${e.message}`);
                return undefined;
            }
        });
    }
    readFile(filePath) {
        return this.fileReadPromise(filePath);
    }
    retrieveTextFromFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const textFromFileAsBuffer = yield this.readFile(filePath);
                return textFromFileAsBuffer.toString();
            }
            catch (e) {
                console.error(e.message);
                return undefined;
            }
        });
    }
    performActionOnLargeFile(filePath, lineCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.longFileReadPromise(filePath, lineCallback);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    WriteTextToFile(filePath, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fileWritePromise(filePath, text);
            }
            catch (e) {
                console.error(e.message);
                return undefined;
            }
        });
    }
}
exports.default = new ExternalSourcer();
//# sourceMappingURL=ExternalSourcer.js.map