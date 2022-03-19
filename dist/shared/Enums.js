"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStatus = exports.TextOriginTypes = exports.ServerStatusCode = void 0;
var ServerStatusCode;
(function (ServerStatusCode) {
    ServerStatusCode[ServerStatusCode["SUCCESS"] = 200] = "SUCCESS";
    ServerStatusCode[ServerStatusCode["INVALID_INPUT"] = 400] = "INVALID_INPUT";
    ServerStatusCode[ServerStatusCode["SERVER_UNINITIALIZED"] = 503] = "SERVER_UNINITIALIZED";
})(ServerStatusCode = exports.ServerStatusCode || (exports.ServerStatusCode = {}));
var TextOriginTypes;
(function (TextOriginTypes) {
    TextOriginTypes["url"] = "url";
    TextOriginTypes["file"] = "file";
    TextOriginTypes["text"] = "text";
})(TextOriginTypes = exports.TextOriginTypes || (exports.TextOriginTypes = {}));
var ServerStatus;
(function (ServerStatus) {
    ServerStatus["uninitialized"] = "uninitialized";
    ServerStatus["upAndRunning"] = "upAndRunning";
})(ServerStatus = exports.ServerStatus || (exports.ServerStatus = {}));
//# sourceMappingURL=Enums.js.map