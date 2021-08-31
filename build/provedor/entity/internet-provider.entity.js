"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetProviderEntity = void 0;
var internet_provider_schema_1 = require("../schemas/internet-provider.schema");
var InternetProviderEntity = /** @class */ (function () {
    function InternetProviderEntity() {
    }
    InternetProviderEntity.findLocationsByInternetProviderId = function (providerId) {
        return internet_provider_schema_1.internetProviderEntity.findById({ '_id': providerId })
            .populate({
            path: 'chatSettings',
            select: 'location',
            populate: {
                path: 'location',
                select: 'coordinates'
            }
        });
    };
    InternetProviderEntity.findPlansByInternetProviderId = function (providerId) {
        return internet_provider_schema_1.internetProviderEntity.findById({ '_id': providerId })
            .populate({
            path: 'chatSettings',
            select: 'plans'
        });
    };
    InternetProviderEntity.findConversationsWithEtapaBiggerThan = function (internetProviderId, etapa, start, end) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'etapas.etapa': { $gte: etapa },
                    'createdAt': {
                        $gte: new Date(start),
                        $lt: new Date(end)
                    }
                }
            }
        });
    };
    InternetProviderEntity.findConversationsWithVenda = function (internetProviderId, start, end, page, count) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'etapas.etapa': { $gte: 11 },
                    'createdAt': {
                        $gte: new Date(start),
                        $lt: new Date(end)
                    }
                },
                populate: {
                    path: 'leads',
                    select: ['nome', 'celular', 'email', 'cpf', 'localidade', 'bairro', 'cep']
                },
                options: {
                    limit: count,
                    skip: count * (page - 1)
                }
            }
        });
    };
    InternetProviderEntity.findConversationsWithDisponibility = function (internetProviderId, start, end) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'hasDisponibility': true,
                    'createdAt': {
                        $gte: new Date(start),
                        $lt: new Date(end)
                    }
                }
            }
        });
    };
    InternetProviderEntity.findConversationsWithoutDisponibility = function (internetProviderId, start, end) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'hasDisponibility': false,
                    'createdAt': {
                        $gte: new Date(start),
                        $lt: new Date(end)
                    }
                }
            }
        });
    };
    InternetProviderEntity.findConversationsLeads = function (internetProviderId, start, end, page, count) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    $or: [{ hasDisponibility: false }, { hasDisponibility: null }],
                    'createdAt': {
                        $gte: new Date(start),
                        $lt: new Date(end)
                    }
                },
                options: {
                    limit: count,
                    skip: count * (page - 1)
                }
            }
        });
    };
    InternetProviderEntity.findPlansInVenda = function (internetProviderId, start, end, page, count) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'etapas.etapa': { $gte: 11 },
                    'createdAt': {
                        $gte: new Date(start),
                        $lt: new Date(end)
                    }
                },
                populate: {
                    path: 'leads',
                    select: ['planoSelecionado']
                },
                options: {
                    limit: count,
                    skip: count * (page - 1)
                }
            }
        });
    };
    return InternetProviderEntity;
}());
exports.InternetProviderEntity = InternetProviderEntity;
