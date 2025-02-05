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
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
(0, globals_1.describe)("Routes /student", () => {
    (0, globals_1.it)("should create a new student", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).post("/api/v1/student").send({
            rollId: 111,
            name: "test user",
            standard: 12,
        });
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(res.body.message).toBe("new student test user created");
    }));
    (0, globals_1.it)("should update the new student", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).put("/api/v1/student").send({
            rollId: 111,
            name: "test user updated",
            standard: 10,
        });
        (0, globals_1.expect)(res.statusCode).toBe(201);
        (0, globals_1.expect)(res.body.message).toBe("student details updated test user updated 10");
    }));
    (0, globals_1.it)("should delete the newly created student", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).delete("/api/v1/student").send({
            rollId: 111,
        });
        (0, globals_1.expect)(res.statusCode).toBe(201);
        (0, globals_1.expect)(res.body.message).toBe("student with id 111 deleted ");
    }));
});
