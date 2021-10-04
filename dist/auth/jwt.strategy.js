"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_server_1 = __importDefault(require("../app.server"));
function generateJWT(user) {
    var today = new Date();
    var expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    var payload = {
        username: user.username,
        role: user.role,
    };
    return {
        token: app_server_1.default.jwt.sign(payload, {
            expiresIn: parseInt(String(expirationDate.getTime() / 1000), 10),
            issuer: "Enoch Ndika",
        }),
    };
}
exports.default = generateJWT;
//# sourceMappingURL=jwt.strategy.js.map