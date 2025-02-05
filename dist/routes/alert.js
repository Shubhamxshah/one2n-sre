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
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertRouter = void 0;
const express_1 = require("express");
exports.alertRouter = (0, express_1.Router)();
exports.alertRouter.get("/latency", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => setTimeout(resolve, 2000));
    res.json({ message: "delayed response" });
}));
exports.alertRouter.get("/errors", (_, res) => {
    res.status(500).json({ error: "test error" });
});
