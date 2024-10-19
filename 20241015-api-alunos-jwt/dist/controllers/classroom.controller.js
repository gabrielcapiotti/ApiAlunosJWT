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
            const { vacations } = req.query;
            let classrooms;
            try {
                switch (vacations) {
                    case "0":
                        classrooms = yield prisma_connection_1.default.classrooms.findMany({
                            where: {
                                vacations: 0,
                            },
                        });
                        break;
                    case "1":
                        classrooms = yield prisma_connection_1.default.classrooms.findMany({
                            where: {
                                vacations: { gt: 0 },
                            },
                        });
                        break;
                    default:
                        classrooms = yield prisma_connection_1.default.classrooms.findMany();
                        break;
                }
                return res
                    .status(200)
                    .json({ success: true, msg: "List classrooms.", data: classrooms });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subject, vacations } = req.body;
            if (!subject) {
                return res.status(400).json({ success: true, msg: "Required subject." });
            }
            try {
                const newClass = yield prisma_connection_1.default.classrooms.create({
                    data: { subject, vacations },
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Create new class.", data: newClass });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "ERROR Database." });
            }
        });
    }
}
exports.default = ClassroomController;
