"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetProviderService = void 0;
var internet_provider_entity_1 = require("../entity/internet-provider.entity");
var InternetProviderService = /** @class */ (function () {
    function InternetProviderService() {
    }
    InternetProviderService.findPlansByInternetProviderId = function (providerId) {
        return internet_provider_entity_1.InternetProviderEntity.findPlansByInternetProviderId(providerId);
    };
    InternetProviderService.findConversationsWithEtapaBiggerThan = function (providerId, etapa) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithEtapaBiggerThan(providerId, etapa);
    };
    InternetProviderService.findConversationsWithDisponibility = function (providerId) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithDisponibility(providerId);
    };
    InternetProviderService.findConversationsWithoutDisponibility = function (providerId) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithoutDisponibility(providerId);
    };
    InternetProviderService.findConversationsLeads = function (providerId) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsLeads(providerId);
    };
    InternetProviderService.findConversationsWithVenda = function (providerId) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithVenda(providerId);
    };
    return InternetProviderService;
}());
exports.InternetProviderService = InternetProviderService;
