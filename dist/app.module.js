"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_alias_1 = require("module-alias");
(0, module_alias_1.addAliases)({
    '@utils': __dirname + "/utils",
    '@models': __dirname + "/models",
    '@auth': __dirname + "/auth",
    '@plugins': __dirname + "/plugins",
    '@providers': __dirname + "/providers",
});
var fastify_1 = __importDefault(require("fastify"));
require("make-promises-safe");
var dotenv_1 = __importDefault(require("dotenv"));
var fastify_jwt_1 = __importDefault(require("fastify-jwt"));
var app_service_1 = __importDefault(require("./app.service"));
dotenv_1.default.config();
function main(opts) {
    if (opts === void 0) { opts = {}; }
    var app = (0, fastify_1.default)(opts);
    /* Middlewares*/
    app.register(fastify_jwt_1.default, {
        secret: process.env.JWT_SECRET || '12345',
    });
    app.register(Promise.resolve().then(function () { return __importStar(require('@plugins/authorization')); }));
    app.register(Promise.resolve().then(function () { return __importStar(require('@plugins/adminResource')); }));
    /* Routes Middlewares*/
    app_service_1.default.forEach(function (service) {
        app.register(service.name, { prefix: service.prefix });
    });
    return app;
}
exports.default = main;
//# sourceMappingURL=app.module.js.map