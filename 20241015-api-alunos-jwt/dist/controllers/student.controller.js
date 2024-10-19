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
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
class StudentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield prisma_connection_1.default.students.findMany();
                console.log(students);
                return res
                    .status(200)
                    .json({ success: true, msg: "List students.", data: students });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            try {
                const student = yield prisma_connection_1.default.students.create({
                    data: { name, email },
                });
                if (student) {
                    return res
                        .status(200)
                        .json({ success: true, msg: "Student created.", data: student });
                }
                return res
                    .status(500)
                    .json({ success: false, msg: "Student not created." });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const student = yield prisma_connection_1.default.students.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                enable: true,
                                password: true,
                            },
                        },
                        registrations: {
                            include: {
                                classroom: true,
                            },
                        },
                    },
                });
                if (student) {
                    return res
                        .status(200)
                        .json({ success: true, msg: "Student showed.", data: student });
                }
                return res.status(404).json({ success: true, msg: "Student not found." });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            try {
                const student = yield prisma_connection_1.default.students.findUnique({
                    where: {
                        id,
                    },
                });
                if (!student) {
                    return res
                        .status(404)
                        .json({ success: true, msg: "Student not found." });
                }
                if (name) {
                    yield prisma_connection_1.default.students.update({
                        where: {
                            id,
                        },
                        data: {
                            name,
                        },
                    });
                    return res.status(200).json({ success: true, msg: "Student updated." });
                }
                return res
                    .status(400)
                    .json({ success: true, msg: "Student not updated." });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const student = yield prisma_connection_1.default.students.findUnique({
                    where: {
                        id,
                    },
                });
                if (student) {
                    yield prisma_connection_1.default.students.delete({
                        where: { id },
                    });
                    return res.status(200).json({ success: true, msg: "Student deleted." });
                }
                return res.status(404).json({ success: true, msg: "Student not found." });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
}
exports.default = StudentController;
