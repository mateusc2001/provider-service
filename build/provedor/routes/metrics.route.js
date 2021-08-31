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
exports.metricsRoute = void 0;
var express_1 = __importDefault(require("express"));
var metrics_service_1 = require("../service/metrics.service");
var metrics_schema_1 = require("../schemas/metrics.schema");
var internet_provider_service_1 = require("../service/internet-provider.service");
exports.metricsRoute = express_1.default.Router();
exports.metricsRoute.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, metrics_service_1.MetricsService.create(req.body)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, metrics_service_1.MetricsService.findAll()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.get('/:metricId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, metrics_service_1.MetricsService.findById(req.params.metricId)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.put('/impressions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = req.body;
                if (!(!!body.impressions && body.impressions.length > 0)) return [3 /*break*/, 2];
                _b = (_a = res).json;
                return [4 /*yield*/, metrics_service_1.MetricsService.addImpression(body.impressions, body.id)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 3];
            case 2:
                res.status(500).json({ errorMessage: 'Erro interno.' });
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.patch('/conversations/leads', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, conversationId, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = req.body;
                conversationId = req.body.conversationId;
                _b = (_a = res).json;
                return [4 /*yield*/, metrics_schema_1.metricsEntity.updateOne({ 'conversations._id': conversationId }, { '$set': { 'conversations.$.leads': body } })];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.get('/chart-metric/first-chart/:internetProvider/start/:start/end/:end', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var providerId, start, end, conversasIniciadas, semOportunidades, oportunidades, vendas, leads, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                providerId = req.params.internetProvider;
                start = req.params.start;
                end = req.params.end;
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findConversationsWithEtapaBiggerThan(providerId, 2, start, end)];
            case 1:
                conversasIniciadas = (_a.sent());
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findConversationsWithoutDisponibility(providerId, start, end)];
            case 2:
                semOportunidades = (_a.sent());
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findConversationsWithDisponibility(providerId, start, end)];
            case 3:
                oportunidades = (_a.sent());
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findConversationsWithEtapaBiggerThan(providerId, 11, start, end)];
            case 4:
                vendas = (_a.sent());
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findConversationsLeads(providerId, start, end, 1, 2)];
            case 5:
                leads = (_a.sent());
                response = {
                    firstChart: {
                        conversasIniciadas: !!conversasIniciadas ? conversasIniciadas.metrics.conversations.length : -1,
                        oportunidades: !!oportunidades ? oportunidades.metrics.conversations.length : -1,
                        vendas: !!vendas ? vendas.metrics.conversations.length : -1
                    },
                    secondChart: {
                        conversasIniciadas: !!conversasIniciadas ? conversasIniciadas.metrics.conversations.length : -1,
                        semOportunidades: !!semOportunidades ? semOportunidades.metrics.conversations.length : -1,
                        leads: !!leads ? leads.metrics.conversations.length : -1
                    }
                };
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.get('/vendas/:providerId/start/:start/end/:end/page/:page/count/:count', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var providerId, start, end, page, count, vendas, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                providerId = req.params.providerId;
                start = req.params.start;
                end = req.params.end;
                page = Number(req.params.page);
                count = Number(req.params.count);
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findConversationsWithVenda(providerId, start, end, page, count)];
            case 1:
                vendas = (_a.sent());
                response = vendas.metrics.conversations.map(function (conversation) { return conversation.leads; });
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
exports.metricsRoute.get('/vendas/planos/:providerId/start/:start/end/:end/page/:page/count/:count', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var providerId, start, end, page, count, vendas, planos, semRepetidos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                providerId = req.params.providerId;
                start = req.params.start;
                end = req.params.end;
                page = Number(req.params.page);
                count = Number(req.params.count);
                return [4 /*yield*/, internet_provider_service_1.InternetProviderService.findPlansInVenda(providerId, start, end, page, count)];
            case 1:
                vendas = (_a.sent());
                planos = vendas.metrics.conversations.map(function (conversation) { return conversation.leads.planoSelecionado; });
                semRepetidos = planos
                    .filter(function (el, i) { return planos.map(function (elemento) { return elemento.id; }).indexOf(el.id) == i; })
                    .map(function (plano) {
                    return {
                        totalVendidos: plano.totalVendido = planos.filter(function (plan) { return plan.id == plano.id; }).length,
                        title: plano.title,
                        price: plano.price,
                        periodoDeCobranca: plano.periodoDeCobranca,
                        speed: plano.speed
                    };
                });
                res.json(semRepetidos);
                return [2 /*return*/];
        }
    });
}); });
