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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internetProviderRoute = void 0;
var builder_pattern_1 = require("builder-pattern");
var express_1 = __importDefault(require("express"));
var internet_provider_schema_1 = require("../schemas/internet-provider.schema");
var chat_settings_service_1 = require("../service/chat-settings.service");
var internet_provider_settings_service_1 = require("../service/internet-provider-settings.service");
var metrics_service_1 = require("../service/metrics.service");
var user_service_1 = require("../service/user.service");
exports.internetProviderRoute = express_1.default.Router();
exports.internetProviderRoute.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, newMetrics, newUser, newProviderSettings, newChatSettings, newInternetProvider, _a, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = req.body;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                return [4 /*yield*/, metrics_service_1.MetricsService.create(builder_pattern_1.Builder()
                        .conversations([])
                        .impressions([])
                        .build())];
            case 2:
                newMetrics = (_c.sent());
                return [4 /*yield*/, user_service_1.UserService.create(builder_pattern_1.Builder()
                        .username(body.username)
                        .password(body.password)
                        .firstName(body.firstName)
                        .lastName(body.lastName)
                        .build())];
            case 3:
                newUser = (_c.sent());
                return [4 /*yield*/, internet_provider_settings_service_1.InternetProviderSettingsService.create(builder_pattern_1.Builder()
                        .build())];
            case 4:
                newProviderSettings = (_c.sent());
                return [4 /*yield*/, chat_settings_service_1.ChatSettingsService.create(builder_pattern_1.Builder()
                        .build())];
            case 5:
                newChatSettings = (_c.sent());
                newInternetProvider = builder_pattern_1.Builder()
                    .users([newUser.id])
                    .metrics(newMetrics.id)
                    .providerSettings(newProviderSettings.id)
                    .chatSettings(newChatSettings.id)
                    .build();
                _b = (_a = res).send;
                return [4 /*yield*/, internet_provider_schema_1.internetProviderEntity.create(newInternetProvider)];
            case 6:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _c.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.internetProviderRoute.get('/:providerId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, internet_provider_schema_1.internetProviderEntity
                    .findById(req.params.providerId)
                    .populate({
                    path: 'chatSettings',
                    populate: {
                        path: 'location',
                        select: ['districts', 'fileName']
                    }
                })
                    .populate('providerSettings')
                    .populate('metrics')
                    .select(['metrics', 'providerSettings', 'chatSettings', 'id'])];
            case 1:
                response = _a.sent();
                res.send(response);
                return [2 /*return*/];
        }
    });
}); });
exports.internetProviderRoute.put('/add/user/:providerId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_service_1.UserService.create(req.body)];
            case 1:
                newUser = _a.sent();
                return [4 /*yield*/, internet_provider_schema_1.internetProviderEntity
                        .updateOne({
                        _id: req.params.providerId
                    }, {
                        $push: {
                            users: newUser.id
                        }
                    })];
            case 2:
                response = _a.sent();
                res.json(newUser);
                return [2 /*return*/];
        }
    });
}); });
exports.internetProviderRoute.get('', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nome, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                nome = 'Mateus Camargo';
                console.log(nome);
                _b = (_a = res).json;
                return [4 /*yield*/, internet_provider_schema_1.internetProviderEntity.find()
                        .select(['metrics', 'providerSettings', 'chatSettings', 'id'])
                        .populate('metrics')
                        .populate('providerSettings')
                        .populate('chatSettings')];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.internetProviderRoute.get('/chat/layout-settings/:providerId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var internetProvider, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, internet_provider_schema_1.internetProviderEntity.findById(req.params.providerId)
                    .select('metrics')
                    .populate({
                    path: 'chatSettings',
                    select: ['image', 'primaryColor', '_id', 'clientPageUrl', 'whatsappMessage', 'whatsappNumber', 'title']
                })];
            case 1:
                internetProvider = _a.sent();
                if (!!internetProvider) {
                    response = {
                        chatSettings: internetProvider.chatSettings,
                        metricId: internetProvider.metrics
                    };
                    res.json(response);
                }
                else {
                    res.status(404).json({
                        error: 'Provedor n??o encontrado.'
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.internetProviderRoute.get('/findAll/users/:providerId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, internet_provider_schema_1.internetProviderEntity.findById(req.params.providerId)
                    .populate({
                    path: 'users',
                    select: ['firstName', 'lastName', 'username']
                })];
            case 1:
                response = _a.sent();
                res.json(!!response ? response.users : []);
                return [2 /*return*/];
        }
    });
}); });
