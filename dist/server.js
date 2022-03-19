"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const serverFacade_1 = require("./Handlers/serverFacade");
const utils_1 = require("./Handlers/utils");
const app = (0, express_1.default)();
const port = 5050;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '100mb' }));
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use((0, cors_1.default)());
app.post('/count', utils_1.countRouteValidation, serverFacade_1.Facade.parseAndCount);
app.get('/query', utils_1.statisticsRouteValidation, serverFacade_1.Facade.query);
app.listen(port, serverFacade_1.Facade.boot);
//# sourceMappingURL=server.js.map