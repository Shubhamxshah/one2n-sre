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
exports.studentRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
exports.studentRouter = (0, express_1.Router)();
exports.studentRouter.post("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rollId, name, standard } = req.body;
    if (!name ||
        !standard ||
        !rollId ||
        typeof name !== "string" ||
        typeof standard !== "number" ||
        typeof rollId !== "number") {
        console.log("incorrect input types");
        res.status(300).json({ message: `incorrect input types` });
        return;
    }
    try {
        const student = yield prisma_1.prisma.student.create({
            data: {
                rollId: rollId,
                name: name,
                standard: standard,
            },
        });
        res.status(200).json({ message: `new student ${student.name} created` });
    }
    catch (_a) {
        console.log("error creating a new student");
        res.status(400).json({ message: `error creating student ${name}` });
    }
}));
exports.studentRouter.get("/all-students", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.prisma.student.findMany();
        console.log("students fetched");
        res.status(201).json(students);
    }
    catch (_a) {
        console.log("error getting all students from database");
        res.status(401).json({ message: "error getting all students" });
    }
}));
exports.studentRouter.get("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rollId } = req.body;
    if (!rollId || typeof rollId !== "number") {
        res.status(300).json({ message: `incorrect inputs` });
        return;
    }
    try {
        const student = yield prisma_1.prisma.student.findMany({
            where: {
                rollId,
            },
        });
        res.status(201).json(student);
    }
    catch (e) {
        console.log("error getting a particular student from db");
        res.status(400).json({ message: e });
    }
}));
exports.studentRouter.put("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rollId, name, standard } = req.body;
    if (!rollId ||
        !name ||
        !standard ||
        typeof rollId !== "number" ||
        typeof name !== "string" ||
        typeof standard !== "number") {
        console.log("incorrect input types for editing student details");
        res.status(300).json({ message: `incorrect input types` });
        return;
    }
    try {
        const student = yield prisma_1.prisma.student.update({
            where: {
                rollId,
            },
            data: {
                rollId: rollId,
                name: name,
                standard: standard,
            },
        });
        res.status(201).json({
            message: `student details updated ${student.name} ${student.standard}`,
        });
    }
    catch (_a) {
        console.log("error editing student details");
        res.status(400).json({ message: `error updating student details` });
    }
}));
exports.studentRouter.delete("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rollId } = req.body;
    if (!rollId || typeof rollId !== "number") {
        res.status(300).json({ message: "Incorrect inputs" });
        return;
    }
    try {
        const student = yield prisma_1.prisma.student.delete({
            where: {
                rollId: rollId,
            },
        });
        res
            .status(201)
            .json({ message: `student with id ${student.rollId} deleted ` });
    }
    catch (_a) {
        res
            .status(400)
            .json({ message: `error deleting student with id ${rollId}` });
    }
}));
