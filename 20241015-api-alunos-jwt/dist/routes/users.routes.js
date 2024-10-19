"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const routes = () => {
    const router = (0, express_1.Router)();
    const controller = new user_controller_1.default();
    router.get("/", controller.list);
    // router.get("/:id", controller.show);
    // router.put("/:id", controller.update);
    router.post("/", controller.create);
    // router.delete("/:id", controller.delete);
    return router;
};
exports.default = routes;
