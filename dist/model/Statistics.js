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
exports.Statistics = void 0;
const ExternalSourcer_1 = __importDefault(require("./ExternalSourcer"));
const config_1 = __importDefault(require("../config/config"));
/*
* - - - - - - - - - - - - - - - - - - - - - - - - -
*  A class meant for keep tracking on the
*  statistic data, The class is merely a wrap for
*  a logical encapsulation of the statistic's
*  logic, as the main DM 'wordCounter' is static.
* - - - - - - - - - - - - - - - - - - - - - - - - -
* */
class Statistics {
    constructor() {
    }
    static getWordAppearanceCount(word) {
        const wordCount = Statistics.wordCounter.get(word);
        console.log(`Retrieved The count for the word ${word}, The count is  ${wordCount ? wordCount : 0} `);
        return wordCount ? wordCount : 0;
    }
    static incrementWordCount(word) {
        const currentWordCount = Statistics.wordCounter.get(word);
        Statistics.wordCounter.set(word, currentWordCount ? currentWordCount + 1 : 1);
    }
    static processTextChunkAndCountWords(chunk) {
        const increment = Statistics.incrementWordCount;
        const cleanedText = chunk.trim().replace(/[^a-zA-Z ]/g, "");
        cleanedText.split(" ").forEach((word) => {
            if ((word === null || word === void 0 ? void 0 : word.length) > 0) {
                increment(word.toLowerCase());
            }
        });
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    *  Functions responsible for maintaining a
    *  - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    * */
    static saveSessionToLocalStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const counterAsString = JSON.stringify([...Statistics.wordCounter]);
                yield ExternalSourcer_1.default.WriteTextToFile(Statistics.pathToSessionStorageFile, counterAsString);
                console.log("Completed Saving the session to local storage");
            }
            catch (e) {
                console.error(`There has been an error processing the session's saving to local storage, error ${e.message}`);
            }
        });
    }
    static loadPrevSessionsFromLocalStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const counterAsString = yield ExternalSourcer_1.default.retrieveTextFromFile(Statistics.pathToSessionStorageFile);
                if ((counterAsString === null || counterAsString === void 0 ? void 0 : counterAsString.length) > 0) {
                    Statistics.wordCounter = new Map(JSON.parse(counterAsString));
                    console.info("Word counter was initialized with previews sessions' data");
                }
            }
            catch (e) {
                console.error("Corrupt or missing previews session file, initializing the word counter as blank", e.message);
            }
        });
    }
}
exports.Statistics = Statistics;
Statistics.pathToSessionStorageFile = `./${config_1.default.PATH_TO_STORAGE_FOLDER}/${config_1.default.SESSION_STORAGE_FILE_NAME}`;
Statistics.wordCounter = new Map();
//# sourceMappingURL=Statistics.js.map