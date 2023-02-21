"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTime = void 0;
const on_headers_1 = __importDefault(require("on-headers"));
const responseTime = async (req, res, next) => {
    let start = new Date().getTime();
    (0, on_headers_1.default)(res, () => {
        let duration = new Date().getTime() - start;
        console.log("Application-level middleware url: " + req.url + " có duration " + duration + "ms");
    });
    next();
};
exports.responseTime = responseTime;
//# sourceMappingURL=responseTime.js.map