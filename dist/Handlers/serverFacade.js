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
exports.Facade = void 0;
const Enums_1 = require("../shared/Enums");
const config_1 = __importDefault(require("../config/config"));
const ExternalSourcer_1 = __importDefault(require("../model/ExternalSourcer"));
const Statistics_1 = require("../model/Statistics");
const serverStatus = Enums_1.ServerStatus.uninitialized;
const serverBootUp = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server initializing`);
    yield Statistics_1.Statistics.loadPrevSessionsFromLocalStorage();
    console.log(`Server initiated successfully`);
    exports.Facade.status = Enums_1.ServerStatus.upAndRunning;
});
const parseAndCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { origin, content } = req.body;
        const ProcessTimeLabel = `Request originated in ${new Date().toISOString()} (ISO format) has done processing, the time taken `;
        console.time(ProcessTimeLabel);
        switch (origin) {
            case Enums_1.TextOriginTypes.text:
                console.log(`Received plain text, processing...`);
                Statistics_1.Statistics.processTextChunkAndCountWords(content);
                break;
            case Enums_1.TextOriginTypes.file:
                console.log(`Received a file request, processing...`);
                const isReadOk = yield ExternalSourcer_1.default.performActionOnLargeFile(content, Statistics_1.Statistics.processTextChunkAndCountWords);
                if (!isReadOk) {
                    res.status(Enums_1.ServerStatusCode.INVALID_INPUT).json("Invalid input");
                    return;
                }
                break;
            case Enums_1.TextOriginTypes.url:
                console.log(`Received a url request, processing...`);
                const urlText = yield ExternalSourcer_1.default.retrieveTextFromUrl(content);
                Statistics_1.Statistics.processTextChunkAndCountWords(urlText);
                break;
            default:
                Statistics_1.Statistics.processTextChunkAndCountWords(content);
        }
        console.timeEnd(ProcessTimeLabel);
        console.log(`Saving data to local storage`);
        if (config_1.default.ENSURE_IMMEDIATE_SAVING) {
            yield Statistics_1.Statistics.saveSessionToLocalStorage();
        }
        else {
            // will happen async to the server's process. not a crucial task, and this is time & resources saving
            Statistics_1.Statistics.saveSessionToLocalStorage();
        }
        res.status(Enums_1.ServerStatusCode.SUCCESS).json("Done");
    }
    catch (e) {
        res.status(Enums_1.ServerStatusCode.INVALID_INPUT).json("Invalid input");
    }
});
const queryWordCount = (req, res) => {
    var _a, _b;
    const count = Statistics_1.Statistics.getWordAppearanceCount((_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.word) === null || _b === void 0 ? void 0 : _b.toLowerCase());
    res.status(Enums_1.ServerStatusCode.SUCCESS).json(count);
};
exports.Facade = {
    boot: serverBootUp,
    parseAndCount,
    query: queryWordCount,
    status: serverStatus
};
//# sourceMappingURL=serverFacade.js.map