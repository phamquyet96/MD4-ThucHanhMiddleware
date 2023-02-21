"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const fs_1 = __importDefault(require("fs"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("common"));
app.get('/', (req, res) => {
    res.json({
        message: "Hello!How are you?"
    });
});
app.get("/one", (req, res, next) => {
    fs_1.default.promises.readFile('./one.txt')
        .then(data => res.send(data))
        .catch(err => next(err));
});
app.use((err, req, res, next) => {
    console.error('Error 1111: ', err.type);
    if (err.type == 'time-out') {
        res.status(408).send(err);
    }
    else {
        res.status(500).send(err);
    }
});
app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});
//# sourceMappingURL=index.js.map