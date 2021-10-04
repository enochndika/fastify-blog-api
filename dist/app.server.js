"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_module_1 = __importDefault(require("./app.module"));
var server = (0, app_module_1.default)({
    logger: true,
});
server.listen(process.env.PORT || 3000, function (err, address) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});
exports.default = server;
//# sourceMappingURL=app.server.js.map