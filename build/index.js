"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var ambiente = process.env.NODE_ENV;
var urlOrigem = 'dev';
var PORT = Number(process.env.PORT) || 3000;
switch (ambiente) {
    case 'e2e':
        urlOrigem = 'e2e';
        PORT = 3001;
        break;
    case 'prod':
        urlOrigem = 'prod';
        PORT = 3000;
        break;
    default:
        urlOrigem = 'dev';
        PORT = 3002;
        break;
}
if (!PORT) {
    process.exit(1);
}
app_1.default.listen(PORT, function () { return console.log("Ambiente de " + urlOrigem + " port " + PORT); });
