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
    InternetProviderEntity.findConversationsWithEtapaBiggerThan = function (internetProviderId, etapa) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'etapas.etapa': { $gte: etapa }
                }
            }
        });
    };
    InternetProviderEntity.findConversationsWithVenda = function (internetProviderId) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'etapas.etapa': { $gte: 11 }
                },
                populate: {
                    path: 'leads',
                    select: ['nome', 'celular', 'email', 'cpf', 'localidade', 'bairro', 'cep']
                }
            }
        });
    };
    InternetProviderEntity.findConversationsWithDisponibility = function (internetProviderId) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'hasDisponibility': true
                }
            }
        });
    };
    InternetProviderEntity.findConversationsWithoutDisponibility = function (internetProviderId) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: {
                    'hasDisponibility': false
                }
            }
        });
    };
    InternetProviderEntity.findConversationsLeads = function (internetProviderId) {
        return internet_provider_schema_1.internetProviderEntity.findById(internetProviderId)
            .populate({
            path: 'metrics',
            populate: {
                path: 'conversations',
                match: { $or: [{ hasDisponibility: false }, { hasDisponibility: null }] }
            }
        });
    };
    return InternetProviderEntity;
}());
exports.InternetProviderEntity = InternetProviderEntity;
