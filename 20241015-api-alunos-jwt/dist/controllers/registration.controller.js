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
const classroom_service_1 = __importDefault(require("../services/classroom.service"));
class RegistrationController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registrations = yield prisma_connection_1.default.registrations.findMany();
                return res.status(200).json({
                    success: true,
                    msg: "List registrations.",
                    data: registrations,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { student, classroom } = req.body;
                if (!student || !classroom) {
                    return res.status(400).json({ success: true, msg: "Required fields." });
                }
                const studentFind = yield prisma_connection_1.default.students.findUnique({
                    where: { id: student },
                });
                if (!studentFind) {
                    return res
                        .status(400)
                        .json({ success: true, msg: "Student not found." });
                }
                const classroomFind = yield prisma_connection_1.default.classrooms.findUnique({
                    where: { id: classroom },
                });
                if (!classroomFind) {
                    return res
                        .status(400)
                        .json({ success: true, msg: "Classroom not found." });
                }
                if (classroomFind.vacations === 0) {
                    return res
                        .status(400)
                        .json({ success: true, msg: "Classroom does not have vacations." });
                }
                const newRegistration = yield prisma_connection_1.default.registrations.create({
                    data: {
                        studentId: student,
                        classroomId: classroom,
                    },
                });
                const serviceClassroom = new classroom_service_1.default();
                yield serviceClassroom.useVacation(classroom);
                return res.status(200).json({
                    success: true,
                    msg: "Create new registration.",
                    data: newRegistration,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
}
exports.default = RegistrationController;
