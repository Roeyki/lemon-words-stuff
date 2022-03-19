import {ServerStatusCode, TextOriginTypes} from "../shared/Enums";

/*
* - - - - - - - - - - - - - - - - - - - - -
*  Mostly middlewares, used for validation
* - - - - - - - - - - - - - - - - - - - - -
* */

export const validateParseAndCountInput = (body: any): boolean => {
    const {origin, content} = body;
    return origin && typeof origin === 'string' && (origin in TextOriginTypes) && content && typeof content === 'string';
}

export const validateQueryRequest = (query: any) => {
    return query && query.word && typeof query.word === 'string';
}
export const countRouteValidation = (req: any, res: any, next: any) => {
    if (!validateParseAndCountInput(req.body)) {
        res.status(ServerStatusCode.INVALID_INPUT).json("Invalid input");
    } else {
        next();
    }
}
export const statisticsRouteValidation = (req: any, res: any, next: any) => {
    if (!validateQueryRequest(req.query)) {
        res.status(ServerStatusCode.INVALID_INPUT).json("Invalid input");
    } else {
        next();
    }
}
