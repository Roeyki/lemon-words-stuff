"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticsRouteValidation = exports.countRouteValidation = exports.validateQueryRequest = exports.validateParseAndCountInput = void 0;
const Enums_1 = require("../shared/Enums");
/*
* - - - - - - - - - - - - - - - - - - - - -
*  Mostly middlewares, used for validation
* - - - - - - - - - - - - - - - - - - - - -
* */
const validateParseAndCountInput = (body) => {
    const { origin, content } = body;
    return origin && typeof origin === 'string' && (origin in Enums_1.TextOriginTypes) && content && typeof content === 'string';
};
exports.validateParseAndCountInput = validateParseAndCountInput;
const validateQueryRequest = (query) => {
    return query && query.word && typeof query.word === 'string';
};
exports.validateQueryRequest = validateQueryRequest;
const countRouteValidation = (req, res, next) => {
    if (!(0, exports.validateParseAndCountInput)(req.body)) {
        res.status(Enums_1.ServerStatusCode.INVALID_INPUT).json("Invalid input");
    }
    else {
        next();
    }
};
exports.countRouteValidation = countRouteValidation;
const statisticsRouteValidation = (req, res, next) => {
    if (!(0, exports.validateQueryRequest)(req.query)) {
        res.status(Enums_1.ServerStatusCode.INVALID_INPUT).json("Invalid input");
    }
    else {
        next();
    }
};
exports.statisticsRouteValidation = statisticsRouteValidation;
//# sourceMappingURL=utils.js.map