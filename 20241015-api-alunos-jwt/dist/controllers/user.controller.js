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
class ClassroomController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma_connection_1.default.users.findMany();
                return res
                    .status(200)
                    .json({ success: true, msg: "List users.", data: users });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { student, password } = req.body;
            if (!student || !password) {
                return res.status(400).json({ success: true, msg: "Required fields." });
            }
            try {
                const studentFind = yield prisma_connection_1.default.students.findUnique({
                    where: { id: student },
                });
                if (!studentFind) {
                    return res
                        .status(400)
                        .json({ success: true, msg: "Student not found." });
                }
                const newUser = yield prisma_connection_1.default.users.create({
                    data: { password, studentId: student },
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Create new user.", data: newUser });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
}
exports.default = ClassroomController;
