"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 3003;
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
